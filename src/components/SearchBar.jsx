import { FaSearch } from 'react-icons/fa';
import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-6 relative group">
      <FaSearch className="absolute left-4 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200 hover:bg-gray-100"
      />
    </div>
  );
}
