import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './NewTaskForm.css';
import { TaskList } from '../TaskList/TaskList ';
import { TimerTask } from '../TaskTimer/TimerTask';
export const FilterContext = React.createContext();

export const NewTaskForm = () => {
  const [task, setTask] = useState('');
  const [taskItem, setTaskItemToArr] = useState(
    localStorage.getItem('taskItem') ? JSON.parse(localStorage.getItem('taskItem')) : []
  );
  const [filter, setFilter] = useState('All');
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const inputChange = (event) => {
    let newTask = event.target.value;
    if ((event.key === 'Enter' || event.keyCode === 13) && task.trim() !== '') {
      setTask(() => {
        setTaskItemToArr((prevTaskItem) => {
          const newTaskItem = {
            taskText: newTask,
            createdDate: new Date().toISOString(),
            completed: false,
            id: uuidv4(),
            minutes: time.minutes,
            seconds: time.seconds,
          };
          return [...prevTaskItem, newTaskItem];
        });
        return '';
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('taskItem', JSON.stringify(taskItem));
  }, [taskItem]);

  const handleDeleted = (id) => {
    setTaskItemToArr((prevState) => {
      return prevState.filter((task) => task.id !== id);
    });
  };

  const onUpdateText = (taskId, newTask) => {
    setTaskItemToArr((prevState) => {
      return prevState.map((task) => {
        if (task.id === taskId) {
          return { ...task, taskText: newTask };
        } else {
          return task;
        }
      });
    });
  };

  const handleCheckboxChange = (taskId, completed) => {
    setTaskItemToArr((prevState) => {
      return prevState.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed };
        } else {
          return task;
        }
      });
    });
  };

  const deleteCompletedTasks = () => {
    setTaskItemToArr((prevState) => {
      return prevState.filter((task) => !task.completed);
    });
  };

  const filteredTasks = () => {
    if (filter === 'All') {
      return taskItem;
    } else if (filter === 'Active') {
      return taskItem.filter((task) => !task.completed);
    } else if (filter === 'Completed') {
      return taskItem.filter((task) => task.completed);
    }
  };
  const onTimeChanhe = (newTime) => {
    setTime(newTime);
  };
  return (
    <FilterContext.Provider value={{ deleteCompletedTasks }}>
      <>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          onKeyDown={inputChange}
          autoFocus
        />
        <TimerTask onTimeChanhe={onTimeChanhe} />
        <TaskList
          tasks={taskItem}
          onDeleted={handleDeleted}
          onEdited={onUpdateText}
          onCheckboxChange={handleCheckboxChange}
          setFilter={setFilter}
          filteredTasks={filteredTasks}
        />
      </>
    </FilterContext.Provider>
  );
};
