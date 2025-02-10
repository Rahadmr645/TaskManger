import React, { useContext, useEffect, useState } from 'react';
import styles from './AddTask.module.css';
import { Context } from '../context/StoreContext';
Context
const AddTask = () => {
    const { setShowTaskForm,taskData,notesHandleChange,handleNotes } = useContext(Context);

   
    return (
        <div className={styles.taskContainer}>
            <form className={styles.taskForm} onSubmit={handleNotes}>
                <button onClick={() => setShowTaskForm(false)}>x</button>
                <h1>Task Entry Form</h1>
                <hr />

                <div className={styles.formGrid}>
                    {/* Left Column */}
                    <div className={styles.column}>
                        <div className={styles.formGroup}>
                            <label htmlFor="project">Project</label>
                            <select name='project' value={taskData.project} onChange={notesHandleChange} >
                                <option>Important</option>
                                <option>Corporate</option>
                                <option>Corporate</option>
                                <option>Corporate</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="task">Task</label>
                            <input name='task' value={taskData.task} onChange={notesHandleChange} type="text" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="taskDisc">Task Description</label>
                            <textarea name='taskDisc' value={taskData.taskDisc} onChange={notesHandleChange} rows="6"></textarea>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className={styles.column}>
                        <div className={styles.formGroup}>
                            <label htmlFor="dueDate">Due Date</label>
                            <input name='dueDate' value={taskData.dueDate} onChange={notesHandleChange} type="date" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="document">Document</label>
                            <input name='document' value={taskData.document} onChange={notesHandleChange} type="file" />
                        </div>
                    </div>
                </div>

                <button className={styles.submitBtn} type="submit">Submit</button>

            </form>

        </div>
    );
}

export default AddTask;
