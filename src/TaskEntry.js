import React from 'react';

const TaskEntry =({ task }) => {
  return (
    <div className="TaskEntryContainer">
      <div className="imageContainer">
      </div>
      <div className="taskTextContainer"> {task.task}
      </div>
    </div>
  )
}

export default TaskEntry;
