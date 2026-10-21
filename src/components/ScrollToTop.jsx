import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { prefersReducedMotion } from "../lib/motion";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
        } else {
          window.scrollTo(0, 0);
        }
      };
      // wait a frame for the new route's content to mount before measuring
      requestAnimationFrame(() => requestAnimationFrame(scrollToHash));
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
