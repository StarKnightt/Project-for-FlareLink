import { motion } from 'framer-motion';
import { FaCheck, FaStar, FaTrash } from 'react-icons/fa';

export default function TaskItem({ task, onToggle, onDelete }) {
  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-500',
      medium: 'text-yellow-500',
      low: 'text-green-500'
    };
    return colors[priority] || 'text-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="group"
    >
      <div className={`flex items-center justify-between p-4 mb-3 rounded-xl
                    border border-gray-100 hover:shadow-lg transition-all duration-200
                    ${task.completed ? 'bg-gray-50' : 'bg-white'}`}
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggle(task.id)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              task.completed 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <FaCheck className={task.completed ? 'text-white' : 'text-gray-400'} />
          </motion.button>
          <div>
            <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <FaStar className={getPriorityColor(task.priority)} />
              <span className="text-sm text-gray-500 capitalize">
                {task.priority} Priority
              </span>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 
                    transition-all duration-200"
        >
          <FaTrash />
        </motion.button>
      </div>
    </motion.div>
  );
}