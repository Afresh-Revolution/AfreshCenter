import { useEffect, useState } from 'react';

/**
 * Types out `text` character-by-character.
 * @param text     Full string to type
 * @param speed    ms per character (default 40)
 * @param delay    ms before typing starts (default 300)
 */
export function useTypewriter(text: string, speed = 40, delay = 300) {
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    let intervalId: number | undefined;
    let i = 0;
    const start = window.setTimeout(() => {
      setTypedLength(0);
      intervalId = window.setInterval(() => {
        i += 1;
        setTypedLength(i);
        if (i >= text.length && intervalId !== undefined) {
          window.clearInterval(intervalId);
        }
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(start);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [text, speed, delay]);

  const displayed = text.slice(0, typedLength);
  const done = typedLength >= text.length;

  return { displayed, done };
}
