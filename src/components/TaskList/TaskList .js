import React, { useEffect, useState } from 'react';

import './TaskList.css';
import { Task } from '../Task/Task ';
import { Footer } from '../Footer/Footer';
export const TaskList = ({ tasks, onDeleted, onEdited, onCheckboxChange, filteredTasks, setFilter }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const num = tasks.reduce((count, task) => {
      if (!task.completed) {
        return count + 1;
      }
      return count;
    }, 0);
    setCount(num);
  }, [tasks]);

  return (
    <>
      <ul className="todo-list">
        {filteredTasks() !== undefined
          ? filteredTasks().map((task) => {
              return (
                <Task
                  completed={task.completed}
                  createdDate={task.createdDate}
                  key={task.id}
                  id={task.id}
                  onDeleted={onDeleted}
                  onEdited={onEdited}
                  onCheckboxChange={onCheckboxChange}
                  minutes={task.minutes}
                  seconds={task.seconds}
                >
                  {task.taskText}
                </Task>
              );
            })
          : null}
      </ul>
      <Footer count={count} setFilter={setFilter} filteredTasks={filteredTasks} />
    </>
  );
};
