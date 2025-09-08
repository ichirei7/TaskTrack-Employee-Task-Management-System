import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { startTimer, stopTimer } from "../../services/timeLogService";
import { getAllProjects } from "../../services/projectService";
import {
  getAllTasks,
  getTasksByProject,
  getTasksByUser,
  updateTask,
  createTask,
  deleteTask,
} from "../../services/taskService";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { setAuthToken } from "../../services/api";
import { getAllUsers } from "../../services/userService";

const KanBanBoard = ({ projectId, setSelectedProject, userId, isManager = true }) => {
  
  const [sortBy, setSortBy] = useState("dueDate"); // default sort
  const [refreshKey, setRefreshKey] = useState(0);




  const getCurrentUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const decoded = jwtDecode(token);
  console.log("Decoded JWT:", jwtDecode(localStorage.getItem("token")));
  return decoded.id; // or decoded.sub, depending on your JWT structure
  
  };
  const [projects, setProjects] = useState([]);

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await getAllProjects(); // assuming you have this service
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  fetchProjects();
}, []);

  const selectedProject = projects.find(p => p.id === projectId);

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: null,
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: null,
  });
  const [employees, setEmployees] = useState([]);
  const [activeLogId, setActiveLogId] = useState(null);
  const [timerRunningTaskId, setTimerRunningTaskId] = useState(null);


  // Reusable fetch function
  const fetchTasks = async () => {
    try {
      let response;
      if (!isManager && userId) {
        // Employee: fetch tasks assigned to them
        response = await getTasksByUser(userId);
      } else if (projectId) {
        // Manager: fetch tasks by project
        response = await getTasksByProject(projectId);
        
      } else {
        // Manager: fetch all tasks
        response = await getAllTasks();
        console.log("Fetched tasks:", response.data);
       
      }

      if (response && Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        console.warn("Unexpected response format:", response);
        setTasks([]);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };
  useEffect(() => {
    const savedLogId = localStorage.getItem("activeLogId");
    const savedTaskId = localStorage.getItem("activeTaskId");
    if (savedLogId && savedTaskId) {
      setActiveLogId(savedLogId);
      setTimerRunningTaskId(Number(savedTaskId));
    }
  }, []);

  // Fetch tasks on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    fetchTasks();
  }, [projectId, userId, isManager]);

  // Fetch employees for assignment (managers only)
  useEffect(() => {
    if (!isManager) return;

    const fetchEmployees = async () => {
      try {
        const res = await getAllUsers();
        const employeeList = res.data.filter(
          (user) => user.role === "EMPLOYEE"
        );
        setEmployees(employeeList);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, [isManager]);


  //sort by due date and created date latest first
    const sortTasks = (tasksArray) => {
      return [...tasksArray].sort((a, b) => {
        const dateA = new Date(a[sortBy]);
        const dateB = new Date(b[sortBy]);
        return dateA - dateB ; // descending: earliest first
      });
    };

const groupTasks = (tasksArray) => ({
  TODO: tasksArray.filter((t) => t.status === "TODO"),
  IN_PROGRESS: tasksArray.filter((t) => t.status === "IN_PROGRESS"),
  DONE: tasksArray.filter((t) => t.status === "DONE"),
});

const grouped = groupTasks(sortTasks(tasks));

  // Handle create new task (managers only)
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await createTask({
        ...newTask,
        ...(projectId ? { project: { id: projectId } } : {}),
      });
      setNewTask({ title: "", description: "", dueDate: "", assignedTo: null });
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // Handle delete task (managers only)
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Handle drag and drop (both roles can update status)
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const taskId = parseInt(draggableId);
    const task = tasks.find((t) => t.id === taskId);
    const newStatus = destination.droppableId;

    if (task.status === newStatus) return;

    const updatedTask = {
      ...task,
      status: newStatus,
      ...(projectId ? { project: { id: projectId } } : {}),
      ...(newStatus === "DONE" && task.status !== "DONE"
         ? {completedAt:new Date().toISOString()} : {}
      )
    };

    try {
      await updateTask(taskId, updatedTask);
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Handle start timer
  const handleStartTimer = async (taskId) => {
  try {
    const userId = getCurrentUserId(); // implement this based on JWT or context
    console.log("Starting timer for task:", taskId, "user:", userId);
    const res = await startTimer(taskId, userId);

     // Persist timer state across refreshes
    localStorage.setItem("activeLogId", res.data.id);
    localStorage.setItem("activeTaskId", taskId);

    setActiveLogId(res.data.id);
    setTimerRunningTaskId(taskId);
    } catch (err) {
      console.error("Error starting timer:", err);
    }
  };

  // Handle stop timer
  const handleStopTimer = async () => {
    try {
      await stopTimer(activeLogId);
      localStorage.removeItem("activeLogId");
      localStorage.removeItem("activeTaskId");
      setActiveLogId(null);
      setTimerRunningTaskId(null);
      fetchTasks(); // refresh task list
      setRefreshKey(prev => prev + 1); // triggers re-fetch in TaskCard
    } catch (err) {
      console.error("Error stopping timer:", err);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        <div className="kanban-top-bar">
          <h3>{projectId ? selectedProject?.name : "All Project Tasks"}</h3>
          <div className="kanban-menu">
            <div className="kanban-menu-left">
              {/*dropdown form for project selection*/}
              {isManager &&  (
                <div className="project-filter">
                  <label htmlFor="project-select">Select Project:</label>
                  <select
                    id="project-select"
                    value={projectId || ""}
                    onChange={(e) =>
                      setSelectedProject(e.target.value ? parseInt(e.target.value) : null)
                    }
                  >
                    <option value="">All Projects</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                  
                </div>
              )}

               {/* Sort By */}
                <div className="sort-filter">
                  <label htmlFor="sort-select">Sort by:</label>
                  <select
                      id="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="dueDate">Due Date (Earliest First)</option>
                      <option value="createdAt">Created At (Earliest First)</option>
                    </select>

                </div>
              </div>
              {/* Add Task and View All Project Tasks buttons*/}
              {isManager  && projectId && (
                <button onClick={() => setShowForm(true)}>Add Task ➕</button>
              )}
              {/* {isManager && projectId && (
                
                <button onClick={() => setSelectedProject(null)}>View All Project Tasks </button>
              )} */}
          </div>
          {/* Modal Form for add/edit (managers only) */}
          {isManager && showForm && (
            <div className="modal">
              <div className="modal-content">
                <h4>{editingTaskId ? "Edit Task" : "Create New Task"}</h4>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    if (editingTaskId) {
                      try {
                        await updateTask(editingTaskId, {
                          ...editTaskData,
                          ...(projectId ? { project: { id: projectId } } : {}),
                        });
                        setEditingTaskId(null);
                        setEditTaskData({
                          title: "",
                          description: "",
                          dueDate: "",
                          assignedTo: null,
                        });
                        setShowForm(false);
                        fetchTasks();
                      } catch (err) {
                        console.error("Error updating task:", err);
                      }
                    } else {
                      try {
                        await createTask({
                          ...newTask,
                          ...(projectId ? { project: { id: projectId } } : {}),
                        });
                        setNewTask({
                          title: "",
                          description: "",
                          dueDate: "",
                          assignedTo: null,
                        });
                        setShowForm(false);
                        fetchTasks();
                      } catch (err) {
                        console.error("Error creating task:", err);
                      }
                    }
                  }}
                >
                  <input
                    type="text"
                    placeholder="Title"
                    value={editingTaskId ? editTaskData.title : newTask.title}
                    onChange={(e) =>
                      editingTaskId
                        ? setEditTaskData({
                            ...editTaskData,
                            title: e.target.value,
                          })
                        : setNewTask({ ...newTask, title: e.target.value })
                    }
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={
                      editingTaskId ? editTaskData.description : newTask.description
                    }
                    onChange={(e) =>
                      editingTaskId
                        ? setEditTaskData({
                            ...editTaskData,
                            description: e.target.value,
                          })
                        : setNewTask({
                            ...newTask,
                            description: e.target.value,
                          })
                    }
                  />
                  <input
                    type="date"
                    value={editingTaskId ? editTaskData.dueDate : newTask.dueDate}
                    onChange={(e) =>
                      editingTaskId
                        ? setEditTaskData({
                            ...editTaskData,
                            dueDate: e.target.value,
                          })
                        : setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                  />

                  {/* Assign to Employee */}
                  <select
                    value={
                      editingTaskId
                        ? editTaskData.assignedTo?.id || ""
                        : newTask.assignedTo?.id || ""
                    }
                    onChange={(e) => {
                      const assignedId = e.target.value
                        ? { id: parseInt(e.target.value) }
                        : null;
                      editingTaskId
                        ? setEditTaskData({ ...editTaskData, assignedTo: assignedId })
                        : setNewTask({ ...newTask, assignedTo: assignedId });
                    }}
                  >
                    <option value="">Unassigned</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name}
                      </option>
                    ))}
                  </select>

                  <button type="submit">
                    {editingTaskId ? "Save Changes" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingTaskId(null);
                      setEditTaskData({
                        title: "",
                        description: "",
                        dueDate: "",
                        assignedTo: null,
                      });
                      setNewTask({
                        title: "",
                        description: "",
                        dueDate: "",
                        assignedTo: null,
                      });
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="kanban-board-main">
          {Object.entries(grouped).map(([status, list]) => (
            <Droppable droppableId={status} key={status}>
              {(provided, snapshot) => (
                <div
                  className={`kanban-column ${
                    snapshot.isDraggingOver ? "dragging-over" : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{status.replace("_", " ")}</h2>
                  {list.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-card-container"
                        >
                          <TaskCard
                            task={task}
                            onEdit={
                              isManager
                                ? (task) => {
                                    setEditingTaskId(task.id);
                                    setEditTaskData({ ...task });
                                    setShowForm(true);
                                  }
                                : null
                            }
                            onDelete={isManager ? handleDeleteTask : null}
                            onStartTimer={handleStartTimer}
                            onStopTimer={handleStopTimer}
                            timerRunningTaskId={timerRunningTaskId}
                            refreshTrigger={refreshKey}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanBanBoard;
