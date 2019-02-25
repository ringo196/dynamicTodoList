import React from 'react';
import PropTypes from 'prop-types';
import './TaskGroupEntry.css';

const TaskGroupEntry = ({ taskGroup, taskGroupClickHandler }) => (
  <div
    className="taskGroupEntryContainer"
    role="presentation"
    onClick={() => {
      taskGroupClickHandler(taskGroup.tasks);
    }}
  >
    <div className="groupImageContainer">
      <img
        src={`${process.env.PUBLIC_URL} Group.svg`}
        alt="This is arrow bullet point."
      />
    </div>
    <div className="taskGroupTextContainer">
      <div className="taskGroupNameText">{ taskGroup.name }</div>
      <div className="taskGroupCompletionText">{`${taskGroup.completed} OF ${taskGroup.totalTasks} TASKS COMPLETE`}</div>
    </div>
  </div>
);

TaskGroupEntry.propTypes = {
  taskGroup: PropTypes.object.isRequired,
  taskGroupClickHandler: PropTypes.func.isRequired
};

export default TaskGroupEntry;
