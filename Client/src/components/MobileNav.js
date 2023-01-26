import React, { useContext, useState, useEffect } from 'react';
// import icons
import { IoMdClose } from 'react-icons/io';
import { CgMenuRight } from 'react-icons/cg';
// import link
import { Link } from 'react-router-dom';
// import motion
import { motion } from 'framer-motion';
import { Context } from '../context/Context';


// menu variants
const menuVariants = {
  hidden: {
    x: '100%',
  },
  show: {
    x: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.9],
    },
  },
};

const MobileNav = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const { user, dispatch } = useContext(Context);
  const [image1, setImage1] = useState([]);

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
    if (user){
      getImage1(user?.profilePic);
    }
    
  }, [user]);

  return (
    <nav className='text-primary xl:hidden'>
      {/* nav open button */}
      <div
        onClick={() => setOpenMenu(true)}
        className='text-3xl cursor-pointer'
      >
        <CgMenuRight />
      </div>
      {/* menu */}
      <motion.div
        variants={menuVariants}
        initial='hidden'
        animate={openMenu ? 'show' : ''}
        className='bg-white shadow-2xl w-full absolute top-0 right-0 max-w-xs h-screen z-20'
      >
        {/* icon */}
        <div
          onClick={() => setOpenMenu(false)}
          className='text-4xl absolute z-30 left-4 top-14 text-primary cursor-pointer'
        >
          <IoMdClose />
        </div>
        {/* menu list */}
        <ul className='h-full flex flex-col justify-center items-center gap-y-8 text-primary font-primary  font-bold text-3xl'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/blog'>Blog</Link>
          </li>
          <li>
            <Link to='/write'>Write</Link>
          </li>
          <li>
            <Link to='/record'>Record</Link>
          </li>
          <li>
            <Link to='/messages'>Messages</Link>
          </li>
          {user ? (
            <li>
              <div className='text-[#696c6d] hover:text-primary transition self-center'>
                <Link to="/settings">
                  <img className=" w-10 h-10 rounded-full " src={image1} alt="" />
                </Link>
              </div>
            </li>
            
          ) : (
            <li>
              <Link
                to={'/login'}>
                Login
              </Link>
            </li>
            
          )}
        </ul>
      </motion.div>
    </nav>
  );
};

export default MobileNav;
