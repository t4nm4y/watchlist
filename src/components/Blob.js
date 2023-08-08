import React from 'react'
import './Blob.css'
import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const Blob = () => {
  const [mousePosition, setMousePosition] = useState({ x: 200, y: 500 });

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };
  
  const handleScroll = () => {
    setMousePosition((prevPosition) => ({
      x: prevPosition.x,
      y: mousePosition.y,
    }));
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    };
  }, []);

  const position = useSpring({
    left: `${mousePosition.x}px`,
    top: `${mousePosition.y+window.scrollY}px`,
    config: { duration: 300 },
  });
  
  return (
    <>
      <div className='blur-overlay'></div>
      <animated.div className='Blob' style={position}></animated.div>
    </>
  )
}

export default Blob