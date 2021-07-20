import React, { useRef, useState, useEffect } from "react";

const quickAndDirtyStyle = {
  width: "50%",
  height: "50%",
  // background: "#FF9900",
  // color: "#FFFFFF",
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
  position: "absolute",
  // width: "10%",
  // height: "10%",
};

const DraggableComponent = ({ children }) => {
  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef();

  // Monitor changes to position state and update DOM
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, [position]);

  // Update the current position if mouse is down
  const onMouseMove = (event) => {
    if (pressed) {
      setPosition({
        x: position.x + event.movementX,
        y: position.y + event.movementY,
      });
    }
  };

  return (
    <div
      ref={ref}
      style={quickAndDirtyStyle}
      onMouseMove={onMouseMove}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {children}
    </div>
  );
};

export default DraggableComponent;
