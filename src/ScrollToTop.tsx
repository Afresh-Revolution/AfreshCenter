import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, try to scroll to the anchor.
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => {
        const el =
          document.getElementById(id) ??
          document.querySelector(`[name="${CSS.escape(id)}"]`);
        el?.scrollIntoView({ block: "start" });
      });
      return;
    }

    // Default behavior for route changes: start at the top.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search, hash]);

  return null;
}

