import RecorderControls from "./RecordControl";
import RecordingsList from "./RecordingsList";
import useRecorder from "../hooks/useRecorder";
import useRecordingsList from "../hooks/useRecordingsList";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState } from 'react';




import "../css/audioRecorder.css";

export default function AudioRecord() {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  const { recordings, deleteAudio } = useRecordingsList(audio);

  return (
    <section className="voice-recorder">
      <h1 className="title">Voice Recorder</h1>
            <div className="recorder-container">
              <RecorderControls recorderState={recorderState} handlers={handlers} />
              <RecordingsList audio={audio} />
            </div>
    </section>
  );
}