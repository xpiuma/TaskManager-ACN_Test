import React, { useEffect, useState } from 'react';
import type { Task } from './api';
import { getTasks, createTask, updateTask, deleteTask } from './api';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setTasks(await getTasks());
    } catch (e) {
      setError('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      if (editingId) {
        await updateTask(editingId, { ...newTask, id: editingId });
        setEditingId(null);
      } else {
        await createTask(newTask);
      }
      setNewTask({ title: '', description: '', completed: false });
      setError(null);
      fetchTasks();
    } catch {
      setError('Failed to save task');
    }
  };

  const handleEdit = (task: Task) => {
    setNewTask({ title: task.title, description: task.description || '', completed: task.completed });
    setEditingId(task.id!);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          className="border p-2 w-full"
          name="title"
          placeholder="Title"
          value={newTask.title}
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full"
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          {editingId ? 'Update Task' : 'Add Task'}
        </button>
        {editingId && (
          <button
            type="button"
            className="ml-2 bg-gray-300 px-4 py-2 rounded"
            onClick={() => { setEditingId(null); setNewTask({ title: '', description: '', completed: false }); }}
          >
            Cancel
          </button>
        )}
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between border-b py-2">
            <div>
              <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
              {task.description && <span className="text-gray-500 ml-2">- {task.description}</span>}
            </div>
            <div>
              <button className="text-blue-500 mr-2" onClick={() => handleEdit(task)}>Edit</button>
              <button className="text-red-500" onClick={() => handleDelete(task.id!)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
