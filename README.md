# Task Manager

A modern, feature-rich task management application built with React and JavaScript. This application helps users organize their tasks with advanced features like priority management, sorting, and real-time search capabilities.

## Features

### Core Functionality
- ✅ Create and manage tasks with titles
- 🗑️ Delete unwanted tasks
- ✔️ Mark tasks as complete/incomplete
- 💾 Automatic data persistence using local storage

### Advanced Features
- 🔍 Real-time search functionality
- ⭐ Priority levels (High, Medium, Low)
- 🔄 Multiple sorting options:
  - Date (newest first)
  - Priority (high to low)
  - Alphabetical order
  - Completion status
- ✨ Smooth animations for better user experience
- 📱 Fully responsive design

## Tech Stack

- **React** - UI framework
- **JavaScript** - Programming language
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon components
- **Local Storage** - Data persistence

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage Guide

### Task Management
- **Adding Tasks**: Enter task title in the input field and select priority
- **Completing Tasks**: Click the checkbox button next to any task
- **Deleting Tasks**: Click the trash icon to remove a task
- **Setting Priority**: Choose priority level when creating a task (Low/Medium/High)

### Organization Features
- **Search**: Use the search bar to filter tasks in real-time
- **Sort**: Use the dropdown to sort tasks by:
  - Date added
  - Priority level
  - Alphabetical order
  - Completion status

### Data Persistence
- All tasks are automatically saved to local storage
- Tasks persist between browser sessions
- No account required

## Development Assumptions

1. **Browser Support**
   - Modern browser with localStorage support
   - JavaScript enabled
   - CSS Grid and Flexbox support

2. **Performance**
   - Optimized for up to 100 tasks
   - Local storage capacity sufficient for task data

3. **User Experience**
   - Single user per browser
   - English language interface
   - Desktop-first design with responsive mobile support

4. **Data Structure**
   Task object structure:
   ```javascript
   {
     id: number,
     title: string,
     completed: boolean,
     priority: 'low' | 'medium' | 'high',
     date: string (ISO format)
   }
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.