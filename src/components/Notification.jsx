import React, { useContext } from "react";
import { SocketContext } from "../SocketContext";
const Notification = () => {
  const { call, callAccepted, answerCall } = useContext(SocketContext);
  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div>
          <h1>{call.name} is calling</h1>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => answerCall()}
          >
            Answer
          </button>
        </div>
      )}
    </>
  );
};

export default Notification;
