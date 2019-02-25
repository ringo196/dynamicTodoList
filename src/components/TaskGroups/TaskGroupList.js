import React from 'react';
import PropTypes from 'prop-types';
import TaskGroupEntry from './TaskGroupEntry';
import './TaskGroupList.css';

const TaskGroupList = ({ taskGroups, taskGroupClickHandler }) => (
  <div>
    <div className="mainTitle">Things To Do</div>
    {taskGroups.map(taskGroup => (
      <TaskGroupEntry
        className="TaskGroupEntry"
        taskGroup={taskGroup}
        key={taskGroup.name}
        taskGroupClickHandler={taskGroupClickHandler}
      />
    ))}
  </div>
);

TaskGroupList.propTypes = {
  taskGroups: PropTypes.array.isRequired,
  taskGroupClickHandler: PropTypes.func.isRequired
};

export default TaskGroupList;
