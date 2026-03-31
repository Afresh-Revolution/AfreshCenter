import { useEffect, useState } from 'react';

/**
 * Types out `text` character-by-character.
 * @param text     Full string to type
 * @param speed    ms per character (default 40)
 * @param delay    ms before typing starts (default 300)
 */
export function useTypewriter(text: string, speed = 40, delay = 300) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const start = window.setTimeout(() => {
      const id = window.setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(id);
          setDone(true);
        }
      }, speed);
      return () => window.clearInterval(id);
    }, delay);
    return () => window.clearTimeout(start);
  }, [text, speed, delay]);

  return { displayed, done };
}
