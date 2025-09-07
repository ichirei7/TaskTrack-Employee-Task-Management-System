import React, { useEffect, useState } from "react";
import TaskStatusChart from "../charts/TaskStatusChart";
import TimeLoggedChart from "../charts/TimeLoggedChart";
import TimePerEmployeeChart from "../charts/TimePerEmployeeChart";
import { getAllTasks } from "../../services/taskService";
import { getAllProjects } from "../../services/projectService";
import { getAllTimeLogs } from "../../services/timeLogService";
import { getAllUsers } from "../../services/userService";
import Header from "../general/ManagerHeader";
import TasksPerEmployeeChart from "../charts/TasksPerEmployeeChart";

const ReportsPage = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [timeLogs, setTimeLogs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedChart, setSelectedChart] = useState("taskStatus");

  useEffect(() => {
    const fetchData = async () => {
      const taskRes = await getAllTasks();
      const projectRes = await getAllProjects();
      const logRes = await getAllTimeLogs();
      const userRes = await getAllUsers();

      setTasks(taskRes.data);
      setProjects(projectRes.data);
      setTimeLogs(logRes.data);
      setEmployees(userRes.data.filter((u) => u.role === "EMPLOYEE"));
    };
    fetchData();
  }, []);

  // 📊 summary values
  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const totalEmployees = employees.length;
  const totalMinutes = timeLogs.reduce((sum, log) => sum + (log.duration || 0), 0);
  const totalHours = Math.round(totalMinutes / 60);

  // fixed chart container height
  const chartContainerHeight = 400;

  return (
    <div className="main-container">
      <Header />
      <h1>Reports & Analytics</h1>
      <div className="full-container">
        {/* 🔹 System Summary */}
        <div className="summary-box">
          <h3>📊 System Summary</h3>
          <ul>
            <li>📁 Total Projects: {totalProjects}</li>
            <li>✅ Total Tasks: {totalTasks}</li>
            <li>👥 Total Employees: {totalEmployees}</li>
            <li>⏱️ Total Time Logged: {totalHours} hours</li>
          </ul>
        </div>

        {/* 🔹 Charts Section */}
        <div className="charts-board">
          {/* 🔹 Chart Toggle Buttons */}
          <div className="chart-toggle-buttons" style={{ marginBottom: "16px" }}>
            <button
              onClick={() => setSelectedChart("taskStatus")}
              style={{
                padding: "10px 25px",
                marginRight: "8px",
                background: selectedChart === "taskStatus" ? "#000" : "#fff",
                color: selectedChart === "taskStatus" ? "#fff" : "#000",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
              }}
            >
              Task Status Overview
            </button>
            <button
              onClick={() => setSelectedChart("timeLogged")}
              style={{
                padding: "10px 25px",
                marginRight: "8px",
                background: selectedChart === "timeLogged" ? "#000" : "#fff",
                color: selectedChart === "timeLogged" ? "#fff" : "#000",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
              }}
            >
              Time Logged Per Project
            </button>
            <button
              onClick={() => setSelectedChart("timePerEmployee")}
              style={{
                padding: "10px 25px",
                background: selectedChart === "timePerEmployee" ? "#000" : "#fff",
                color: selectedChart === "timePerEmployee" ? "#fff" : "#000",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
              }}
            >
              Time Logged Per Employee
            </button>
            <button
              onClick={() => setSelectedChart("tasksPerEmployee")}
              style={{
                padding: "10px 25px",
                marginRight: "8px",
                background: selectedChart === "tasksPerEmployee" ? "#000" : "#fff",
                color: selectedChart === "tasksPerEmployee" ? "#fff" : "#000",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
              }}
            >
              Tasks Per Employee
            </button>


          </div>

          {/* 🔹 Chart Containers */}
          <div style={{ height: chartContainerHeight }}>
            {selectedChart === "taskStatus" && <TaskStatusChart tasks={tasks} />}
            {selectedChart === "timeLogged" && <TimeLoggedChart projects={projects} />}
            {selectedChart === "timePerEmployee" && (
              <TimePerEmployeeChart employees={employees} timeLogs={timeLogs} />
            )}
            {selectedChart === "tasksPerEmployee" && (
              <TasksPerEmployeeChart employees={employees} tasks={tasks} />
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
