import api from "./axios";

export const todoget = async () => await api.get("/api/todos")

export const todopost = async (data) => await api.post("/api/todos", data)