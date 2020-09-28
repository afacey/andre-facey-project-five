import React, { Component} from 'react';
import TaskForm from './TaskForm.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import autosize from 'autosize';

class TaskItem extends Component {
  constructor(props) {
    super()

    this.state = {
      taskEdit: props.task,
      isEditing: false,
    }
  }
  
  // --------------------------- componentDidUpdate
  componentDidUpdate() {
    const input = document.querySelector(`#taskEdit_${this.props.id}`);
    if (input) {
      autosize(input);

      // set the cursor to the end of the text input by setting value to "" > focus > value back to state.taskEdit
      input.value = "";
      input.focus();
      input.value = this.state.taskEdit;
    } 

  }

  // --------------------------- handleBlur
  handleBlur = (evt) => {
    // implementation from https://gist.github.com/pstoica/4323d3e6e37e8a23dd59
    const currentTarget = evt.currentTarget;

    // Check the newly focused element in the next tick of the event loop
    setTimeout(() => {
      // Check if the new activeElement is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        // You can invoke a callback or add custom logic here
        this.setState({isEditing: false});
      }
    }, 0);
  }

  // --------------------------- handleChange
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  // --------------------------- handleEditSubmit
  handleEditSubmit = (evt) => {
    evt.preventDefault();
    this.props.editTask(this.props.id, this.state.taskEdit);
    this.setState({isEditing: false});
  }

  // --------------------------- handleMovePrev
  handleMovePrev = () => this.props.moveTask(this.props.id, this.props.status, -1);
  // --------------------------- handleMoveNext
  handleMoveNext = () => this.props.moveTask(this.props.id, this.props.status, 1);

  // --------------------------- removeTask
  removeTask = () => this.props.removeTask(this.props.id);
  
  // --------------------------- toggleEdit
  toggleEdit = () => this.setState({ isEditing: !this.state.isEditing });

  // --------------------------- render
  render() {

    const { id, task, status } = this.props;
  
    return(
      <li className={`taskItem taskItem--${status}`} >
      
      {
        status !== 'open' 
        &&
        <button className="btn__task btn__task--prev" onClick={this.handleMovePrev}>
          <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
          <span className="sr-only">Click to move task to the next status</span>
        </button>
      }
    
    { 
      !this.state.isEditing 
        ? <p className="taskItem__text" onClick={this.toggleEdit} onFocus={this.toggleEdit} tabIndex="0">{task}</p> 
        : <TaskForm 
            id={id}
            type="edit"
            handleSubmit={this.handleEditSubmit} 
            handleBlur={this.handleBlur} 
            handleChange={this.handleChange}
            taskValue={this.state.taskEdit}
            removeTask={this.removeTask}
            toggleForm={this.toggleEdit}
          />
    }
      
    {
      status !== "complete" 
      &&
      <button className="btn__task btn__task--next" onClick={this.handleMoveNext}>
        <FontAwesomeIcon icon={faChevronRight} aria-hidden="true"/>
        <span className="sr-only">Click to move task to the next status</span>
      </button>
    }
    </li>
    ) 
  }
}

export default TaskItem;