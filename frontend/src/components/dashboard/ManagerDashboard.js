import React, { useEffect, useState } from 'react';
import KanBanBoard from '../tasks/KanBanBoard';
import { getAllProjects, createProject, updateProject, deleteProject } from '../../services/projectService';
import ProjectList from '../projects/ProjectList';
import { jwtDecode } from "jwt-decode"; 
import ManagerHeader from '../general/ManagerHeader';

const ManagerDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [username, setUsername] = useState("");

  // Fetch JWT user info
useEffect(() => {
  const token = localStorage.getItem("token"); // define token
  if (token) {
    const decoded = jwtDecode(token); // use jwtDecode
    setUsername(decoded.name); // decode from jwt and get name to set as username
  }
}, []);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await getAllProjects();
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create project
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    try {
      await createProject({
        name: newProjectName,
        description: newProjectDescription
        
      });
      setNewProjectName("");
      setNewProjectDescription("");
      fetchProjects();
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  // Update project
  const handleUpdate = async (id, updatedProject) => {
    try {
      await updateProject(id, updatedProject); //get object and fields from ProjectList 
      fetchProjects();
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      if (selectedProject === id) setSelectedProject(null);
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div className="main-container">
      <ManagerHeader />
      <h1>Manager Dashboard</h1>

      <div className="welcome-bar">Hi {username}</div>
      <div className="project-task-overview">
        <div className="project-task-overview-left">
          {/* Create project form */}
          <div className="create-project">
            <h3>Create New Project</h3>
            <form onSubmit={handleCreate} className="project-form">
              <input 
                type="text" 
                placeholder="Project Name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                required
              />
              <textarea
                placeholder="Project Description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
              />
              <button type="submit">Create Project ➕</button>
            </form>
          </div>

          {/* Project List */}
          <ProjectList
            projects={projects}
            onSelectProject={setSelectedProject}
            onDeleteProject={handleDelete}
            onUpdateProject={handleUpdate}
          />
        </div>
        {/*KanBanBoard*/}
        <div className="project-task-overview-right">
          <KanBanBoard 
          projectId={selectedProject} 
          setSelectedProject={setSelectedProject}
          projects={projects}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
