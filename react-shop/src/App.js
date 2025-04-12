import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './components/Header';
import Footer from "./components/Footer";

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
          <div>
              <Header/>
          </div>
          <h2>Задача</h2>
          <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addTask}>Добавить задачу</button>
          <ul>
              {tasks.map(task => (
                  <li key={task.id}>{task.title} - {task.completed ? '✅' : '❌'}</li>
              ))}
          </ul>
          <div>
              <Footer/>
          </div>
      </div>
  );
}

export default App;
