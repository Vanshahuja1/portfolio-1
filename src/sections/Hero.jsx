import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import LightRays from "../components/LightRays";
import { words } from "../constants";
import { prefersReducedMotion } from "../lib/motion";

const Hero = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setAnimationComplete(true);
        window.dispatchEvent(new CustomEvent("heroAnimationComplete"));
        // Remove will-change after animation
        gsap.set(".hero-text .hero-line", { clearProps: "all" });
      },
    });

    tl.fromTo(
      ".hero-text .hero-line",
      { 
        y: 20, 
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
      }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Light rays background layer - Loads after text animation */}
      {animationComplete && !prefersReducedMotion() && (
        <div className="absolute inset-0 z-5 pointer-events-none animate-fade-in">
          <LightRays
            raysOrigin="top"
            raysColor="#0080ffff"
            raysSpeed={1.0}
            lightSpread={1.4}
            rayLength={1.5}
            fadeDistance={1.3}
            saturation={0.9}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0.02}
            distortion={0.02}
            className="mix-blend-screen opacity-60"
          />
        </div>
      )}

      <div className="hero-layout relative z-10">
        {/* CENTER: Hero Content */}
        <header className="flex flex-col justify-center items-center text-center w-full md:px-24 px-5">
          <div className="flex flex-col gap-6">
            <h1 className="hero-text">
              <span className="hero-line ml-5 lg:text-left md:text-center text-center will-change-transform-opacity">
                Transforming
                {/* decorative rotating words — hidden from assistive tech */}
                <span className="slide" aria-hidden="true">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt=""
                          className="xl:size-9 md:size-8 size-7 md:p-2 p-1 rounded-full bg-white-50"
                          loading="eager"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </span>
              <span className="hero-line will-change-transform-opacity">into Real Projects</span>
              <span className="hero-line will-change-transform-opacity">that Deliver Experiences</span>
            </h1>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              I&apos;m Vansh, an AI Engineer &amp; full-stack developer turning ideas into intelligent, scalable products.
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12 mx-auto"
              href="#work"
            />
          </div>
        </header>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;