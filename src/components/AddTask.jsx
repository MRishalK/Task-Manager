import React,{useState} from 'react'


const AddTask  = ({addTask}) => {
    const [taskname,setTaskName] = useState(" ");
  return (
    <form>
    <div className='at'>
        <div>
         <label htmlFor="taskname">Taskname:</label>
            <input id="taskname" type="text" value={taskname} onChange={e => setTaskName(e.target.value)}
            placeholder='enter your tasks'/>
            <button onClick={() => addTask(taskname)}>Add Task</button>
        </div>
    </div>
    </form>
  )
}

export default AddTask