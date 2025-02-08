import react, { useContext, useEffect, useState } from 'react';
import styles from './DashBord.module.css'
import { Context } from '../context/StoreContext.jsx'
import AddTask from '../addTask/AddTask.jsx';
const DashBord = () => {

  const { user, setShowTaskForm, showTaskForm } = useContext(Context);

  // stop scrolling
  useEffect(() => {
    if (showTaskForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  })

  return (
    <div className={styles.dashBordContainer}>
      <p>Well Come Dear {user.name}</p>
      <button onClick={() => setShowTaskForm(true)}>Add Task</button>
      <button onClick={() => setShowTaskForm(false)} >x</button>
      {showTaskForm && <AddTask />}
    </div>
  )
}

export default DashBord;