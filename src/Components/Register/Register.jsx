import React, { useState } from 'react';

import { createUserWithEmailAndPassword, getAuth,sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../../Firebase/firebase.config';
import { Link } from 'react-router-dom';


const auth=getAuth(app);
const Register = () => {
    const [email,setEmail] =useState('');
    const [error,setError]=useState('');
    const[success,setSuccess]=useState('');
    const handleSubmit=(event)=>{
        event.preventDefault();
        setSuccess('');
        setError('');
        const email=event.target.email.value;
        const password=event.target.password.value;
        const name=event.target.name.value;
     console.log(email,name);
     console.log(password);

     //validate the password(taken from stack overflow)

     if(!/(?=.*[A-Z])/.test(password)){
        setError("please add atleast add one uppercase");
        return;
        //samne ar agate dibona
     }
     else if(!/(?=.*[0-9].*[0-9])/.test(password)){
        setError("please add atleast add two digits");
     }
     else if(password.length<6){
        setError("please add atleast 6 characters");
     }

     //creating user in firebase

     createUserWithEmailAndPassword(auth,email,password)  
     .then(result=>{
       const loggedUser= result.user;
       console.log(loggedUser);
       setError('');
       event.target.reset();
       setSuccess("User has been created");
       sendVerificationEmail(result.user);
       updateUserData(result.user,name)
     })
     .catch(error=>{
        console.error(error);
        setError(error.message);
        setSuccess('');
     })
    }
    const handleEmailChange=(event)=>{
        //  console.log(event.target.value);
         setEmail(event.target.value);
    }

    const handlePasswordBlur=(event)=>{
        // console.log(event.target.value);
    }

    const sendVerificationEmail=(user)=>{
      sendEmailVerification(user)
      .then(result=>{
        console.log(result);
        alert("Please verify your email");
      })
    }

    const updateUserData=(user,name)=>{
      updateProfile(user,{
        displayName:name
      })
      .then(()=>{
        console.log('user name update');
      })
      .catch(error=>{
        setError(error.message);
      })
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>This is register</h2>
            <form onSubmit={handleSubmit}>
            <input className='w-50 mb-4 rounded' type="text" name="name" id="name" placeholder='Username' required/>
            <br />
                <input className='w-50 mb-4 rounded' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your email'required/>
                <br />
                
                <input className='w-50 mb-4 rounded' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your password' required/>
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            
            </form>
            <p>Already have an account? <Link to='/login'>Login</Link></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;