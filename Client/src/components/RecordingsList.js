import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import useRecordingsList from "../hooks/useRecordingsList";
import "../css/recordingslist.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState } from 'react';
import { setAuthToken } from "../helpers/setAuthToken";


export default function RecordingsList({ audio }) {
  const { recordings, deleteAudio } = useRecordingsList(audio);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("")
  const [audioFile, setAudioFile] = useState("")

  // const handleSave = async (record) => {
  //   const reader = new FileReader();
  //   let blob = await fetch(record.audio).then(r => r.blob());
  //   reader.readAsDataURL(blob);
  //   reader.onload = () => {
  //     const base64AudioMessage = reader.result.split(',')[1];
  //     fetch('/message', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ message: base64AudioMessage })
  //     }).then(res => {
  //       if (res.status === 201) {
  //         res.json().then(body => {
  //           console.log(body);
  //           audioFile = body;
  //           window.location.replace('cards/'+ audioFile);
  //         })}
  //       else{
  //         console.log('Invalid status saving audio message: ' + res.status);
  //       }
        
  //     });
  //   };
  // }

  const handleSave = async (record) => {
    const reader = new FileReader();
    let blob = await fetch(record.audio).then(r => r.blob());
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const base64AudioMessage = reader.result.split(',')[1];
      fetch('/audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: base64AudioMessage })
      }).then(res => {
      if (res.status === 201) {
        res.json().then(body => {
          console.log(body);
          setAudioFile(body);
        })}
      else{
        console.log('Invalid status saving audio message: ' + res.status);
      }})
    };
    let token = localStorage.getItem('token');
      setAuthToken(token);

      await axios.post('messages', {
        title: title,
        desc: description,
        author: author,
        audio: audioFile 
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          const messageId = res.data._id;
          window.location.replace('cards/'+ messageId);
          }
        else{
          console.log('Invalid status saving audio message: ' + res.status);
        }
        
      });
  }

  return (
    <div className="recordings-container">
      {recordings.length > 0 ? (
        <>
          <h1>Your recordings</h1>
          <div className="recordings-list">
            <div className=" flex  justify-center  mb-4">
               <Form  className='flex flex-col w-40 md:w-60 gap-y-4' >
                  <Form.Group controlId="title" className='flex flex-col text-black text-center py-2'>
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="title" name='title' value={title} onChange={(title) => setTitle(title.target.value)}
                          className='outline-none border-b border-b-primary h-[40px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879] text-center'/>
                  </Form.Group>
                  <Form.Group  controlId="description" className='flex flex-col text-black text-center py-2'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control type='description' name='description' value={description} onChange={(description) => setDescription(description.target.value)}
                           className='outline-none border-b border-b-primary h-[40px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879] text-center'/>
                  </Form.Group >
                  <Form.Group  controlId="author" className='flex flex-col text-black text-center py-2'>
                      <Form.Label>Author</Form.Label>
                      <div className="flex flex-row justify-center gap-x-4" onChange={(author) => setAuthor(author.target.value)}>
                        <Form.Check
                          label="  He"
                          name="He"
                          type="radio"
                          value="him"
                          className=""
                        />
                        <Form.Check
                          label="  She"
                          name="She"
                          value="her"
                          type="radio"
                        />               
                      </div>
                      
                  </Form.Group >
                  
                  
              </Form>
            </div>
            {recordings.map((record) => (
              <div className="record" key={record.key}>
                <audio controls src={record.audio} />
                <button className=" ml-3 my-2 bg-slate-50 rounded-lg px-2  "  onClick={() => handleSave(record)}>Submit</button>
                <div className="delete-button-container">
                  <button
                    className="delete-button"
                    title="Delete this audio"
                    onClick={() => deleteAudio(record.key)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            ))}
            

          </div>
         
          
        </>
      ) : (
        <div className="no-records">
          <FontAwesomeIcon icon={faExclamationCircle} size="2x" color="#62625e" />
          <span>You don't have records</span>
        </div>
      )}
    </div>
  );
}