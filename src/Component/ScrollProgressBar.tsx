import { useEffect, useState } from 'react';

/**
 * Thin orange progress bar fixed at the very top of the page.
 * Tracks how far the user has scrolled down the document.
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #f68014, #ffb347)',
        zIndex: 9999,
        transition: 'width 0.1s linear',
        borderRadius: '0 2px 2px 0',
        boxShadow: '0 0 8px rgba(246,128,20,0.6)',
      }}
    />
  );
}
