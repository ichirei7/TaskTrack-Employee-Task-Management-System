import React, { useEffect, useState } from "react";
import KanBanBoard from "../tasks/KanBanBoard";
import { jwtDecode } from "jwt-decode"; 
import TaskStatusChart from "../charts/TaskStatusChart";
import { getTasksByUser } from "../../services/taskService";
import EmployeeHeader from "../general/EmployeeHeader";


const EmployeeDashboard = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);

    // Fetch JWT user info
  useEffect(() => {
    const token = localStorage.getItem("token"); // define token
    if (token) {
      const decoded = jwtDecode(token); // use jwtDecode
      setUsername(decoded.name); // decode from jwt and get name to set as username
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) return;
      try {
        const res = await getTasksByUser(userId);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, [userId]);

  useEffect(() => {
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      console.log("User ID:", currentUser.id);
      console.log("User Name:", currentUser.name);
      setUserId(currentUser.id);
    }
  }, []);

  if (!userId) return <p>Loading...</p>;

  return (
    <div className="main-container">
      <EmployeeHeader />
      <h1>Employee Dashboard</h1>
      <div className="welcome-bar">Hi {username}</div>
      <div className="project-task-overview">
        <div className="project-task-overview-left">
        <TaskStatusChart tasks={tasks} />
        </div>
        <div className="project-task-overview-right">
                    
           {/* Pass userId so KanBanBoard can filter tasks for this employee */}
           <KanBanBoard projectId={null} userId={userId} isManager={false} />
      
        </div>
      </div>
      
    
    </div>
  );
};

export default EmployeeDashboard;
