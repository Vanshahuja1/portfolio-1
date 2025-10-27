import React, { useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FuzzyText from "../components/FuzzyText";

const Zyntrix = () => {
  const content = useMemo(
    () =>
      "A development agency that crafts apps and websites: the complete digital solution a small to medium-sized business needs to grow reach, strengthen relationships, and turn visitors into loyal customers.",
    []
  );

  useGSAP(() => {
    gsap.fromTo(
      "#zyntrix .z-word",
      { y: 8, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "power2.out" }
    );
  });

  return (
    <section id="zyntrix" className="section-padding flex justify-center px-4 sm:px-6">
      <div className="w-full max-w-6xl flex flex-col items-center text-center gap-4 sm:gap-5 md:gap-6">
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <span className="hero-badge">Building </span>
          <div className="pointer-events-auto">
            <FuzzyText
              baseIntensity={0.2}
              hoverIntensity={0.5}
              enableHover={true}
              fontSize="clamp(2rem, 10vw, 7rem)"
              fontWeight={900}
              color="#ffffff"
            >
              Zyntrix
            </FuzzyText>
          </div>
        </div>

        <p className="text-white-50 text-sm sm:text-base md:text-xl leading-7 sm:leading-8 md:leading-relaxed max-w-[72ch] md:max-w-3xl">
          {content.split(" ").map((w, i) => (
            <span key={i} className="z-word inline-block mr-1.5 sm:mr-2">
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default Zyntrix;