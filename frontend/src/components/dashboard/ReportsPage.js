import React, { useEffect, useState } from "react";
import TaskStatusChart from "../charts/TaskStatusChart";

import { getAllTasks } from "../../services/taskService";
import { getAllProjects } from "../../services/projectService";
import Header from "../general/ManagerHeader";
import { getAllTimeLogs } from "../../services/timeLogService";
import { getAllUsers } from "../../services/userService";

const ReportsPage = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [timeLogs, setTimeLogs] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const taskRes = await getAllTasks();
      const projectRes = await getAllProjects();
      const logRes = await getAllTimeLogs();
      const userRes = await getAllUsers();

       // Log the first time log for inspection
    console.log("Sample TimeLog:", logRes.data[0]);
    
      setTasks(taskRes.data);
      setProjects(projectRes.data);
      setTimeLogs(logRes.data);
      setEmployees(userRes.data.filter((u) => u.role === "EMPLOYEE"));
      console.log("TimeLogs:", timeLogs);
    };
    fetchData();
  }, []);

  // calculate values
    const totalProjects = projects.length;
    const totalTasks = tasks.length;
    const totalEmployees = employees.length;
    const totalMinutes = timeLogs.reduce((sum, log) => sum + (log.duration || 0), 0);
    const totalHours = Math.round(totalMinutes / 60);

    const timePerEmployee = employees.map((emp) => {
  const empLogs = timeLogs.filter((log) => {
    const task = tasks.find((t) => t._id === log.taskId);
    return task?.assignedTo === emp._id;
  });
  const total = empLogs.reduce((sum, log) => sum + (log.duration || 0), 0);
  return { name: emp.name, minutes: total };
});

const timePerProject = projects.map((proj) => {
  // Get all tasks that belong to this project
  const projectTasks = tasks.filter((t) => t.projectId === proj._id).map((t) => t._id);

  // Get all time logs for those tasks
  const projLogs = timeLogs.filter((log) => projectTasks.includes(log.taskId));

  // Sum durations
  const total = projLogs.reduce((sum, log) => sum + (log.duration || 0), 0);

  return { name: proj.name, minutes: total };
});


    
    const ProgressBar = ({ label, value, max }) => {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ marginBottom: "10px" }}>
      <strong>{label}</strong>
      <div style={{
        background: "#eee",
        borderRadius: "4px",
        overflow: "hidden",
        height: "20px",
        marginTop: "4px"
      }}>
        <div style={{
          width: `${percentage}%`,
          background: "#2196f3",
          height: "100%",
          transition: "width 0.3s ease"
        }} />
      </div>
      <small>{value} minutes</small>
    </div>
  );
};


  return (
    <div className="main-container">
      <Header />  
      <h1>Reports & Analytics</h1>
      <div className="full-container">  
        <div className="summary-box">
            <h3>📊 System Summary</h3>
            <ul>
                <li>📁 Total Projects: {totalProjects}</li>
                <li>✅ Total Tasks: {totalTasks}</li>
                <li>👥 Total Employees: {totalEmployees}</li>
                <li>⏱️ Total Time Logged: {totalHours} hours</li>
            </ul>
        </div> 
         <div className="charts-board">  
             <TaskStatusChart tasks={tasks} />
        <div>
                <div className="progress-section">
  <h3>⏱️ Time Logged per Employee</h3>
  {timePerEmployee.map((emp) => (
    <ProgressBar
      key={emp.name}
      label={emp.name}
      value={emp.minutes}
      max={totalMinutes}
    />
  ))}

  <h3>🏗️ Time Logged per Project</h3>
  {timePerProject.map((proj) => (
    <ProgressBar
      key={proj.name}
      label={proj.name}
      value={proj.minutes}
      max={totalMinutes}
    />
  ))}
</div>

          </div>     
        </div>
        
      </div>
    </div>
  );
};

export default ReportsPage;
