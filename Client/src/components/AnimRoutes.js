import React from 'react';
// import pages
import Home from '../pages/Home';
import About from '../pages/About';
import Portfolio from '../pages/Portfolio';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register'
import RouteGuard from './RouteGuard';
import Blog from '../pages/Blog';
import Write from '../pages/Write';
import Single from "../pages/Single";
import Settings from '../pages/Settings';
import { Context } from '../context/Context';
import { useContext } from 'react';
import MessageCards from '../pages/MessageCards';
import AudioRecord from './AudioRecord';
import Messages from '../pages/Messages'
// import routes route & useLocation hook
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const AnimRoutes = () => {
  const location = useLocation();
  const { user } = useContext(Context);
  return (
    <AnimatePresence initial={true} mode='wait'>
      <Routes key={location.pathname} location={location}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={user? <Blog/> : <Login />}/>
        <Route path='/write' element={user? <Write/> : <Login />}/>
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={user ? <Home /> : <Login />}/>
        <Route path='/register' element={user ? <Home /> : <Register />}/>
        <Route path="/blog/:postId" element={<Single />}/>       
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/cards/:cardId" element={<MessageCards/>}/>
        <Route path='/record' element={<AudioRecord/>}/>
        <Route path='/messages' element={<Messages/>}/>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimRoutes;
