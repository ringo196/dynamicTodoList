import React from 'react';

const TaskGroupEntry =({ taskGroup, taskGroupClickHandler }) => {
  return (
    <div className="TaskGroupEntryContainer" onClick={() => {
      taskGroupClickHandler(taskGroup.tasks)}}>
      <div className="imageContainer">
        <img 
          src={process.env.PUBLIC_URL + "group.svg"} 
          alt="This is arrow bullet point."
        />
      </div>
      <div className="taskGroupTextContainer">        
        <div className="taskGroupNameText">{ taskGroup.name }</div>
        <div className="taskGroupCompletionText">{ taskGroup.completed } OF { taskGroup.totalTasks } TASKS COMPLETE</div>
      </div>
    </div>
  )
}

export default TaskGroupEntry;
