import React from 'react'
import styles from './AddTask.module.css';
const AddTask = () => {
    return (
        <div className={styles.taskContainer}>
            {/* task form */}
            <form className={styles.taskForm} action="">
                <h1>Task Entry Form</h1>
                <hr />
                <div>
                   <label htmlFor="project" >Project</label>
                <select>
                  <option>
                    Important
                  </option>
                  <option>
                    Corporate
                  </option>
                   <option>
                    Corporate
                  </option>
                   <option>
                    Corporate
                  </option>
                </select>
                </div>
               <div>
                  <label htmlFor="task">Task</label>
                <input type="text" />
               </div>
                <div>
               <label htmlFor="taskDisc" >Task Discription</label>
                <textarea rows='10' type="text" />
                </div>
                <div>
                 <label htmlFor="dueDate" >Due Date</label>
                <input type="Date" />
                </div>
                <div>
                <label htmlFor="document" >Document</label>
                <input type="file" />
                </div>
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddTask