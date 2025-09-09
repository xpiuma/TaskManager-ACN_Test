import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskManager from './TaskManager';
import * as api from './api';

jest.mock('./api');

const mockTasks = [
  { id: 1, title: 'Test Task 1', description: 'Desc 1', completed: false },
  { id: 2, title: 'Test Task 2', description: 'Desc 2', completed: true },
];

describe('TaskManager', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders tasks from API', async () => {
    (api.getTasks as jest.Mock).mockResolvedValue(mockTasks);
    render(<TaskManager />);
    expect(await screen.findByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  it('can add a new task', async () => {
    (api.getTasks as jest.Mock).mockResolvedValueOnce([]).mockResolvedValueOnce([
      ...mockTasks,
      { id: 3, title: 'New Task', description: '', completed: false },
    ]);
    (api.createTask as jest.Mock).mockResolvedValue({ id: 3, title: 'New Task', description: '', completed: false });
    render(<TaskManager />);
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('Add Task'));
    expect(await screen.findByText('New Task')).toBeInTheDocument();
  });

  it('shows error if title is missing', async () => {
    (api.getTasks as jest.Mock).mockResolvedValue([]);
    render(<TaskManager />);
    fireEvent.click(screen.getByText('Add Task'));
    expect(await screen.findByText('Title is required')).toBeInTheDocument();
  });

  it('can delete a task', async () => {
    (api.getTasks as jest.Mock).mockResolvedValueOnce(mockTasks).mockResolvedValueOnce([mockTasks[1]]);
    (api.deleteTask as jest.Mock).mockResolvedValue(undefined);
    render(<TaskManager />);
    expect(await screen.findByText('Test Task 1')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Delete')[0]);
    await waitFor(() => expect(screen.queryByText('Test Task 1')).not.toBeInTheDocument());
  });

  it('can edit a task', async () => {
    (api.getTasks as jest.Mock).mockResolvedValueOnce(mockTasks).mockResolvedValueOnce([
      { id: 1, title: 'Edited Task', description: 'Desc 1', completed: false },
      mockTasks[1],
    ]);
    (api.updateTask as jest.Mock).mockResolvedValue({ id: 1, title: 'Edited Task', description: 'Desc 1', completed: false });
    render(<TaskManager />);
    expect(await screen.findByText('Test Task 1')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Edited Task' } });
    fireEvent.click(screen.getByText('Update Task'));
    expect(await screen.findByText('Edited Task')).toBeInTheDocument();
  });
});
