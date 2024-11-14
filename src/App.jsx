import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './components/SearchBar';
import TaskForm from './components/TaskForm';
import SortControl from './components/SortControl';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [isFormFocused, setIsFormFocused] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({ title, priority }) => {
    const task = {
      id: Date.now(),
      title,
      completed: false,
      priority,
      date: new Date().toISOString(),
    };
    
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityValue = (priority) => {
    const values = { high: 3, medium: 2, low: 1 };
    return values[priority] || 0;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <h1 className="text-3xl font-bold text-center">Task Manager</h1>
            <p className="text-center text-blue-100 mt-2">Organize your day efficiently</p>
          </div>

          <div className="p-6">
            <SearchBar value={search} onChange={setSearch} />
            <TaskForm 
              onSubmit={addTask}
              isFormFocused={isFormFocused}
              setIsFormFocused={setIsFormFocused}
             />
            <SortControl value={sortBy} onChange={setSortBy} />
            <TaskList 
              tasks={filteredAndSortedTasks}
              onToggle={toggleComplete}
              onDelete={deleteTask}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;