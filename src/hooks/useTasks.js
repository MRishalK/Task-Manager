import React, { useState } from "react"

function useTasks() {
     const [tasks, setTasks] = useState([]);
      const [editingTaskId, setEditingTaskId] = useState(null);
      const [editedTitle, setEditedTitle] = useState('');
    
      const handleAddTask = (task) => {
        setTasks((prev) => [task, ...prev]);
      };
    
      const toggleTaskCompleted = (id) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      };
    
      const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      };
    
    
      const startEditing = (task) => {
        setEditingTaskId(task.id);
        setEditedTitle(task.title);
      };
    
      
      const saveEdit = (id) => {
        if (editedTitle.trim() === '') return; // avoid empty titles
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, title: editedTitle.trim() } : task
          )
        );
        setEditingTaskId(null);
        setEditedTitle('');
      };
    
      
      const cancelEdit = () => {
        setEditingTaskId(null);
        setEditedTitle('');
      };
    
      return{tasks,handleAddTask,toggleTaskCompleted, setEditedTitle,saveEdit,startEditing,cancelEdit,deleteTask,editedTitle,editingTaskId}
}
export default useTasks;