import api from "./axios";

export const todoGet = async () => await api.get("/api/todos")

export const todoPost = async (data) => await api.post("/api/todos", data)

export const todoPut = async (data) => await api.put(`/api/todos/${data.todoId}`,data)

export const todoDelete = async () => await api.delete(`/api/todos/${data.todoId}`)