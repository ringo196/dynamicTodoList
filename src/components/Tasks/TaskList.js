import React from 'react';
import PropTypes from 'prop-types';
import TaskEntry from './TaskEntry';
import './TaskList.css';

const TaskList = ({ taskList, page, taskGroupClickHandler, taskStatusClickHandler }) => (
  <div>
    <div className="headingContainer">
      {page}
      <div
        className="allGroups"
        role="presentation"
        onClick={taskGroupClickHandler}
      >
      ALL GROUPS
      </div>
    </div>
    {taskList.filter(task => task.group === page)
      .map(task => (
        <TaskEntry className="TaskEntry" taskList={taskList} task={task} key={task.id} taskStatusClickHandler={taskStatusClickHandler} />
      ))}
  </div>
);

TaskList.propTypes = {
  page: PropTypes.string.isRequired,
  taskList: PropTypes.array.isRequired,
  taskGroupClickHandler: PropTypes.func.isRequired,
  taskStatusClickHandler: PropTypes.func.isRequired
};

export default TaskList;
