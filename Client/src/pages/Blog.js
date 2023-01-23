import { useEffect, useState } from "react";
import Header from "../components/Header";
import Posts from '../components/Posts';
import axios from "axios";
import { useLocation } from "react-router";
import { baseUrl } from '../baseUrl';
// import motion
import { motion } from 'framer-motion';
// import transition
import { transition1 } from '../transitions';
import { setAuthToken } from "../helpers/setAuthToken";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  
  useEffect(() => {
    const fetchPosts = async () => {
      let token = localStorage.getItem('token');
      setAuthToken(token);
      const res = await axios.get("blog" );
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  
 
  return (
    <motion.section
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={transition1}
      className=''
    >
      <div className='container mx-auto  '>
        <div className="flex flex-auto justify-center pt-36 lg:pt-48 pb-8">
          <Posts posts={posts} />
        </div>
      </div>
      
    
    </motion.section>
      
  );
}

export default Blog;