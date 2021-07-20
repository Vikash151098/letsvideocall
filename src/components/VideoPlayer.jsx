import React, { useContext } from "react";
import { SocketContext } from "../SocketContext";

const VideoPlayer = () => {
  const { localVideoRef, remoteVideoRef } = useContext(SocketContext);

  // const [pressed, setPressed] = useState(false);
  // const [position, setPosition] = useState({ x: 0, y: 0 });

  // Monitor changes to position state and update DOM
  // useEffect(() => {
  //   if (localVideoRef.current) {
  //     localVideoRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
  //   }
  // }, [position]);

  // Update the current position if mouse is down
  // const onMouseMove = (event) => {
  //   if (pressed) {
  //     setPosition({
  //       x: position.x + event.movementX,
  //       y: position.y + event.movementY,
  //     });
  //   }
  // };

  return (
    <>
      <video
        style={{
          position: "absolute",
          zIndex: 10,
          width: "20%",
          height: "20%",
        }}
        ref={localVideoRef}
        // onMouseMove={onMouseMove}
        // onDragStart={() => setPressed(true)}
        // onDragEnd={() => setPressed(false)}
        playsInline
        autoPlay
        muted
      ></video>
      <video
        style={{
          backgroundColor: "black",
          width: window.screen.width,
          height: window.screen.height * 0.6,
        }}
        ref={remoteVideoRef}
        playsInline
        autoPlay
      ></video>
    </>
  );
};

export default VideoPlayer;
