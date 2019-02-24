import React from 'react';
import TaskEntry from './TaskEntry.js'

const TaskList =({ taskList, page, taskGroupClickHandler }) => {
  return (
    <div>
      <div className="TaskGroupPage">{page}</div>
        <div onClick={taskGroupClickHandler}>All Groups</div>
        {taskList.filter((task) => task.group === page)
        .map( task => {
          return <TaskEntry className="TaskEntry" task={ task } key={ task.id } />
      })}
    </div>
  )
}

export default TaskList;
