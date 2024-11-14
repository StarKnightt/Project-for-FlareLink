import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

export default function TaskForm({ onSubmit, isFormFocused, setIsFormFocused }) {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    onSubmit({ title: newTask, priority });
    setNewTask('');
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className={`mb-8 p-4 rounded-xl transition-all duration-200 ${
        isFormFocused ? 'bg-blue-50 shadow-md' : 'bg-gray-50'
      }`}
      animate={{ scale: isFormFocused ? 1.02 : 1 }}
    >
      <div className="flex gap-3 mb-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onFocus={() => setIsFormFocused(true)}
          onBlur={() => setIsFormFocused(false)}
          placeholder="What needs to be done?"
          className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-3 border border-gray-200 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    bg-white"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 
                  rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all
                  duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <FaPlus /> Add Task
      </button>
    </motion.form>
  );
}