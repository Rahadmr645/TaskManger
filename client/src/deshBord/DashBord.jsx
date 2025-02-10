import React, { useContext, useEffect, useState } from 'react';
import styles from './DashBord.module.css';
import { Context } from '../context/StoreContext.jsx';
import AddTask from '../addTask/AddTask.jsx';
import TaskList from '../taskList/TaskList.jsx';

const DashBord = () => {
  const {handleLogout, user, setShowTaskForm, showTaskForm } = useContext(Context);

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
      <div className={styles.btnSection}>
        <button className={styles.btnAdd} onClick={() => setShowTaskForm(true)}>Add Task</button>
        <button onClick={() => handleLogout()} className={styles.btnLog}  >LogOut</button>
      </div>
      <TaskList />
      {showTaskForm && <AddTask />}
    </div>
  );
}

export default DashBord;
