import React, { useState, useEffect } from 'react';
// logo
import LogoImg from '../img/card/logo.svg';
// nike img
import NikeImg from '../img/card/nike.png';
import man from '../img/card/man.png';
import woman from '../img/card/woman.png';
import JohnsonLee from '../img/header/JohnsonLee.svg';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken";



// import framer hooks
import { useMotionValue, useTransform, motion } from 'framer-motion';

const Card = ({audioFile}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const colors = [
    { value: '#b6a179' },
    { value: '#272425' },
    { value: '#f2c758' },
    { value: '#ffffff' },
  ];

  // /Users/leemingen/personal/CoupleServer/public/messages/099d4c94-48ed-4560-ae20-dc969e66ecdd

  const PF ="http://localhost:3000/public/messages/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [audioName, setAudioName] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [audio, setAudio] = useState({});

  useEffect(() => {
    const getMessage = async () => {
      let token = localStorage.getItem('token');
      setAuthToken(token);
      const res = await axios.get('/messages/' + path);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setAudioName(res.data.audio);
      setAuthor(res.data.author);
      console.log(res.data);
    };
    getMessage();
  }, [path]);

  // useEffect(() => {
  //   const getAudio= async (fileName) => {
  //     let token = localStorage.getItem('token');
  //     setAuthToken(token);

  //     await fetch("/audio/" + fileName, {
  //       method: 'GET'
  //     })
  //     .then(response => response.blob())
  //     .then( res => {
  //       console.log(res);
  //       const aud = URL.createObjectURL(res);
  //       // setAudio(aud);
  //       console.log("this is get message");
  //       // console.log(aud)
  //     })
  //   };

  //   getAudio(audioName);
    
  // }, [audioName]);
 

  return (
    // card wrapper
    <div style={{ perspective: 2000 }}>
      {/* card */}
      <motion.div
        style={{ x, y, rotateX, rotateY, z: 100 }}
        drag
        dragElastic={0.18}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileTap={{ cursor: 'grabbing' }}
        className='w-[426px] min-h-[600px] bg-[#e4dfdc] rounded-[30px] border-[4px] border-white px-[40px] py-[24px]  relative'
      >
        {/* card logo */}
        <div className='mb-6 w-14'>
          <img src={JohnsonLee} alt='' />
        </div>
        {/* card title */}
        <h1 className='text-5xl mb-6 font-extrabold'>{title}</h1>
        {/* card subtitle */}
        <p className='max-w-[300px] text-[#000000] mb-6'>
          {desc}
        </p>
        <audio controls  src={PF + audioName} />
        {/* btn & price wrapper */}
        <div className='flex items-center gap-x-[20px] mb-12'>
          <button className='bg-[#2d2b2c] text-white text-base font-medium py-[16px] px-[40px] rounded-lg mt-8'>
            {`From ${author}`}
          </button>
          <div className='text-[24px] font-bold text-[#000000]'></div>
        </div>
        {/* colors */}
        <ul className='flex gap-x-[10px]'>
          {colors.map((color, index) => {
            return (
              <li
                key={index}
                style={{ backgroundColor: color.value }}
                className='w-8 h-8 rounded-full cursor-pointer'
              ></li>
            );
          })}
        </ul>
        {/* card image */}
        
          {author === 'him' ?(
            <motion.div
            style={{ x, y, rotateX, rotateY, z: 100000 }}
            className='absolute -bottom-12 -right-40 w-[360px]'
            >
              <img src={man} alt='' draggable='false' />
            </motion.div>
          ):(
            <motion.div
            style={{ x, y, rotateX, rotateY, z: 100000 }}
            className='absolute -bottom-12 -right-5 w-[160px]'
            >
              <img src={woman} alt='' draggable='false' />
            </motion.div>
          )}
          
        
      </motion.div>
    </div>
  );
};

export default Card;