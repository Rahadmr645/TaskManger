import React, { useContext, useEffect, useState } from 'react';
import styles from './DashBord.module.css';
import { Context } from '../context/StoreContext.jsx';
import AddTask from '../addTask/AddTask.jsx';

const DashBord = () => {
  const { user, setShowTaskForm, showTaskForm } = useContext(Context);

  // Stop scrolling when the task form is shown
  useEffect(() => {
    if (showTaskForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showTaskForm]); // Ensure useEffect re-runs when `showTaskForm` changes

  if (!user) {
    return <p>Loading...</p>; // Show a loading message if `user` is not yet set
  }

  return (
    <div className={styles.dashBordContainer}>
      <p>Welcome, {user.name}</p> {/* Display user name if user exists */}
      <button onClick={() => setShowTaskForm(true)}>Add Task</button>
      <button onClick={() => setShowTaskForm(false)}>x</button>
      {showTaskForm && <AddTask />}
    </div>
  );
}

export default DashBord;
