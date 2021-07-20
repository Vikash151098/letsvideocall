import React from "react";
import "./App.css";
import Options from "./components/Options";
import VideoPlayer from "./components/VideoPlayer";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div className="row">
        <div className="col">
          <h1>Video Chat App</h1>
        </div>
      </div>
      <div
        className="row"
        style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
      >
        <VideoPlayer />
      </div>
      <div className="row">
        <div
          className="col"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Options>
            <Notification />
          </Options>
        </div>
      </div>
    </div>
  );
};

export default App;
