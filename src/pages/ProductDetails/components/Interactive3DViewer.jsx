import React, { useState, useRef, useEffect } from 'react';
import { Rotate3D, Play, Pause, ZoomIn, ZoomOut, Sparkles, Move, Info } from 'lucide-react';

export default function Interactive3DViewer({ product }) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const startXRef = useRef(0);
  const currentAngleRef = useRef(0);
  const containerRef = useRef(null);

  // Auto spin effect
  useEffect(() => {
    let animId;
    if (isAutoSpin && !isDragging) {
      const step = () => {
        setRotationAngle((prev) => (prev + 0.4) % 360);
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isAutoSpin, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentAngleRef.current = rotationAngle;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    const newAngle = (currentAngleRef.current + deltaX * 0.8) % 360;
    setRotationAngle(newAngle < 0 ? newAngle + 360 : newAngle);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch gesture support for mobile and tablets
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      setIsDragging(true);
      startXRef.current = e.touches[0].clientX;
      currentAngleRef.current = rotationAngle;
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !e.touches || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    const newAngle = (currentAngleRef.current + deltaX * 0.8) % 360;
    setRotationAngle(newAngle < 0 ? newAngle + 360 : newAngle);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Determine active frame image or perspective angle based on rotation
  const imageCount = product.images?.length || 1;
  const normalizedIndex = Math.floor((rotationAngle / 360) * imageCount) % imageCount;
  const currentImage = product.images?.[normalizedIndex] || product.images?.[0];

  const hotspots = product.hotspots || [
    { id: 'h1', x: 45, y: 35, title: 'Italian Wool Twill', desc: '100% Super 120s virgin wool woven in Biella.' },
    { id: 'h2', x: 58, y: 55, title: 'Real Buffalo Horn Buttons', desc: 'Sustainably sourced, individually engraved and hand-sewn.' },
    { id: 'h3', x: 38, y: 75, title: 'Double-Stitched Blind Hem', desc: 'Prevents unraveling and creates clean horizontal silhouette.' }
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '3 / 4',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        backgroundColor: '#141416',
        color: '#FFFFFF',
        userSelect: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'pan-y'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* 3D Visualizer Canvas / Image with Perspective Transform */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <img
          src={currentImage}
          alt={`${product.name} 3D Angle`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${zoomLevel}) rotateY(${(rotationAngle % 20) - 10}deg)`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            filter: 'contrast(1.05)'
          }}
          draggable={false}
        />

        {/* Dynamic Studio Lighting Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${50 + Math.sin((rotationAngle * Math.PI) / 180) * 30}% 40%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.4) 100%)`,
            pointerEvents: 'none'
          }}
        />

        {/* 360 Degree Hotspots */}
        {hotspots.map((h) => (
          <div
            key={h.id}
            style={{
              position: 'absolute',
              left: `${h.x + Math.sin((rotationAngle * Math.PI) / 180) * 8}%`,
              top: `${h.y}%`,
              zIndex: 10
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(activeHotspot === h.id ? null : h.id);
              }}
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(197, 160, 89, 0.6)',
                border: '2px solid var(--accent-gold)'
              }}
              title={h.title}
            >
              <Info size={12} />
            </button>

            {activeHotspot === h.id && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%) translateY(8px)',
                  backgroundColor: 'rgba(12, 12, 14, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  width: '210px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  zIndex: 20
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-gold-light)', marginBottom: 4 }}>
                  {h.title}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#DFDFDF', lineHeight: 1.4 }}>
                  {h.desc}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Top Left Badge */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(8px)',
          padding: '6px 12px',
          borderRadius: 'var(--radius-pill)',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        <Rotate3D size={15} color="var(--accent-gold)" />
        <span>360° INTERACTIVE VIEW</span>
      </div>

      {/* Interaction Hint Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(6px)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-pill)',
          fontSize: '0.72rem',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          letterSpacing: '0.04em',
          pointerEvents: 'none',
          opacity: isDragging ? 0 : 0.85,
          transition: 'opacity 0.2s ease'
        }}
      >
        <Move size={12} /> Drag left / right to rotate model
      </div>

      {/* Bottom Floating Control Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 14,
          left: 14,
          right: 14,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(12px)',
          borderRadius: 'var(--radius-pill)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Play/Pause Auto-Spin */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsAutoSpin(!isAutoSpin);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.75rem',
            color: isAutoSpin ? 'var(--accent-gold-light)' : '#FFF',
            fontWeight: 600
          }}
        >
          {isAutoSpin ? <Pause size={14} /> : <Play size={14} />}
          {isAutoSpin ? 'Pause' : 'Auto Rotate'}
        </button>

        {/* Current Angle Meter */}
        <span style={{ fontSize: '0.72rem', color: '#A0A0A0', fontFamily: 'monospace' }}>
          {Math.round(rotationAngle)}°
        </span>

        {/* Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel((z) => Math.max(1, z - 0.25));
            }}
            style={{ color: '#FFF', padding: 2 }}
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel((z) => Math.min(2, z + 0.25));
            }}
            style={{ color: '#FFF', padding: 2 }}
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
