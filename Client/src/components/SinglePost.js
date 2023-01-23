import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { baseUrl } from '../baseUrl';
import { setAuthToken } from "../helpers/setAuthToken";
import "../css/singlePost.css"
import {TbEdit, TbTrash} from 'react-icons/tb'

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF ="http://localhost:3000/public/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      console.log(path);
      let token = localStorage.getItem('token');
      setAuthToken(token);
      const res = await axios.get(path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      let token = localStorage.getItem('token');
      setAuthToken(token);
      await axios.delete(`${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      let token = localStorage.getItem('token');
      setAuthToken(token);
      await axios.put(`${post._id}`, {
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="flex flex-auto justify-center pt-36 lg:pt-48 pb-8">
      <div className="flex-col">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="font-bold text-center text-3xl mt-5 ">
            {title}
            
            <div className="flex float-right">
              <i
                className=""
                onClick={() => setUpdateMode(true)}
              ><TbEdit/></i>
              <i
                className="singlePostIcon far fa-trash-alt"
                onClick={handleDelete}
              ><TbTrash/></i>
            </div>
            
          </h1>
        )}
        <div className="flex mt-7 text-[#462d0c] italic ">
          <span className="">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="flex text-l mt-3">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}