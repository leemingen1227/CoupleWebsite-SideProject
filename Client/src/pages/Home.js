import React, { useContext } from 'react';
import { Form, Button } from "react-bootstrap";

// import images
import coupleImg from '../img/home/couple.png';
import BD from '../img/home/BD.png';

// import link
import { Link } from 'react-router-dom';
// import motion
import { motion } from 'framer-motion';
// import transition
import { transition1 } from '../transitions';
// cursor context
import { CursorContext } from '../context/CursorContext';
import axios from "axios";
import { baseUrl } from '../baseUrl';


const Home = () => {
  const postDish = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    // axios.post(baseUrl + 'dishes', {
    //   name:'aaa',
    //   image: '/assets/images/uthappizza.png',
    //   category: 'mains',
    //   label:'Hot',
    //   price:'4.99',
    //   featured: true,
    //   description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'
    // })
    axios.get(baseUrl + 'users')
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {console.log(error);})
}
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition1}
      className='section'
    >
      <div className='container mx-auto h-full relative'>
        {/* text & img wrapper */}
        <div className='flex flex-col justify-center'>
          {/* text */}
          <motion.div
            initial={{ opacity: 0, y: '-50%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-50%' }}
            transition={transition1}
            className='w-full pt-36 pb-14 lg:pt-0 lg:pb-0 lg:w-auto z-10 lg:absolute flex flex-col justify-center items-center lg:items-start'
          >
            <h1 className='h1'>
              Picture <br /> your Life
            </h1>
            <p className='text-[26px] lg:text-[36px] font-primary mb-4 lg:mb-12'>
              For you and who you care about
            </p>
            <Button type='submit' variant='primary' onClick={(e) => postDish(e)}
                                 className='w-full my-5 py-2 bg-slate-600 shadow-lg shadow-slate-600/50 hover:shadow-slate-600/40 text-white font-semibold rounded-lg'>Register</Button>
          </motion.div>
          {/* image */}
          <div className='flex justify-end max-h-96 lg:max-h-max  '>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={transition1}
              className='relative lg:-right-60 overflow-hidden  '
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={transition1}
                className=''
                src={coupleImg}
                alt=''
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Home;
