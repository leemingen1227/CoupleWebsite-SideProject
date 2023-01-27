import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import "../css/post.css";
import { setAuthToken } from "../helpers/setAuthToken";



export default function Post({ post }) {
  const PF ="http://localhost:3000/public/images/";

  const [image, setImage] = useState("");
  
  useEffect(() => {
    const fetchImage= async (post) => {
      let token = localStorage.getItem('token');
      setAuthToken(token);
      // const res = await axios.get("/image/" + post.photo);

      await fetch("/image/" + post.photo, {
        method: 'GET'
      })
      .then(response => response.blob())
      .then( res => {
        console.log(res);
        var img = URL.createObjectURL(res);
        setImage(img);
        console.log("this is get message");
        console.log(img)
      })
      .catch( (err)=> {console.log(err)})

    };

    fetchImage(post);
  }, []);

  return (
    <div className="flex flex-col ">
      {post.photo && <img className="postImg" src={image} alt="" />}
      <div className="flex flex-col items-center gap-y-1">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/blog/${post._id}`} className="link">
          <span className="font-bold text-2xl ">{post.title}</span>
        </Link>
        <hr />
        <span className=" text-xs italic">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className=" text-center mt-5 truncate text-ellipsis text-[#455255] ">{post.desc}</p>
    </div>
  );
}