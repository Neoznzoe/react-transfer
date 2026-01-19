// Exercice 8 - useRef pour manipulation DOM
// Concepts : useRef, accès au DOM, focus, scroll, mesures

import { useRef, useState, useEffect } from 'react';
import './FocusInput.css';

// Composant Auto-focus sur montage
function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="demo-box">
      <h3>Auto-focus au montage</h3>
      <input ref={inputRef} type="text" placeholder="Je suis focus automatiquement !" />
    </div>
  );
}

// Composant avec scroll programmatique
function ScrollDemo() {
  const topRef = useRef(null);
  const middleRef = useRef(null);
  const bottomRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="demo-box">
      <h3>Scroll programmatique</h3>
      <div className="scroll-buttons">
        <button onClick={() => scrollTo(topRef)}>⬆️ Haut</button>
        <button onClick={() => scrollTo(middleRef)}>⬌ Milieu</button>
        <button onClick={() => scrollTo(bottomRef)}>⬇️ Bas</button>
      </div>
      <div className="scroll-container">
        <div ref={topRef} className="scroll-item top">🔝 Section Haut</div>
        <div className="scroll-spacer" />
        <div ref={middleRef} className="scroll-item middle">📍 Section Milieu</div>
        <div className="scroll-spacer" />
        <div ref={bottomRef} className="scroll-item bottom">🔚 Section Bas</div>
      </div>
    </div>
  );
}

// Composant avec mesure d'élément
function MeasureDemo() {
  const boxRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [boxSize, setBoxSize] = useState(200);

  const measureBox = () => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setDimensions({ width: Math.round(rect.width), height: Math.round(rect.height) });
    }
  };

  useEffect(() => {
    measureBox();
  }, [boxSize]);

  return (
    <div className="demo-box">
      <h3>Mesure d'élément</h3>
      <div className="measure-controls">
        <button onClick={() => setBoxSize(s => Math.max(100, s - 50))}>➖ Réduire</button>
        <button onClick={() => setBoxSize(s => Math.min(400, s + 50))}>➕ Agrandir</button>
        <button onClick={measureBox}>📏 Mesurer</button>
      </div>
      <div
        ref={boxRef}
        className="measure-box"
        style={{ width: boxSize, height: boxSize / 2 }}
      >
        Redimensionne-moi !
      </div>
      <p className="dimensions">
        Dimensions: {dimensions.width}px × {dimensions.height}px
      </p>
    </div>
  );
}

// Composant Video Player avec contrôles
function VideoPlayerDemo() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="demo-box">
      <h3>Contrôle vidéo avec useRef</h3>
      <div className="video-container">
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
        <div className="video-controls">
          <button onClick={togglePlay} className="play-btn">
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="seek-bar"
          />
          <span className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

// Composant Canvas Drawing
function CanvasDemo() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#3b82f6');

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="demo-box">
      <h3>Canvas avec useRef</h3>
      <div className="canvas-controls">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button onClick={clearCanvas}>🗑️ Effacer</button>
      </div>
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        className="drawing-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}

// Composant principal
function FocusInput() {
  return (
    <div className="useref-demo">
      <h2>Démonstration useRef & DOM</h2>
      <AutoFocusInput />
      <ScrollDemo />
      <MeasureDemo />
      <VideoPlayerDemo />
      <CanvasDemo />
    </div>
  );
}

export default FocusInput;
