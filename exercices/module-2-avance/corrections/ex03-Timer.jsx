// Exercice 3 - Timer avec setInterval
// Concepts : useEffect cleanup, useRef, setInterval

import { useState, useEffect, useRef } from 'react';
import './Timer.css';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="timer">
      <div className="timer-display">{display}</div>
      <div className="timer-controls">
        <button onClick={() => setIsRunning(prev => !prev)} className="control-btn">
          {isRunning ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button onClick={() => { setIsRunning(false); setSeconds(0); }} className="control-btn reset">
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
