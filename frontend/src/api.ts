import axios from 'axios';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
}

const API_URL = 'http://localhost:8080/api/tasks';

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get<Task[]>(API_URL);
  return res.data;
};

export const getTask = async (id: number): Promise<Task> => {
  const res = await axios.get<Task>(`${API_URL}/${id}`);
  return res.data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const res = await axios.post<Task>(API_URL, task);
  return res.data;
};

export const updateTask = async (id: number, task: Task): Promise<Task> => {
  const res = await axios.put<Task>(`${API_URL}/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
