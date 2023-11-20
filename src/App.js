import React from 'react';
import './App.css';
import { NewTaskForm } from './components/NewTaskForm/NewTaskForm';
export const App = () => {
  return (
    <>
      <h1 className="head">Todos</h1>
      <div className="wrapper">
        <NewTaskForm />
      </div>
    </>
  );
};
