import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const TaskBoardMenu = props => {
  const { handleChange, searchTerms } = props;

  return(
    <section className="taskBoard__menu">

      {/* Task List Filter Inputs */}
      <div className="inputContainer__filter">
        <span className="srOnly">Filter the task items by list</span>
        <input type="radio" className="srOnly" name="listFilter" id="filterAll" value="all" onChange={handleChange} defaultChecked />
        <label className="btn btn--orange" htmlFor="filterAll">All</label>
        
        <input type="radio" className="srOnly" name="listFilter" id="filterOpen" value="open" onChange={handleChange} />
        <label className="btn btn--red" htmlFor="filterOpen">Open</label>
        
        <input type="radio" className="srOnly" name="listFilter" id="filterInProgress" value="inProgress" onChange={handleChange} />
        <label className="btn btn--blue" htmlFor="filterInProgress">In Progress</label>
        
        <input type="radio" className="srOnly" name="listFilter" id="filterComplete" value="complete" onChange={handleChange} />
        <label className="btn btn--green" htmlFor="filterComplete">Complete</label>
      </div>

      {/* Task List Search Bar */}
      <div className="inputContainer__searchBar">
        <input className="taskBoard__searchBar" type="text" name="searchTerms" id="seachTerms" placeholder="search" onChange={handleChange} value={searchTerms} />
        <FontAwesomeIcon className="taskBoard__searchBarIcon" icon={faSearch} aria-hidden="true"/>
      </div>

    </section>
  )
}

export default TaskBoardMenu;