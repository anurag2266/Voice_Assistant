import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import './App.css';  // Import the CSS file

const App = () => {
  const [record, setRecord] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    setAudioBlob(recordedBlob.blob);
  };

  const sendAudio = async () => {
    if (!audioBlob) {
      console.error('No audio recorded');
      return;
    }

    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      const result = await response.blob();

      const audioUrl = URL.createObjectURL(result);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error sending audio:', error);
    }
  };

  return (
    <div className="voice-assistant-container">
      <h1 className="title">Voice Assistant</h1>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        mimeType="audio/wav"
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <div className="buttons">
        <button onClick={startRecording} type="button">Start</button>
        <button onClick={stopRecording} type="button">Stop</button>
        <button onClick={sendAudio} type="button">Send</button>
      </div>
    </div>
  );
};

export default App;
