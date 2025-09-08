import React from "react";
import { useEffect, useState } from "react";
import { getTotalDurationByTask } from "../../services/timeLogService";

const TaskCard = ({ refreshTrigger, task, onEdit, onDelete, onStartTimer, onStopTimer, timerRunningTaskId }) => {
    const [totalMinutes, setTotalMinutes] = useState(0);
    const currentUser = JSON.parse(localStorage.getItem("user"));

    // loop colors for project badge
    const projectColors = [
      "#ffe5f9ff", // 1
      "#e5ffd3ff", // 2
      "#dbefffff", // 3
      "#d1eafdff", // 4
      "#fdfdd1ff", // 5
    ];
    const getProjectColor = (projectId) => {
      if (!projectId) return "#cccccc"; // fallback for null or undefined
      const index = (projectId - 1) % projectColors.length;
      return projectColors[index];
    };
    const projectColor = getProjectColor(task.project?.id);
    const now = new Date();
    const due = new Date(task.dueDate);

    const isOverdue =
        new Date(task.dueDate) < new Date() && task.status !== "DONE";

    const diffMs = due - now;
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const absHours = Math.abs(totalHours);
    const days = Math.floor(absHours / 24);
    const hours = absHours % 24;

    const timeLeft =
      totalHours < 0
        ? `Overdue by ${days} day(s) and ${hours} hour(s)`
        : `${days} day(s) and ${hours} hour(s) left`;
        
    //urgency level by color
    let urgencyLevel = "Low";
    let urgencyColor = " rgba(232, 232, 232, 1)";

    if (isOverdue) {
     urgencyLevel = "Critical";
      urgencyColor = "#ff0000ff";
    } else if (totalHours < 12) {
      urgencyLevel = "High";
      urgencyColor = "#ff1b1bff";
    } else if (totalHours < 36) {
       urgencyLevel = "Medium";
      urgencyColor = "#ff7300ff";
    } else if (totalHours < 72) {
       urgencyLevel = "Medium";
      urgencyColor = "#ffcc00ff";
    } 

    useEffect(() => {
    const fetchTotal = async () => {
        try {
          const res = await getTotalDurationByTask(task.id);
          setTotalMinutes(res.data);
        } catch (err) {
          console.error("Error fetching total time:", err);
        }
      };
      fetchTotal();
    }, [task.id, refreshTrigger]);

    return (
      <div className={`task-card ${isOverdue ? "overdue" : ""}`}>
        <h4>{task.title}</h4>
       <small className="project-badge" style={{ backgroundColor: projectColor }}>
          Project: <span>{task.project?.name || "No Project"}</span>
        </small> <br />
        <small>{task.description}</small><br />
        <small>Assigned to:<span> {task.assignedTo?.name || "Unassigned"}</span></small><br />
        <small>Due: <span>{task.dueDate}</span></small><br />
       

        {/* Time Status */}

        {/* Time Status */}
        {task.status !== "DONE" ? (
          <>
            <small style={{ color: totalHours < 0 ? "red" : "inherit" }}>
              {totalHours < 0
                ? `Overdue by ${days} day(s) and ${hours} hour(s)`
                : `${days} day(s) and ${hours} hour(s) left`}
            </small>
            <br />
            <span className="urgency-badge" style={{ background: urgencyColor }}>
              【┘】 {urgencyLevel} urgency
            </span>
            <br />
          </>
        ) : (
          task.completedAt && (
            <>
              <small>✅ Completed on: <b>{new Date(task.completedAt).toISOString().slice(0, 10)}</b></small>
              <br />
            </>
          )
        )}


         {/* Show edit/delete links only if props are provided */}
         {onEdit && (
        <a className="edit-link" onClick={() => onEdit(task)}>
          Edit✏️
        </a>
      )}
      {onDelete && (
        <a className="delete-link" onClick={() => onDelete(task.id)}>
          Delete 🗑️
        </a>
      )}

      {task.status !== "DONE" && (           //nested conditional rendering
      timerRunningTaskId === task.id ? (            //check if timer is running for the task
        <button onClick={onStopTimer}>Stop Timer 🛑</button>
        ) : (
        <button onClick={() => onStartTimer(task.id)}>Start Timer ⏱️</button>
        )
        )}
      <br />
      <small>Total Time Logged: <span>{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</span></small><br />

      
    </div>
  );
};

export default TaskCard;