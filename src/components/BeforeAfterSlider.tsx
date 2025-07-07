import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER'
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(50);

  const calculatePercentage = (pageX: number) => {
    if (!sliderRef.current) return 50;
    
    const { left, width } = sliderRef.current.getBoundingClientRect();
    let percentage = ((pageX - left) / width) * 100;
    
    // Constrain percentage between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));
    
    return percentage;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const percentage = calculatePercentage(e.pageX);
        setPosition(percentage);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        const percentage = calculatePercentage(e.touches[0].pageX);
        setPosition(percentage);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  return (
    <div className="comparison-slider-container">
      {/* Headers above the slider */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ 
          padding: '5px 15px', 
          backgroundColor: '#074a5a', 
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '4px'
        }}>
          BEFORE
        </div>
        <div style={{ 
          padding: '5px 15px', 
          backgroundColor: '#074a5a', 
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '4px'
        }}>
          AFTER
        </div>
      </div>
      
      <div className="comparison-slider" ref={sliderRef}>
        {/* After image (always full width) - switched to be the background */}
        <div
          className="comparison-before"
          style={{ backgroundImage: `url(${afterImage})` }}
        />
        
        {/* Before image with overlay - switched to be on top */}
        <div 
          className="comparison-after-overlay"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            clipPath: `inset(0 ${100 - position}% 0 0)`
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${beforeImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>
        
        {/* Vertical slider handle */}
        {/* Vertical divider line */}
        <div
          style={{ 
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}%`,
            width: '5px',
            backgroundColor: '#074a5a',
            transform: 'translateX(-50%)',
            zIndex: 3
          }}
        />
        
        {/* Handle with circle */}
        <div
          className="comparison-handle"
          style={{ 
            left: `${position}%`,
            zIndex: 5
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="comparison-handle-circle">
            <FontAwesomeIcon icon={faArrowsAltH} className="comparison-handle-arrows" />
          </div>
        </div>
        
        {/* Labels - switched positions */}
        <div className="comparison-after-label">
          <span className="comparison-label">{beforeLabel}</span>
        </div>
        <div className="comparison-before-label">
          <span className="comparison-label">{afterLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;