// Exercice 1 - Chronomètre
// Concepts : useEffect, cleanup, useRef

import { useState, useEffect, useRef } from 'react';
import './Chronometre.css';

function Chronometre() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  }

  function handleStartStop() {
    setIsRunning(!isRunning);
  }

  function handleReset() {
    setIsRunning(false);
    setTime(0);
  }

  return (
    <div className="chronometre">
      <div className="chrono-display">{formatTime(time)}</div>
      <div className="chrono-controls">
        <button onClick={handleStartStop} className={isRunning ? 'btn-stop' : 'btn-start'}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleReset} className="btn-reset">Reset</button>
      </div>
    </div>
  );
}

export default Chronometre;
