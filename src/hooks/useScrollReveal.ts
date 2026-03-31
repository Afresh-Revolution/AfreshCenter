import { useEffect, useRef, useState } from 'react';

/**
 * Attaches a scroll-reveal observer to a ref.
 * Adds the class 'is-visible' when the element enters the viewport.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // animate once
        }
      },
      { threshold: 0.12, ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

/**
 * Watches multiple child elements inside a container ref.
 * Adds 'is-visible' to each child sequentially when the container enters view.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLElement>(
  count: number,
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount(count);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [count]);

  return { ref, visibleCount };
}
