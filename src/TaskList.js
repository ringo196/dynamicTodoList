import React from 'react';
import TaskEntry from './TaskEntry.js'

const TaskList =({ groupTasks }) => {
  return (
    <div>
      {groupTasks.map( task => {
        return <TaskEntry 
          className="TaskEntry"
          task={ task }
          key={ task.id }
        />
      })}
    </div>
  )
}

export default TaskList;
