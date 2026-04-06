import { useEffect, useRef, useState } from 'react';

/**
 * Attaches a scroll-reveal observer to a ref.
 * Adds the class 'is-visible' when the element enters the viewport.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit,
) {
  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const threshold = options?.threshold ?? 0.12;
  const root = options?.root ?? null;
  const rootMargin = options?.rootMargin ?? '0px';

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // animate once
        }
      },
      { threshold, root, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return [elementRef, isVisible] as const;
}

/**
 * Watches multiple child elements inside a container ref.
 * Adds 'is-visible' to each child sequentially when the container enters view.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLElement>(
  count: number,
  options?: IntersectionObserverInit,
) {
  const elementRef = useRef<T>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const threshold = options?.threshold ?? 0.08;
  const root = options?.root ?? null;
  const rootMargin = options?.rootMargin ?? '0px';

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount(count);
          observer.unobserve(el);
        }
      },
      { threshold, root, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [count, root, rootMargin, threshold]);

  return [elementRef, visibleCount] as const;
}
