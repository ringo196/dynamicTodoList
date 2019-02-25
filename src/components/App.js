import React, { Component } from 'react';
import TaskList from './TaskList/TaskList';
import TaskGroupList from './TaskGroupList/TaskGroupList';
import taskData from './data';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page: 0,
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
    /*
      This function would normally be an AJAX request to the server and database to
    fetch whatever data is needed to generate the dynamic components, but since
    we are only working on the frontend, I am using passed down dummy data and
    filtering it to match the shape of the data that I need at this point.
    */
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

    if (page === 0) {
      this.setState({ page: tasks[0].group });
    } else {
      this.setState({ page: 0 });
    }
  }

  taskStatusClickHandler (status, taskId) {
    const { allTasks } = this.state;
    const tempAllTasks = allTasks;

    tempAllTasks.forEach((task) => {
      if (task.id === taskId) {
        if (!task.completedAt) {
          task.completedAt = Date.now();
        } else if (task.completedAt) {
          task.completedAt = null;
        }
      }
    });

    this.setState({ allTasks: tempAllTasks });
    this.getTaskGroupsData();
  }

  render () {
    let main;
    const { page, taskGroups, allTasks } = this.state;

    if (page === 0) {
      main = (
        <TaskGroupList
          taskList={allTasks}
          taskGroupClickHandler={this.taskGroupClickHandler}
          taskGroups={taskGroups}
        />
      );
    }

    if (page !== 0) {
      main = (
        <TaskList
          taskStatusClickHandler={this.taskStatusClickHandler}
          page={page}
          taskList={allTasks}
          taskGroupClickHandler={this.taskGroupClickHandler}
        />
      );
    }

    return (
      <div className="App">
        {main}
      </div>
    );
  }
}

export default App;
