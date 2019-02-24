import React, { Component } from 'react';

class TaskEntry extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: 'incomplete',
    }
  }

  getStatus(){
    if(this.props.task.completedAt){
      this.setState({status: 'completed'})
    } else {
      this.props.taskList.forEach((task) => {
        if(this.props.task.dependencyIds.includes(task.id)){
          if(!task.completedAt){
            this.setState({ status: 'locked' })
          }
        }
      })
    }
  }

  componentDidMount(){
    this.getStatus();
  }

  render(){
    let status;
    if(this.state.status === 'completed'){
       status = <div>completed</div>
    }
    if(this.state.status === 'incomplete'){
       status = <div>incomplete</div>
    }
    if(this.state.status === 'locked'){
       status = <div>locked</div>
    }


    return (
      <div className="TaskEntryContainer">
        <div className="imageContainer">
        </div>
        {status}
        <div className="taskTextContainer"> {this.props.task.task}
        </div>
      </div>
    )
  }
}

export default TaskEntry;
