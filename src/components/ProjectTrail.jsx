import { useEffect, useState } from "react";

/**
 * Fixed left-hand scroll trail for the projects list. A dot per project, the
 * line fills as you scroll, and the project in the middle of the viewport is
 * highlighted. Dots link to the project (`#slug`). Hidden below md.
 *
 * `containerRef` is the element wrapping all of the project rows; each row has
 * `id={slug}`.
 */
const ProjectTrail = ({ items, containerRef }) => {
  const [state, setState] = useState({ active: 0, fill: 0, visible: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      const box = container.getBoundingClientRect();
      const tops = items.map((item) => {
        const el = document.getElementById(item.slug);
        return el ? el.getBoundingClientRect().top : Infinity;
      });

      let active = 0;
      tops.forEach((top, i) => {
        if (top <= mid) active = i;
      });

      // position between this dot and the next (the last one ends at the list's bottom)
      const start = tops[active];
      const end = active < items.length - 1 ? tops[active + 1] : box.bottom;
      const frac = Math.min(1, Math.max(0, (mid - start) / (end - start || 1)));
      const fill =
        items.length > 1 ? Math.min(1, (active + frac) / (items.length - 1)) : frac;

      const visible = box.top < mid && box.bottom > mid;

      setState((prev) =>
        prev.active === active &&
        prev.visible === visible &&
        Math.abs(prev.fill - fill) < 0.005
          ? prev
          : { active, fill, visible }
      );
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // rows grow and shrink when a case study opens or closes
    const observer = new ResizeObserver(schedule);
    observer.observe(container);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [items, containerRef]);

  const { active, fill, visible } = state;

  return (
    <nav
      aria-label="Project progress"
      className={`fixed left-4 xl:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4 transition-opacity duration-300 motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative flex flex-col justify-between h-[50vh] max-h-96 min-h-48">
        {/* track + progress fill */}
        <span className="absolute left-1/2 top-1.5 bottom-1.5 w-px -translate-x-1/2 bg-white/15" />
        <span
          className="absolute left-1/2 top-1.5 w-0.5 -translate-x-1/2 bg-white-50 rounded-full"
          style={{ height: `calc((100% - 0.75rem) * ${fill})` }}
        />

        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <a
              key={item.slug}
              href={`#${item.slug}`}
              aria-label={`Go to ${item.label}`}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex size-3 items-center justify-center rounded-full"
            >
              <span
                className={`block rounded-full transition-all duration-300 motion-reduce:transition-none ${
                  isActive
                    ? "size-3 bg-white"
                    : "size-2 bg-white/30 group-hover:bg-white/70"
                }`}
              />
              <span
                className={`pointer-events-none absolute left-7 whitespace-nowrap rounded-md bg-black-200 px-2 py-1 text-xs text-white transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                  isActive ? "opacity-0 2xl:opacity-100" : "opacity-0"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default ProjectTrail;
