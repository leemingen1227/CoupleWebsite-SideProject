import React, { useState } from 'react';
import  { Navigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from '../baseUrl';

// import images
import loginImg from '../img/login/loginImg.jpg';
// import link
import { Link, redirect } from 'react-router-dom';
// import motion
import { motion } from 'framer-motion';
// import transition
import { transition1 } from '../transitions';
// cursor context
import { CursorContext } from '../context/CursorContext';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // make a popup alert showing the "submitted" text
        axios.post(baseUrl + 'users/signup', {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname
        })
        .then((result) => {
            setRegister(true);
            console.log(result);
        })
        .catch((error) => {console.log(error);})
    }

    if (register === true) {
        alert("Registered Successfully");
        return(
            <Navigate to='/'  />
        );
    }
    else {
        return (
            <motion.section
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={transition1}
            className='section'
            >
                <div className='container mx-auto h-full relative'>
                    <div className= 'flex flex-col lg:flex-row h-full items-center justify-center gap-x-24 text-center lg:text-left lg:pt-16'>
                        <div className='flex-1 max-h-96 lg:max-h-max order-2 lg:order-none overflow-hidden'>
                            <img src={loginImg} alt="" />
                        </div>
                        <motion.div
                        initial={{ opacity: 0, y: '-80%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-80%' }}
                        transition={transition1}
                        className='flex-1 pt-36 pb-6 lg:pt-0 lg:w-auto z-10 flex flex-col justify-center items-center lg:items-start'
                        >
                            <Form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col  gap-y-4' >
                                <Form.Group controlId="formBasicUsername" className='flex flex-col text-gray-400 py-2'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="username" name='username' value={username} onChange={(username) => setUsername(username.target.value)}
                                     className='outline-none border-b border-b-primary h-[40px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'/>
                                </Form.Group>
                                <Form.Group  controlId="formBasicPassword" className='flex flex-col text-gray-400 py-2'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' name='password' value={password} onChange={(password) => setPassword(password.target.value)}
                                     className='outline-none border-b border-b-primary h-[40px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'/>
                                </Form.Group >
                                <Form.Group  controlId="formBasicFirstname" className='flex flex-col text-gray-400 py-2'>
                                    <Form.Label>Firstname</Form.Label>
                                    <Form.Control type='firstname' name='firstname' value={firstname} onChange={(firstname) => setFirstname(firstname.target.value)} 
                                     className='outline-none border-b border-b-primary h-[40px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'/>
                                </Form.Group >
                                <Form.Group  controlId="formBasicLastname" className='flex flex-col text-gray-400 py-2'>
                                    <Form.Label>Lastname</Form.Label>
                                    <Form.Control type='lastname' name='lastname' value={lastname} onChange={(lastname) => setLastname(lastname.target.value)} 
                                     className='outline-none border-b border-b-primary h-[40px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'/>
                                </Form.Group >
                                
                                <Button type='submit' variant='primary' onClick={(e) => handleSubmit(e)}
                                 className='w-full my-5 py-2 bg-slate-600 shadow-lg shadow-slate-600/50 hover:shadow-slate-600/40 text-white font-semibold rounded-lg'>Register</Button>
                            </Form>
                        </motion.div>
                    </div>
                </div>
                
            </motion.section>
        
        );
    }        
    
};

export default Register;