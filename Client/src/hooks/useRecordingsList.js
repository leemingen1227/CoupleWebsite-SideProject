import { useState, useEffect } from "react";
import generateKey from "../helpers/generate-key";

export default function useRecordingsList(audio) {
  const [recordings, setRecordings] = useState([]);

  const deleteAudio = (audioKey, setRecordings) => {
    setRecordings((prevState) => prevState.filter((record) => record.key !== audioKey));
  };

  useEffect(() => {
    if (audio)
      setRecordings((prevState) => {
        return [...prevState, { key: generateKey(), audio }];
      });
  }, [audio]);

  return {
    recordings,
    deleteAudio: (audioKey) => deleteAudio(audioKey, setRecordings),
  };
}