import { prefersReducedMotion } from "../lib/motion";

/**
 * A reusable CTA link.
 * When clicked, it scrolls smoothly to the in-page section named by `href`
 * (e.g. "#work"), with a small offset from the top for better visual placement.
 */

const Button = ({ text, className, href = "#work" }) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        const target = document.getElementById(href.replace(/^#/, ""));
        if (!target) return; // fall back to the browser's default anchor jump

        e.preventDefault(); // Stop the link from jumping instantly

        const offset = window.innerHeight * 0.15; // Leave a bit of space at the top

        // Calculate how far down the page we need to scroll
        const top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }}
      className={`${className ?? ""} cta-wrapper`} // Add base + extra class names
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="" />
        </div>
      </div>
    </a>
  );
};

export default Button;
