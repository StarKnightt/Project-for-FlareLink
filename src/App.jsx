import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPlus, FaTrash, FaCheck } from 'react-icons/fa';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
      priority,
      date: new Date().toISOString(),
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredAndSortedTasks = tasks
    .filter(task => 
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return getPriorityValue(b.priority) - getPriorityValue(a.priority);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'completion':
          return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  function getPriorityValue(priority) {
    const values = { high: 3, medium: 2, low: 1 };
    return values[priority] || 0;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Task Manager</h1>
        
        {/* Search Bar */}
        <div className="mb-6 relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Add Task Form */}
        <form onSubmit={addTask} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaPlus />
          </button>
        </form>

        {/* Sort Controls */}
        <div className="mb-6">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="alphabetical">Sort Alphabetically</option>
            <option value="completion">Sort by Completion</option>
          </select>
        </div>

        {/* Task List */}
        <AnimatePresence>
          {filteredAndSortedTasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-center justify-between p-4 mb-2 border rounded-lg ${
                task.completed ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`p-2 rounded-full ${
                    task.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  <FaCheck className={task.completed ? 'text-white' : 'text-gray-400'} />
                </button>
                <div>
                  <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </p>
                  <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-600 p-2"
              >
                <FaTrash />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function getPriorityColor(priority) {
  const colors = {
    high: 'text-red-500',
    medium: 'text-yellow-500',
    low: 'text-green-500'
  };
  return colors[priority] || 'text-gray-500';
}

export default App;