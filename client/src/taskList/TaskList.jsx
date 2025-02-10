import React, { useContext, useEffect } from 'react';
import { Context } from '../context/StoreContext';
import styles from './TaskList.module.css';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const TaskList = () => {
    const { handleDelete, fetchAllNotes, notes, handleEdit } = useContext(Context); // 🔹 UPDATED: Added `handleEdit`

    useEffect(() => {
        fetchAllNotes(); // 🔹 UPDATED: Directly fetching without setting state manually
    }, []);

    return (
        <div className={styles.container}>
            <h1>Task List</h1>
            <div className={styles.listContainer}>
                {Array.isArray(notes) && notes.length > 0 ? (
                    notes.map((note) => (
                        <div className={styles.taskItem} key={note._id}>
                         <h1>{note.project}</h1>
                            <h3>{note.task}</h3>
                            <p>{note.taskDisc}</p>
                            <p>Due Date: {new Date(note.dueDate).toLocaleDateString()}</p>
                            <div className={styles.btnSection}>
                                <button onClick={() => handleDelete(note._id)}>
                                    <MdOutlineDeleteOutline className={styles.deletIcon} />
                                </button>
                                <button onClick={() => handleEdit(note)}> {/* 🔹 UPDATED: Calls `handleEdit()` */}
                                    <FaRegEdit className={styles.editIcon} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No notes available</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;
