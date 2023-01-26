import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { baseUrl } from '../baseUrl';
// import motion
import { motion } from 'framer-motion';
// import transition
import { transition1 } from '../transitions';
import { setAuthToken } from "../helpers/setAuthToken";
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

const Messages = () => {
    const [messages, setMessages] = useState([]);

    const { user, dispatch } = useContext(Context);

    const [image1, setImage1] = useState([]);
    const [image2, setImage2] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
          let token = localStorage.getItem('token');
          setAuthToken(token);
          const res = await axios.get("messages");
          setMessages(res.data);
          console.log(res.data );
          console.log("this is fetch message");

        };
        fetchMessages();
      }, []);

    useEffect(() => {
    const getImage1= async (fileName) => {

        await fetch("/image/" + fileName, {
        method: 'GET'
        })
        .then(response => response.blob())
        .then( res => {
        console.log(res);
        var img = URL.createObjectURL(res);
        setImage1(img);
        console.log("get profile picture 1");
        console.log(img)
    })};
    const getImage2= async (fileName) => {

        await fetch("/image/" + fileName, {
        method: 'GET'
        })
        .then(response => response.blob())
        .then( res => {
        console.log(res);
        var img = URL.createObjectURL(res);
        setImage2(img);
        console.log("get profile picture 2");
        console.log(img)
    })};
    getImage1(user.profilePic);
    getImage2(user.profilePic2);

    
    }, [user]);

      return (
  
          <div className='flex flex-auto justify-center pt-36 lg:pt-48 pb-8"  '>
            <div className="flex flex-col gap-7 mb-10">    
              {messages.map((message) => {
                console.log(message);
                console.log("XXXXX");
                return(
                    <div className="flex flex-row">
                        {message.author === 'her' ? (
                            <div className="flex self-center mx-5">
                                <img className=" w-12 h-12 rounded-full " src={image1} alt="" />
                            </div>
                        ):(
                            <div className="flex self-center mx-5">
                                <img className=" w-12 h-12 rounded-full " src={image2} alt="" />
                            </div>
                        )}
                        
                        <div className="flex flex-col">
                            <div className=" text-3xl  "> 
                                <Link to={`/cards/${message._id}`}>
                                    {message.title}
                                </Link>
                            </div>
                            <div className="text-xl"> 
                                {message.desc}
                            </div>
                            <div className="italic">
                                {new Date(message.createdAt).toDateString()}
                            </div>
                        </div>
                    </div>

                    
                )
                
              })
              }              
            </div>
          </div>          
      );
}

export default Messages;