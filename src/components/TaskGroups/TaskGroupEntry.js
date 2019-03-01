import React from 'react';
import PropTypes from 'prop-types';
import './TaskGroupEntry.css';

const TaskGroupEntry = ({ taskGroup, taskGroupClickHandler }) => (
  <div
    className="Task-Group-Entry__container"
    role="presentation"
    onClick={() => {
      taskGroupClickHandler(taskGroup.tasks);
    }}
  >
    <div className="Task-Group-Entry__image-container">
      <img
        src={`${process.env.PUBLIC_URL} Group.svg`}
        alt="This is arrow bullet point."
      />
    </div>
    <div className="Task-Group-Entry__text-container">
      <div className="Task-Group-Entry__name-text">{ taskGroup.name }</div>
      <div className="Task-Group-Entry__completion-text">{`${taskGroup.completed} OF ${taskGroup.totalTasks} TASKS COMPLETE`}</div>
    </div>
  </div>
);

TaskGroupEntry.propTypes = {
  taskGroup: PropTypes.object.isRequired,
  taskGroupClickHandler: PropTypes.func.isRequired
};

export default TaskGroupEntry;
