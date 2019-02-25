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
    return (
      <div className="taskEntryContainer">
        {
          (() => {
            const { status } = this.state;
            const { taskStatusClickHandler, task } = this.props;

            switch (status) {
              case 'completed': return (
                <div
                  className="completed"
                  role="presentation"
                  onClick={(entryStatus, taskId) => {
                    taskStatusClickHandler(entryStatus, task.id);
                  }}
                >
                  <div className="taskImageContainer">
                    <img src={`${process.env.PUBLIC_URL} Completed.svg`} alt="Completed icon." />
                  </div>
                  <div className="textContainer">
                    <div className="taskName">{task.task}</div>
                  </div>
                </div>
              );
              case 'incomplete': return (
                <div
                  className="incomplete"
                  role="presentation"
                  onClick={(entryStatus, taskId) => {
                    taskStatusClickHandler(entryStatus, task.id);
                  }}
                >
                  <div className="taskImageContainer">
                    <img src={`${process.env.PUBLIC_URL} Incomplete.svg`} alt="Incomplete icon." />
                  </div>
                  <div className="textContainer">
                    <div className="taskName">{task.task}</div>
                  </div>
                </div>
              );
              case 'locked': return (
                <div className="locked">
                  <div className="taskImageContainer">
                    <img src={`${process.env.PUBLIC_URL} Locked.svg`} alt="Locked icon." />
                  </div>
                  <div className="textContainer">
                    <div className="taskName">{task.task}</div>
                  </div>
                </div>
              );
              default: return null;
            }
          })()
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
