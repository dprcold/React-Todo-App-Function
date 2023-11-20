import React, { useEffect, useState } from 'react';

import './Footer.css';
import { TasksFilter } from '../TasksFilter/TasksFilter';
export const Footer = ({ count, setFilter, filteredTasks }) => {
  const [activeCounterValue, setActiveCounterValue] = useState(0);
  useEffect(() => {
    const num = filteredTasks().filter((task) => !task.completed).length;
    setActiveCounterValue(num);
  }, [filteredTasks]);
  return (
    <footer className="footer">
      {!activeCounterValue ? (
        <span className="todo-count">0 items left</span>
      ) : (
        <span className="todo-count">{count} items left</span>
      )}
      <TasksFilter setFilter={setFilter} />
    </footer>
  );
};
