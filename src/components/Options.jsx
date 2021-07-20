import { useContext, useRef } from "react";
import { SocketContext } from "../SocketContext";
import "./Options.module.css";

const Options = ({ children }) => {
  const { callAccepted, callEnded, leaveCall, callUser, me } =
    useContext(SocketContext);
  const inputRef = useRef();
  return (
    <div className="row">
      <div className="col">
        <h3>Your Id : </h3>
        <h3>{me}</h3>
      </div>
      <div className="col">
        <input ref={inputRef} />
        <br />
        {callAccepted && !callEnded ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => leaveCall()}
          >
            Hang Up
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => callUser(inputRef.current.value)}
          >
            Make Call
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Options;
