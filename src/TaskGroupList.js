import React from 'react';
import TaskGroupEntry from './TaskGroupEntry.js'

const TaskGroupList =({ taskGroups, taskGroupClickHandler }) => {
  return (
    <div>
      <div>Things to Do</div>
        {taskGroups.map( taskGroup => {
          return <TaskGroupEntry 
            className="TaskGroupEntry"
            taskGroup={ taskGroup }
            key={ taskGroup.name }
            taskGroupClickHandler={ taskGroupClickHandler }
          />
      })}
    </div>
  )
}

export default TaskGroupList;
