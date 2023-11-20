import React, { useContext, useState } from 'react';

import { FilterContext } from '../NewTaskForm/NewTaskForm';
import './TasksFilter.css';
export const TasksFilter = ({ setFilter }) => {
  const { deleteCompletedTasks } = useContext(FilterContext);
  const [defaultStyle, setStyle] = useState('All');
  const buttons = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Active' },
    { id: 3, name: 'Completed' },
  ].map((button) => {
    return (
      <button
        key={button.id}
        className={defaultStyle === button.name ? 'selected' : null}
        onClick={() => {
          setStyle(button.name);
          setFilter(button.name);
        }}
      >
        {button.name}
      </button>
    );
  });
  return (
    <>
      <div className="filters">{buttons}</div>
      <button className="clear-completed" onClick={deleteCompletedTasks}>
        Clear completed
      </button>
    </>
  );
};
