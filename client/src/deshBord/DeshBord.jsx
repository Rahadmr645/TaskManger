import react,{useContext} from 'react';
import styles from './DeshBord.module.css'
import {Context} from '../context/StoreContext.jsx'
import AddTask from '../addTask/AddTask.jsx';
const DeshBord = () => {
  
  const {user} = useContext(Context);
  return (
    <div>
    <p>Well Come Dear {user.name}</p>
    <AddTask/>
    </div>
    )
} 

export default DeshBord;