import React, { useEffect, useRef } from 'react';

const CircleCursor: React.FC = () => {
  const circleRef = useRef<HTMLDivElement>(null);

  // Create objects to track mouse position and custom cursor position
  const mouse = useRef({ x: 0, y: 0 }); // Track current mouse position
  const previousMouse = useRef({ x: 0, y: 0 }); // Store the previous mouse position
  const circle = useRef({ x: 0, y: 0 }); // Track the circle position

  // Initialize variables to track scaling and rotation
  let currentScale = 0; // Track current scale value
  let currentAngle = 0; // Track current angle value

  useEffect(() => {
    // Update mouse position on the 'mousemove' event
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
  const speed = 0.17;

  // Animation loop
  const tick = () => {
    // MOVE
    // Calculate circle movement based on mouse position and smoothing
    circle.current.x += (mouse.current.x - circle.current.x) * speed;
    circle.current.y += (mouse.current.y - circle.current.y) * speed;
    // Create a transformation string for cursor translation
    const translateTransform = `translate(${circle.current.x}px, ${circle.current.y}px)`;

    // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
    if (circleRef.current) {
      circleRef.current.style.transform = `${translateTransform}`;
    }

    // Request the next frame to continue the animation
    window.requestAnimationFrame(tick);
  };

  // Start the animation loop
  useEffect(() => {
    tick();
  }, []);

  // Styles for the circle cursor
  const circleStyles: React.CSSProperties = {
    position: 'fixed',
    height: '40px',
    width: '40px',
    border: '1px solid white',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 1000,
  };

  return <div ref={circleRef} style={circleStyles} />;
};

export default CircleCursor;