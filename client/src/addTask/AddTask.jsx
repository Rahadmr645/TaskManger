import React, { useContext, useEffect, useState } from 'react';
import styles from './AddTask.module.css';
import { Context } from '../context/StoreContext';
Context
const AddTask = () => {
    const { setShowTaskForm } = useContext(Context);

    //state to store the input values from the form 
    const [taskData, setTaskData] = useState({
        project: 'Important',
        task: '',
        taskDisc: '',
        dueDate: '',
        document: null,
    });


    // state to store time remaining thime for the countdowntime
    const [timeLeft, setTimeLeft] = useState(null);

    // function to hanle changes in text inputs and select fields
    const handleChange = (e) => {
        const { name, value } = e.target; //get the name and value the input
        setTaskData((prev) => ({ ...prev, [name]: value }))
    };

    // function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        //Ensure the required fields are filled
        if (!taskData.task || !taskData.dueDate) {
            alert("Task name and due date are required");
            return;
        }

        // calculatge the remaining time untill the due date
        const dueTime = new Date(taskData.dueDate).getTime(); // convert due date to timestamp
        const currentTime = new Date().getTime();
        setTimeLeft(Math.max(dueTime - currentTime, 0));

        console.log("Task Added:", taskData);
        setShowTaskForm(false);

    };

    // Effect to update the coundown timere every second
    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) return; //stop if no countdown

        // start an interval that decreases the time left every second 
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1000) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1000;

            });
        }, 1000);

        // cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [timeLeft]);



    // Function to format the remaining time into a readabel formate 
    const formateTimeLeft = () => {
        if (timeLeft === null) return '';
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(timeLeft % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        const minutes = Math.floor(timeLeft % (1000 * 60 * 60) / (1000 * 60));
        const second = Math.floor(timeLeft % (1000 * 60) / (1000));
        return `${days}d  ${hours}h ${minutes}m ${second}s `
    };


    return (
        <div className={styles.taskContainer}>
            <form className={styles.taskForm} onSubmit={handleSubmit}>
                <button onClick={() => setShowTaskForm(false)}>x</button>
                <h1>Task Entry Form</h1>
                <hr />

                <div className={styles.formGrid}>
                    {/* Left Column */}
                    <div className={styles.column}>
                        <div className={styles.formGroup}>
                            <label htmlFor="project">Project</label>
                            <select name='project' value={taskData.project} onChange={handleChange} >
                                <option>Important</option>
                                <option>Corporate</option>
                                <option>Corporate</option>
                                <option>Corporate</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="task">Task</label>
                            <input name='task' value={taskData.task} onChange={handleChange} type="text" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="taskDisc">Task Description</label>
                            <textarea name='taskDisc' value={taskData.taskDisc} onChange={handleChange} rows="6"></textarea>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className={styles.column}>
                        <div className={styles.formGroup}>
                            <label htmlFor="dueDate">Due Date</label>
                            <input name='dueDate' value={taskData.dueDate} onChange={handleChange} type="date" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="document">Document</label>
                            <input name='document' value={taskData.document} onChange={handleChange} type="file" />
                        </div>
                    </div>
                </div>

                <button className={styles.submitBtn} type="submit">Submit</button>

            </form>

        </div>
    );
}

export default AddTask;
