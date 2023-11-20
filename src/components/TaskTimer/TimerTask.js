import React, { useEffect, useState } from 'react';

import './TimerTask.css';

export const TimerTask = ({ onTimeChanhe }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    onTimeChanhe({ minutes: minutes, seconds: seconds });
  }, [minutes, seconds]);
  const handleMinutesChange = (event) => {
    let minutes = parseInt(event.target.value, 10);
    if (minutes < 0 || isNaN(minutes)) {
      minutes = 0;
    } else if (minutes > 9999) {
      minutes = 9999;
    }
    setMinutes(minutes);
  };
  const handleSecondsChange = (event) => {
    let seconds = parseInt(event.target.value, 10);
    if (seconds <= 0 || isNaN(seconds)) {
      seconds = 0;
    } else if (seconds > 59) {
      seconds = 59;
    }
    setSeconds(seconds);
  };
  return (
    <div className="timer-wrapper">
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus=""
        type="number"
        max={9999}
        onChange={handleMinutesChange}
      />

      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus=""
        type="number"
        onChange={handleSecondsChange}
      />
    </div>
  );
};
