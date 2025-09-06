import API from "./api";

export const getCurrentUser = () => API.get("/api/users/me");
export const getAllUsers = () => API.get("/api/users"); 