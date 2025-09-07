import API from "./api";

export const createTimeLog = (timeLog) => API.post("/api/timelogs", timeLog);
export const getTimeLogsByTask = (taskId) => API.get(`/api/timelogs/task/${taskId}`);
export const getTimeLogsByUser = (userId) => API.get(`/api/timelogs/user/${userId}`);
export const getAllTimeLogs = () => API.get("/api/timelogs");
export const deleteTimeLog = (id) => API.delete(`/api/timelogs/${id}`);
export const startTimer = (taskId, userId) =>
  API.post('/api/timelogs/start', null, {
    params: { taskId, userId },
  });
export const stopTimer = (logId) =>
  API.put(`/api/timelogs/${logId}/stop`);
export const getTotalDurationByTask = (taskId) =>
  API.get(`/api/timelogs/task/${taskId}/total`);
export const getTotalDurationByProject = (projectId) =>
  API.get(`/api/timelogs/project/${projectId}/total`);