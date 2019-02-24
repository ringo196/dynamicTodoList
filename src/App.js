import React, { Component } from 'react';
import './App.css';
import TaskList from './TaskList.js'
import TaskGroupList from './TaskGroupList.js'
import taskData from './data.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 0,
      allTasks: taskData,
      taskGroups: [],
    }
    this.taskGroupClickHandler = this.taskGroupClickHandler.bind(this);
  }

  getTaskGroupsData() {
    /*
      This function would normally be an AJAX request to the server and database to 
    fetch whatever data is needed to generate the dynamic components, but since 
    we are only working on the frontend, I am using passed down dummy data and 
    filtering it to match the shape of the data that I need at this point.
    */
    let taskGroups = {};
    let groupList = [];

    taskData.forEach( task => {
      let name = task.group;

      if(!taskGroups[name]) {
        taskGroups[name] = {
          name: name,
          totalTasks: 1,
          tasks: [],
        }
        if (task.completedAt) {
          taskGroups[name].completed = 1;
        } else {
          taskGroups[name].completed = 0;
        }

      } else {
        taskGroups[name].totalTasks++
        if (task.completedAt) {
          taskGroups[name].completed++;
        }
      }
      taskGroups[name].tasks.push(task)
    })

    for (let key in taskGroups) {
      groupList.push(taskGroups[key])
    }
    //******************* delete console.log callback later
    this.setState({taskGroups: groupList}, () => console.log('callback',this.state.taskGroups))
  } 

  taskGroupClickHandler (tasks){
    if (this.state.page === 0) {
      this.setState({page: tasks[0].group}, () => console.log(this.state))  
    } else {
      this.setState({page: 0})
    }
    
  }

  componentDidMount () {
    this.getTaskGroupsData();
  }

  render() {
    let page;
    console.log('app ', this.state.taskGroups)

    if(this.state.page === 0) {
      page = <TaskGroupList taskData={ taskData } 
        taskGroupClickHandler={this.taskGroupClickHandler} 
        taskGroups={ this.state.taskGroups }
      />
    }

    if(this.state.page !== 0) {
      page = <TaskList page={ this.state.page } taskList={ taskData } taskGroupClickHandler={this.taskGroupClickHandler} />
    }


    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
