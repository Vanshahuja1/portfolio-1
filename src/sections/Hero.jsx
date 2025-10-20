import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import LightRays from "../components/LightRays";
import { words } from "../constants";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          window.dispatchEvent(new CustomEvent("heroAnimationComplete"));
        },
      }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Light rays background layer */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <LightRays
          raysOrigin="top-left"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.6}
          rayLength={2.0}
          fadeDistance={1.8}
          saturation={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.05}
          distortion={0.05}
          className="mix-blend-screen opacity-90"
        />
      </div>
      <div className="absolute inset-0 z-5 pointer-events-none">
        <LightRays
          raysOrigin="top-right"
          raysColor="#0000ff"
          raysSpeed={1.5}
          lightSpread={0.6}
          rayLength={2.0}
          fadeDistance={1.8}
          saturation={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.05}
          distortion={0.05}
          className="mix-blend-screen opacity-90"
        />
      </div>

      {/* Decorative background image, kept below content but above rays if needed */}
      
      <div className="hero-layout relative z-10">
        {/* CENTER: Hero Content */}
        <header className="flex flex-col justify-center items-center text-center w-full md:px-24 px-5">
          <div className="flex flex-col gap-6">
            <div className="hero-text">
              <h1 className="ml-5 lg:text-left md:text-left text-center">
                Transforming
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-9 md:size-8 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Experiences</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              I&apos;m Vansh, a full-stack developer turning creative visions into scalable products.
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12 mx-auto"
              id="counter"
            />
          </div>
        </header>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;