import React, { Component } from 'react';
import TaskList from './TaskList.js';

class TaskGroupPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupTasks: this.props.groupTasks,
    }
  }

  render() {
    return (
      <div className="TaskGroupPage">{this.state.groupTasks[0].group}
        <div onClick={this.props.taskGroupClickHandler}>All Groups</div>
        <TaskList groupTasks={this.state.groupTasks} />
      </div>
    );
  }
}

export default TaskGroupPage;

