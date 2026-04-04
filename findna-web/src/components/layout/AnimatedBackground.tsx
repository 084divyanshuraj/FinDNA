"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  const [elements, setElements] = useState<Array<{icon: string, fontSize: string, left: string, top: string, duration: number, delay: number}>>([]);
  
  const floatingIcons = ['₹', '$', '€', '🧬', '📈', '📊', '💰', '💡'];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setElements([...Array(45)].map(() => ({
      icon: floatingIcons[Math.floor(Math.random() * floatingIcons.length)],
      fontSize: `${Math.random() * 30 + 15}px`,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 20
    })));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-brand-dark">
      {/* Dynamic gradient orb 1 */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-purple/40 blur-[100px]"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 50, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      {/* Dynamic gradient orb 2 */}
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-teal/40 blur-[120px]"
        animate={{ 
          x: [0, -70, 0],
          y: [0, -50, 0],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2 
        }}
      />



      {/* Floating Elements - Background elements */}
      {elements.map((el, i) => (
        <motion.div
          key={`el-${i}`}
          className="absolute text-brand-teal/50 font-bold font-mono select-none drop-shadow-[0_0_12px_rgba(76,201,240,0.8)]"
          style={{
            fontSize: el.fontSize,
            left: el.left,
            top: el.top,
          }}
          animate={{
            y: ['0vh', '-100vh'],
            rotate: [0, 360],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "linear",
            delay: el.delay,
          }}
        >
          {el.icon}
        </motion.div>
      ))}
    </div>
  );
}
