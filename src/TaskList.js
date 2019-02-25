import React from 'react';
import TaskEntry from './TaskEntry.js'

const TaskList =({ taskList, page, taskGroupClickHandler, taskStatusClickHandler }) => {
  return (
    <div>
      <div className="TaskGroupPage">{page}</div>
        <div onClick={taskGroupClickHandler}>All Groups</div>
        {taskList.filter((task) => task.group === page)
        .map( task => {
          return <TaskEntry className="TaskEntry" taskList={ taskList } task={ task } key={ task.id } taskStatusClickHandler={taskStatusClickHandler} />
      })}
    </div>
  )
}

export default TaskList;
