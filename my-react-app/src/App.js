// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEditingTask = (taskId, taskText) => {
    setEditingTaskId(taskId);
    setEditingTaskText(taskText);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, text: editingTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  return (
    <div className="App">
      <h1>Organizo</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editingTaskText}
                onChange={(e) => setEditingTaskText(e.target.value)}
              />
            ) : (
              <span
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                onClick={() => toggleTask(task.id)}
              >
                {task.text}
              </span>
            )}
            <div class="flex">
              <button onClick={() => startEditingTask(task.id, task.text)} class="secondary-button">Edit</button>
              <button onClick={() => deleteTask(task.id)} class="secondary-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editingTaskId !== null && (
        <div>
          <button onClick={updateTask}>Update Task</button>
          <button onClick={() => setEditingTaskId(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
