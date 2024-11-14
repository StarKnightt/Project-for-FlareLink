import { FaSort } from 'react-icons/fa';

export default function SortControl({ value, onChange }) {
  return (
    <div className="mb-6 flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
      <FaSort className="text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent focus:outline-none"
      >
        <option value="date">Sort by Date</option>
        <option value="priority">Sort by Priority</option>
        <option value="alphabetical">Sort Alphabetically</option>
        <option value="completion">Sort by Completion</option>
      </select>
    </div>
  );
}