import React, { useContext, useState, useEffect } from 'react';
// import components
import Socials from './Socials';
import Logo from '../img/header/logo.png';
import JohnsonLee from '../img/header/JohnsonLee.svg';
import MobileNav from './MobileNav';
// import link
import { Link } from 'react-router-dom';
// import cursor context
import { CursorContext } from '../context/CursorContext';
import { Context } from '../context/Context';
import { ImUser } from "react-icons/im";

const Header = () => {
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
    <header className=' absolute w-full px-[30px] lg:px-[100px] z-30 h-[100px] lg:h-[140px] flex items-center '>
      <div className='flex flex-col lg:flex-row lg:items-center w-full justify-between   '>
        {/* logo */}
        <Link
          to={'/'}
          className='max-w-[90px]'
        >
          <img src={JohnsonLee} alt='' />
        </Link>
        {/* nav - initially hidden - show on desktop mode */}
        <nav
          className='hidden xl:flex gap-x-12 font-semibold'

        >
          <Link
            to={'/'}
            className='text-[#696c6d] hover:text-primary transition self-center '
          >
            Home
          </Link>
          {/* <Link
            to={'/about'}
            className='text-[#696c6d] hover:text-primary transition self-center'
          >
            About
          </Link> */}
          <Link
            to={'/blog'}
            className='text-[#696c6d] hover:text-primary transition self-center  '
          >
            Blog
          </Link>
          <Link
            to={'/write'}
            className='text-[#696c6d] hover:text-primary transition self-center'
          >
            Write
          </Link>
          <Link
            to={'/record'}
            className='text-[#696c6d] hover:text-primary transition self-center'
          >
            Record
          </Link>
          <Link
            to={'/messages'}
            className='text-[#696c6d] hover:text-primary transition self-center'
          >
            Messages
          </Link>
  
          {user ? (
            
            <div className='text-[#696c6d] hover:text-primary transition self-center'>
              <Link to="/settings">
                <img className=" w-10 h-10 rounded-full " src={image1} alt="" />
              </Link>

            </div>
          ) : (
            <Link
              to={'/login'}
              className='text-[#696c6d] hover:text-primary transition self-center'
            >
              Login
            </Link>
          )}
          
        </nav>
      </div>
      {/* socials */}
      <Socials />
      {/* mobile nav */}
      <MobileNav />
    </header>
  );
};

export default Header;
