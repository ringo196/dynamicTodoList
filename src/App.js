import React, { Component } from 'react';
import './App.css';
import Home from './Home.js'
import TaskGroupPage from './TaskGroupPage.js'
import taskData from './data.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 0,
      allTasks: taskData,
      groupTasks: [],
    }
    this.taskGroupClickHandler = this.taskGroupClickHandler.bind(this);
  }

  taskGroupClickHandler (tasks){
    if (this.state.page === 0) {
      this.setState({page: tasks[0].group, groupTasks: tasks}, () => console.log(this.state))  
    } else {
      this.setState({page: 0})
    }
    
  }

  render() {
    let page;

    if(this.state.page === 0) {
      page = <Home taskData={ taskData } taskGroupClickHandler={this.taskGroupClickHandler} />
    }

    // if(this.state.page !== 0) {
    //   page = <TaskGroupPage tasks={this.state.tasks} taskGroupClickHandler={this.taskGroupClickHandler} />
    // }

    if(this.state.page !== 0) {
      page = <TaskGroupPage groupTasks={this.state.groupTasks} taskGroupClickHandler={this.taskGroupClickHandler} />
    }


    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
