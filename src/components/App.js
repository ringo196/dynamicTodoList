import React, { Component } from 'react';
import './App.css';
import TaskList from './Tasks/TaskList';
import TaskGroupList from './TaskGroups/TaskGroupList';
import taskData from '../sampleData/data';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page: 'home',
      allTasks: taskData,
      taskGroups: []
    };
    this.taskGroupClickHandler = this.taskGroupClickHandler.bind(this);
    this.taskStatusClickHandler = this.taskStatusClickHandler.bind(this);
  }

  componentDidMount () {
    this.getTaskGroupsData();
  }

  getTaskGroupsData () {
    const taskGroups = {};
    const groupList = [];
    const { allTasks } = this.state;

    allTasks.forEach((task) => {
      const name = task.group;

      if (!taskGroups[name]) {
        taskGroups[name] = {
          name: task.group,
          totalTasks: 1,
          tasks: []
        };
        if (task.completedAt) {
          taskGroups[name].completed = 1;
        } else {
          taskGroups[name].completed = 0;
        }
      } else {
        taskGroups[name].totalTasks += 1;
        if (task.completedAt) {
          taskGroups[name].completed += 1;
        }
      }
      taskGroups[name].tasks.push(task);
    });

    Object.keys(taskGroups).forEach((key) => {
      groupList.push(taskGroups[key]);
    });

    this.setState({ taskGroups: groupList });
  }

  taskGroupClickHandler (tasks) {
    const { page } = this.state;

    if (page === 'home') {
      this.setState({ page: tasks[0].group });
    } else {
      this.setState({ page: 'home' });
    }
  }

  taskStatusClickHandler (status, taskId) {
    const { allTasks } = this.state;

    const tempAllTasks = allTasks.map((task) => {
      if (task.id === taskId) {
        if (!task.completedAt) {
          task.completedAt = Date.now();
        } else if (task.completedAt) {
          task.completedAt = null;
        }
      }
      return task;
    });

    this.setState({ allTasks: tempAllTasks });
    this.getTaskGroupsData();
  }

  render () {
    const { page, taskGroups, allTasks } = this.state;

    return (
      <div className="App">
        {
          page === 'home'
            ? (
              <TaskGroupList
                taskList={allTasks}
                taskGroupClickHandler={this.taskGroupClickHandler}
                taskGroups={taskGroups}
              />
            ) : (
              <TaskList
                taskStatusClickHandler={this.taskStatusClickHandler}
                page={page}
                taskList={allTasks}
                taskGroupClickHandler={this.taskGroupClickHandler}
              />
            )
        }
      </div>
    );
  }
}

export default App;
