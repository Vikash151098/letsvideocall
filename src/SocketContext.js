import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

//Base URL- https://letsvideocall.onrender.com/
const produrl="https://letsvideocall.onrender.com/";
const devurl="http://localhost:5000"
const socket = io(produrl);

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((currentStream) => {
        setStream(currentStream);
        localVideoRef.current.srcObject = currentStream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      console.log("call received");
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStram) => {
      remoteVideoRef.current.srcObject = currentStram;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
      console.log("seding call...");
    });

    peer.on("stream", (currentStram) => {
      remoteVideoRef.current.srcObject = currentStram;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        callEnded,
        name,
        setName,
        answerCall,
        callUser,
        leaveCall,
        localVideoRef,
        remoteVideoRef,
        stream,
        me,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, ContextProvider };
