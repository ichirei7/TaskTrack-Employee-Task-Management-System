import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../services/projectService";

const ProjectList = ({ projects,onSelectProject, onDeleteProject, onUpdateProject }) => {
  
  const [editingId, setEditingId] = useState(null); //no project is being edited initially
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const startEditing = (project) => {
    setEditingId(project.id);              //editingID holds id of project being edited
    setEditName(project.name || "");                   //form fields pre-filled with existing values first
    setEditDescription(project.description || "");     //form fields pre-filled with existing values first
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  const saveEdit = (id) => {
    onUpdateProject(id, { name: editName, description: editDescription });
    cancelEditing();
  };

  return (
    <div className="projects">
      <hr></hr>
      <h2>Projects</h2>
      <div className="projects-board">
        {projects.length > 0 ? (
          [...projects] //prepare array for sorting
           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest first
           .map((p) => (
            <div className="project-card" key={p.id}>
              <button className="project" onClick={() => onSelectProject(p.id)}>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <p>Start Date: <span>{new Date(p.createdAt).toISOString().split('T')[0]}</span></p> {/*remove the time after the ISO date*/}
                <p>Managed by: <span>{p.manager?.name || "N/A"}</span></p>
                <p>Number of pending tasks:<span></span></p>
              </button>

              {/* Edit Form */}
              {editingId === p.id ? (              //conditional rendering, check if editingId matches any project id,if yes shows form. When editingId is null, no form is displayed, just show edit link
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveEdit(p.id);
                  }}
                >
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Edit Project Name"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Edit Project Description"
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={cancelEditing}>Cancel</button>
                </form>
              ) : (
                <a
                  className="edit-link"
                  onClick={() => startEditing(p)}
                >
                  Edit✏️
                </a>
              )}

              {/* Delete Button */}
              <a
                className="delete-link"
                onClick={() => onDeleteProject(p.id)}
              >
                Delete🗑️
              </a>
            </div>
          ))
        ) : (
          <p>No projects available</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
