import "../css/settings.css";
import { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import {TbUpload} from 'react-icons/tb'
import { baseUrl } from '../baseUrl';
import { setAuthToken } from '../helpers/setAuthToken'
import { Link } from 'react-router-dom';

export default function Settings() {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const [image1, setImage1] = useState([]);
  const [image2, setImage2] = useState([]);

  const { user, dispatch } = useContext(Context);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      username,
      password
    };
    //Upload first profile picture
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("image", data);
      } catch (err) {}
    }
    //Upload second profile picture
    if (file2) {
      const data = new FormData();
      const filename2 = Date.now() + file2.name;
      data.append("name", filename2);
      data.append("file", file2);
      updatedUser.profilePic2 = filename2;
      try {
        await axios.post("image", data);
      } catch (err) {}
    }
    //Upload user data
    try {
      console.log(user.id);
      const res = await axios.put("/users/" + user.id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleLogout = () => {
    console.log("log out");
    dispatch({type:"LOGOUT"});
    setAuthToken();
    window.location.replace("/");
  };

  

  return (
    <div className="container mx-auto">
      <div className="flex flex-auto flex-col justify-center pt-36 lg:pt-48 pb-8">
        <div className="flex justify-between  ">
          <span className="font-bold text-2xl text-[#544444]">Update Your Account</span>
          <Link onClick={handleLogout}
              to = {'/'}
              className='text-[#696c6d] hover:text-primary transition'
            >
              Logout
          </Link>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className=" flex flex-row gap-5">
            <div className="settingsPP">
              <img
                src={file ? URL.createObjectURL(file) : image1}
                alt=""
              />
              <label htmlFor="fileInput">
                <i className=" settingsPPIcon">
                <TbUpload/>
                </i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className="settingsPP">
              <img
                src={file2 ? URL.createObjectURL(file2) : image2}
                alt=""
              />
              <label htmlFor="file2Input">
                <i className=" settingsPPIcon">
                <TbUpload/>
                </i>
              </label>
              <input
                type="file"
                id="file2Input"
                style={{ display: "none" }}
                onChange={(e) => setFile2(e.target.files[0])}
              />
            </div>
          </div>
          

          <label>Username</label>
          <input
            type="text"
            placeholder={user?.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
    </div>
  );
}