import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import { navLinks } from "../constants";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);
  // control initial visibility after hero animation completes
  // (off the home page there is no hero animation, so show the nav right away)
  const [visible, setVisible] = useState(location.pathname !== "/");
  // mobile menu (below the lg breakpoint)
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  // anchor links (e.g. "#work") only exist on the home page — if we're on
  // another route, navigate home first and let ScrollToTop handle the scroll
  const handleAnchorClick = (e, hash) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate(`/${hash}`);
    }
  };

  useEffect(() => {
    // create an event listener for when the user scrolls
    const handleScroll = () => {
      // check if the user has scrolled down at least 10px
      // if so, set the state to true
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // add the event listener to the window
    window.addEventListener("scroll", handleScroll);
    // initialize once on mount
    handleScroll();

    // wait for hero animation to complete, with fallback
    const onHeroDone = () => setVisible(true);
    window.addEventListener("heroAnimationComplete", onHeroDone, { once: true });
    const fallback = setTimeout(() => setVisible(true), 3000);

    // cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("heroAnimationComplete", onHeroDone);
      clearTimeout(fallback);
    };
  }, []);

  // Escape closes the mobile menu and returns focus to its button
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`navbar ${scrolled ? "scrolled" : "not-scrolled"} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
      } transition-all duration-500`}
    >
      <div className="inner">
        <a
          href="/#hero"
          onClick={(e) => handleAnchorClick(e, "#hero")}
          className="logo flex items-center gap-2"
        >
          <span>Vansh Ahuja</span>
        </a>

        <nav className="desktop" aria-label="Primary">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                {link.startsWith("/") ? (
                  <Link to={link}>
                    <span>{name}</span>
                    <span className="underline" />
                  </Link>
                ) : (
                  <a href={`/${link}`} onClick={(e) => handleAnchorClick(e, link)}>
                    <span>{name}</span>
                    <span className="underline" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            onClick={(e) => handleAnchorClick(e, "#contact")}
            className="contact-btn group"
          >
            <div className="inner">
              <span>Contact me</span>
            </div>
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            className="lg:hidden flex items-center justify-center size-10 cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X size={24} className="text-white" aria-hidden="true" />
            ) : (
              <img src="/images/menu.svg" alt="" width={24} height={24} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="lg:hidden absolute left-0 right-0 top-full bg-black border-t border-black-50 px-5 py-4"
        >
          <ul className="flex flex-col">
            {navLinks.map(({ link, name }) => (
              <li key={name}>
                {link.startsWith("/") ? (
                  <Link
                    to={link}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-white-50 hover:text-white transition-colors duration-300"
                  >
                    {name}
                  </Link>
                ) : (
                  <a
                    href={`/${link}`}
                    onClick={(e) => handleAnchorClick(e, link)}
                    className="block py-3 text-white-50 hover:text-white transition-colors duration-300"
                  >
                    {name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
