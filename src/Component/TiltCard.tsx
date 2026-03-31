import React, { useRef } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // degrees max tilt, default 12
}

/**
 * Wraps children in a div that 3D-tilts following the mouse cursor.
 * Add perspective on the parent container for best effect.
 */
export function TiltCard({ children, className = '', intensity = 12 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;   // -0.5 to +0.5
    const y = (e.clientY - top) / height - 0.5;   // -0.5 to +0.5
    el.style.transform = `
      perspective(600px)
      rotateY(${x * intensity * 2}deg)
      rotateX(${-y * intensity}deg)
      scale3d(1.025, 1.025, 1.025)
    `;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1)';
    el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
    // Remove explicit transition after it completes so motion is snappy again on next entry
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 450);
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
}
