import React, { useContext, useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import {clearTaskList} from '../firebase.js';
import { UserContext } from '../contexts/UserContext';

const TaskList = ({ status, tasks, moveTask }) => {
  const [ isStaging, setIsStaging ] = useState(false);
  const [ menuEnabled, setMenuEnabled ] = useState(false);

  const { user } = useContext(UserContext);

  // heading text for task status lists
  const statusString = {
    open: "Todo",
    inProgress: "In Progress",
    complete: "Completed"
  }
  

  // --------------------------- toggleMenuEnabled
  const toggleMenuEnabled = () => setMenuEnabled(!menuEnabled);

  const toggleTaskStaging = () => setIsStaging(!isStaging);


  // --------------------------- handleClearList
  const handleClearList = () => {
    // if task lst has items
    if (tasks.length) {

      // filter out the full task items list to those with the status of the task list
      const taskListItems = 
      tasks
        .filter(task => task.status === status)
        // create an object with the keys of the task list items with a null value
        .reduce(((deleteList, taskItem) => { 
          deleteList[taskItem.key] = null;
          return deleteList;
        }), {});
      // remove the filtered items from firebase
      clearTaskList(user.dbRef, taskListItems)  
    }
    // toggle tasklist menu to false
    setMenuEnabled(false);
  }
  
  // --------------------------- return

  return(
    <div className="taskList">
      <div className={`taskList__header taskList__header--${status}`}>
        <label htmlFor={`taskListMenuBtn--${status}`} className="srOnly">Click the button to toggle the task list menu to clear the task list's items</label>
        <button 
          id={`taskListMenuBtn--${status}`} className={menuEnabled ? "btn taskList__menuBtn taskList__menuBtn--active" : "btn taskList__menuBtn" } 
          onClick={toggleMenuEnabled}>
            <span className="srOnly">Toggle the task list's menu</span>
          {!menuEnabled ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faTimes} /> }  
        </button>
        
        <h2 className="taskList__headingText">
          {/* Task List Name */}
          {statusString[status]} 
          {/* Task List Item Counter */}
          {tasks.length > 0 && <span className="taskList__count">{tasks.length}</span>}
        </h2>

        {
          // Toggle task list header icon depending if the menuEnabled is true
          !menuEnabled 
          ? 
          <>
            <label htmlFor={`taskListAddBtn--${status}`} className="srOnly">Click the button to toggle the add new task form</label>
            <button id={`taskListAddBtn--${status}`} onClick={toggleTaskStaging} className={`btn taskList__addBtn`} disabled={isStaging ? 'disabled' : ''}>Add Task</button>
          </>
          : 
          <>
            <label htmlFor={`taskListClearBtn--${status}`} className="srOnly">Click the button to clear the task list's items</label>
            <button id={`taskListClearBtn--${status}`} onClick={handleClearList} className={`btn btn--black taskList__clearBtn`} disabled={tasks.length ? '' : 'disabled' }>Clear List</button>
          </>
        }
        
        
      </div>
      <ul className="taskList__list">
        { 
        // render a TaskForm to add a new task for the task list
          isStaging && 
          <li className={`taskItem taskItem--${status}`}>
            <TaskForm 
              id={status}
              toggleTaskForm={toggleTaskStaging}
            />
          </li>
        }
        { 
        // render the taskform items for the list
          tasks.map(({key, task, status}) => (
            <TaskItem 
              key={key} 
              id={key} 
              task={task} 
              status={status} 
              moveTask={moveTask} 
            />)
          )
        }
      </ul>
    </div>
  )

}
export default TaskList;