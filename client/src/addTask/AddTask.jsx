import React from 'react'
import styles from './AddTask.module.css';
const AddTask = () => {
    return (
        <div className={styles.taskContainer}>
            {/* task form */}
            <form className={styles.taskForm} action="">
                <h1>Task Entry Form</h1>
                <hr />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
            </form>
        </div>
    )
}

export default AddTask