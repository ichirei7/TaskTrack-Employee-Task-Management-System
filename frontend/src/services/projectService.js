import API from "./api";

//API helpers for tasks
export const getAllProjects = () => API.get("/api/projects");
export const getProjectById = (id) => API.get(`/api/projects/${id}`)
export const createProject = (project) => API.post("/api/projects",project,{headers: { 'Content-Type': 'application/json' }});
export const updateProject = (id, updatedProject) => API.put(`/api/projects/${id}`,updatedProject,{headers: { 'Content-Type': 'application/json' }});
export const deleteProject = (id) => API.delete(`/api/projects/${id}`);

