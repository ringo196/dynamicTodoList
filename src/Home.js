import React, { Component } from 'react';
import TaskGroupList from './TaskGroupList.js'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      taskGroups: [],
      taskData: this.props.taskData,
    }
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

    this.state.taskData.forEach( task => {
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
    this.setState({taskGroups: groupList}, () => console.log(this.state.taskGroups))
  } 

  componentDidMount () {
    this.getTaskGroupsData();
  }

  render() {

    return (
      <div className="Home">Things to Do
        <TaskGroupList 
          className="TaskGroupList"
          taskGroups={ this.state.taskGroups }
          taskGroupClickHandler={ this.props.taskGroupClickHandler }
        />
      </div>
    );
  }
}

export default Home;

