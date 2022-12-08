import { auth } from "./instance";

export const signAPI = {
  goSignUp: (data) => auth.post(`/auth/signup`, data),
  goSignIn: (data) => auth.post(`/auth/signin`, data),
};

export const todoAPI = {
  createTodo: (data) => auth.post(`/todos`, data),
  getTodos: () => auth.get(`/todos`),
  updateTodo: (todoId, data) => auth.put(`/todos/${todoId}`, data),
  deleteTodo: (todoId) => auth.delete(`/todos/${todoId}`),
};
