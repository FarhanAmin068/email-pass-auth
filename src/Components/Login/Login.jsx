import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../Firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth=getAuth(app);
const Login = () => {
    const [error,setError]=useState('');
    const[success,setSuccess]=useState('');
    const emailRef= useRef();
    const handleLogin= event=>{
        event.preventDefault();//for stopping reloading
        const form=event.target;
        const email =form.email.value;
        const password=form.password.value;
        console.log(email,password);
         
        setError('');//reseting the message
        setSuccess('');
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError("please atleast add two uppercase");
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
           const loggedUser = result.user;
           setSuccess("Successfully logged in");
           setError('');
        })
        .catch(error=>{
            setError(error.message);
        })

       
    }
    const handleResetPassword = event =>{
      const email=emailRef.current.value;
      if(!email){
        alert("please provide an email to reset the password");
        return;
      }
      sendPasswordResetEmail(auth,email)
      .then(()=>{
        alert("Please check your email");
      })
      .catch(()=>{
        console.log(error);
        setError(error.message);
      })
   }
    return (
       <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" name='email' ref={emailRef} className="form-control" id="email" placeholder="name@example.com" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" name='password' className="form-control" id="password" placeholder="Password" required />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="mt-3">
            <p>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></p>
            <p className="text-center">
              Don't have an account? <Link to='/register'>Register</Link>
            </p>
          </div>
          <p >{error}</p>
          <p>{success}</p>
        </div>
      </div>
    </div>
    );
};

export default Login;