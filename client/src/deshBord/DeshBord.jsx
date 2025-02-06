import react,{useContext} from 'react';
import styles from './DeshBord.module.css'
import {Context} from '../context/StoreContext.jsx'
const DeshBord = () => {
  
  const {value} = useContext(Context);
  return (
    <div>
      This is Desh DeshBord
      <p>{value}</p>
    </div>
    )
} 

export default DeshBord;