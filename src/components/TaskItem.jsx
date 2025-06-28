import "../style.css"
const TaskItem = ({name}) => {
  return (
    <div className='task-item'>{name}</div>
  )
}

export default TaskItem