import React, { useState } from 'react'
import styles from './login.module.css';
const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [showlogin, setShowlogin] = useState(true);
  
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
  });

  const handleChange = (e) => {
    const {name,value,type} = e.target;

    setFormData({
     ...formData,
    })

  }

  const hadnleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };


  return (
    <div className={styles.logincontainer}>
      <form onSubmit={hadnleSubmit} className={styles.loginform}>
        <div className={styles.logintitle}>
          <h1>{currentState}</h1>
          <img onClick={() => setShowlogin(false)} src="/assets/cross_icon.png"  alt="" />
        </div>
        <div className={styles.logininput}>
          {
            currentState === 'Sign Up' ?
              <input name='name' onChange={handleChange} value={formData.email}   type="text" placeholder='Enter your name' />
              : <></>
          }
          <input name='email' onChange={handleChange} value={formData.email} type="email"placeholder='Enter your email' />
          <input onChange={handleChange} value={formData.password}  name='password'  type="password" placeholder='Enter password' />
        </div>
        <div className={styles.btnstate}>
          <button type='submit' >{currentState}</button>
        </div>

        <div className={styles.logininfo}>
          <div className={styles.check}>
            <label htmlFor='chackbox'>Agree with us </label>
            <input id='chackbox' type="checkbox" />
          </div>
          <div className={styles.info}>
            {currentState === 'Sign Up' ?
              <p>Alrady have a account <span onClick={() => setCurrentState('Login')} >click here</span></p>
              : <p>Don't have a account <span onClick={() => setCurrentState('Sign Up')} >click here</span></p>
            }
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login