import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TaskEntry.css';

class TaskEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {
      status: null
    };
  }

  componentDidMount () {
    this.getStatus();
  }

  componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
      this.getStatus();
    }
  }

  getStatus () {
    const { task, taskList } = this.props;

    if (task.completedAt) {
      this.setState({ status: 'completed' });
    } else {
      this.setState({ status: 'incomplete' });
      taskList.forEach((taskObj) => {
        if (task.dependencyIds.includes(taskObj.id)) {
          if (!taskObj.completedAt) {
            this.setState({ status: 'locked' });
          }
        }
      });
    }
  }

  render () {
    const { status } = this.state;
    const { taskStatusClickHandler, task } = this.props;

    return (
      <div className="Task-Entry__container">
        {
          <div
            className={`Task-Entry__div-${status}`}
            role="presentation"
            onClick={(entryStatus, taskId) => {
              if (status !== 'locked') {
                taskStatusClickHandler(entryStatus, task.id);
              }
            }}
          >
            <div className="Task-Entry__image-container">
              <img
                src={`${process.env.PUBLIC_URL} ${status}.svg`}
                alt="Task status icon"
              />
            </div>
            <div className="Task-Entry__text-container">
              <div>{task.task}</div>
            </div>
          </div>
        }
      </div>
    );
  }
}

TaskEntry.propTypes = {
  task: PropTypes.object.isRequired,
  taskList: PropTypes.array.isRequired,
  taskStatusClickHandler: PropTypes.func.isRequired
};

export default TaskEntry;
