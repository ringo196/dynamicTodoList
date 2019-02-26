import React, { Component } from 'react';

class TaskEntry extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: null,
    }
  }

  componentDidMount(){
    this.getStatus();
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps){
      this.getStatus()
    }
  }


  getStatus(){
    if(this.props.task.completedAt){
      this.setState({status: 'completed'})
    } else {
      this.setState({status: 'incomplete'})
      this.props.taskList.forEach((task) => {
        if(this.props.task.dependencyIds.includes(task.id)){
          if(!task.completedAt){
            this.setState({ status: 'locked' });
          }
        }
      })
    }
  }


  render(){
    return (
      <div>
        {
          (() =>{
            switch (this.state.status) {
              case 'completed': return (
                <div className="completed" onClick={(status, taskId) => {
                  this.props.taskStatusClickHandler(this.state.status, this.props.task.id, () => console.log(this.state.status))} } >
                  <img src={process.env.PUBLIC_URL + "Completed.svg"} alt="Completed icon."/>
                  <div>{this.props.task.task}</div>
                </div>
                )
              case 'incomplete': return (
                <div className="incomplete" onClick={(status, taskId) => {
                  this.props.taskStatusClickHandler(this.state.status, this.props.task.id, () => console.log(this.state.status))} } >
                  <img src={process.env.PUBLIC_URL + "Incomplete.svg"} alt="Incomplete icon."/>
                  <div>{this.props.task.task}</div>
                </div>
                )
              case 'locked': return (
                <div className="locked">
                  <img src={process.env.PUBLIC_URL + "Locked.svg"} alt="Locked icon."/>
                  <div>{this.props.task.task}</div>
                </div>
                ) 
              default: return null
            }
          })() 
        }
      </div>
    )
  }
}

export default TaskEntry;
