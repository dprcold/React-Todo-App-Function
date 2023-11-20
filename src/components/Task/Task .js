import React, { useEffect, useState, useMemo } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

import './Task.css';
import worker_script from '../TaskTimer/WorkerTimer';
const formatNumber = (number) => {
  return number < 10 ? `0${number}` : number.toString();
};

export const Task = ({
  completed,
  createdDate,
  children,
  onDeleted,
  onEdited,
  id,
  onCheckboxChange,
  minutes,
  seconds,
}) => {
  const date = formatDistanceToNow(parseISO(createdDate), { locale: enUS });

  const [checked, setChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(children);
  const [workerMin, setWorkerMin] = useState(minutes);
  const [workerSec, setWorkerSec] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  //мемоизируем, так как будет двойной рендер при инициализации и неправильное поведение таймера
  const timerWorker = useMemo(() => new Worker(worker_script), []);
  useEffect(() => {
    timerWorker.onmessage = ({ data: { min, sec } }) => {
      setWorkerMin(min);
      setWorkerSec(sec);
    };
  }, [timerWorker]);

  const handleStartTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerWorker.postMessage({ turn: 'on', min: workerMin, sec: workerSec });
    }
  };

  const handlePauseTimer = () => {
    if (isRunning) {
      timerWorker.postMessage({ turn: 'off', min: workerMin, sec: workerSec });
      setIsRunning(false);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const deleteTask = (id) => {
    onDeleted(id);
    timerWorker.terminate();
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      onEdited(id, inputText);
      setIsEditing(false);
    } else if (event.key === 'Escape' || event.keyCode === 27) {
      setIsEditing(false);
    }
  };

  const taskTextClasses = ['description'];
  if (checked) {
    taskTextClasses.push('completed');
  }
  const handleClick = () => {
    setChecked(!checked);
  };

  return (
    <li className={`task ${checked ? 'completed' : ''}`} onClick={handleClick}>
      <label>
        {isEditing ? (
          <input
            type="text"
            className="edit"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyPress}
          />
        ) : (
          <>
            <span className={taskTextClasses.join(' ')}>{children}</span>
            <div className="time-task-wrapper">
              <span className="isTime">{`${formatNumber(workerMin)}:${formatNumber(workerSec)}`}</span>
              <button
                className="button-pause-timer"
                onClick={(event) => {
                  if (isRunning) {
                    handlePauseTimer();
                  }

                  event.stopPropagation();
                }}
              >
                ⏸️
              </button>
              <button
                className="button-start-timer"
                onClick={(event) => {
                  handleStartTimer();
                  event.stopPropagation();
                }}
              >
                ▶️
              </button>
            </div>
            <span className="created">created {date} ago</span>

            <input
              type="checkbox"
              className="toggle"
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                onCheckboxChange(id, !checked);
              }}
            />

            <button className="icon icon-edit" onClick={() => setIsEditing(true)}></button>
            <button className="icon icon-destroy" onClick={() => deleteTask(id)}></button>
          </>
        )}
      </label>
    </li>
  );
};
