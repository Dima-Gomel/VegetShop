import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('/api/tasks/');
    setTasks(response.data);
  };

  const addTask = async () => {
    await axios.post('/api/tasks/', { title, completed: false });
    fetchTasks();
    setTitle('');
  };

  return (
    <div>
      <h1>Tasks</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title} - {task.completed ? '✅' : '❌'}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;