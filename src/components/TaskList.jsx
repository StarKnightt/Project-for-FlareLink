import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-gray-500"
      >
        <p className="text-lg mb-2">No tasks found</p>
        <p className="text-sm">Add a new task to get started!</p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </AnimatePresence>
  );
}