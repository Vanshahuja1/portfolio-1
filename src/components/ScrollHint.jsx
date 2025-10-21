import { useEffect, useRef, useState } from "react";

const ScrollHint = ({ idleMs = 10000 }) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const startTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setVisible(true);
      }, idleMs);
    };

    const onActivity = () => {
      if (visible) setVisible(false);
      startTimer();
    };

    // Start the initial idle timer on mount
    startTimer();

    const events = [
      "scroll",
      "mousemove",
      "mousedown",
      "touchstart",
      "keydown",
      "wheel",
    ];
    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, onActivity));
    };
  }, [idleMs, visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 bottom-6 z-50 flex flex-col items-center gap-1 select-none ${
        visible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          window.scrollTo({ top: window.scrollY + window.innerHeight, behavior: "smooth" });
        }}
        className="px-3 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm flex items-center gap-2 hover:bg-white/15 active:scale-95 transition"
        aria-label="Scroll down"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-bounce"
        >
          <path
            d="M12 5v14m0 0l-6-6m6 6l6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Scroll down</span>
      </button>
    </div>
  );
};

export default ScrollHint;
