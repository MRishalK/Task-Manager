import React from 'react'
import TaskItem from './TaskItem'

const TaskList = ({tasks}) => {
    

  return (
    <div>
        <ul>
      {tasks.map((task, index) => (
        <TaskItem key={index} name={task}></TaskItem>
      ))}
    </ul>
    </div>
  )
}

export default TaskList