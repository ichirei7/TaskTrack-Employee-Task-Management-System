import API from "./api";

//API helpers for tasks
export const getAllTasks = () => API.get("/api/tasks");
export const getTasksByProject = (projectId) => API.get(`/api/tasks/${projectId}/tasks`);
export const getTasksByUser = (userId) => API.get(`/api/tasks/user/${userId}`);
export const createTask = (task) => API.post("/api/tasks",task);
export const updateTask = (id, updatedTask) => API.put(`/api/tasks/${id}`,updatedTask);
export const deleteTask = (id) => API.delete(`/api/tasks/${id}`);


