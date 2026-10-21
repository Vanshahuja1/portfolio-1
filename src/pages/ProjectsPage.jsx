import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { projects } from "../constants";
import ProjectCard from "../components/ProjectCard";
import ProjectTrail from "../components/ProjectTrail";
import TitleHeader from "../components/TitleHeader";
import usePageTitle from "../hooks/usePageTitle";
import { prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const ProjectsPage = () => {
  const [openSlug, setOpenSlug] = useState(null);
  const containerRef = useRef(null);
  const listRef = useRef(null);

  usePageTitle(
    "Projects — Vansh Ahuja",
    "A full look at the AI systems and full-stack products Vansh Ahuja has designed and built — from LLM-powered assistants to production web platforms."
  );

  const trailItems = useMemo(
    () => projects.map((p) => ({ slug: p.slug, label: p.shortTitle || p.title })),
    []
  );

  // One case study open at a time: opening another closes the current one.
  const handleToggle = (slug) => {
    const opening = openSlug !== slug;
    setOpenSlug(opening ? slug : null);

    if (opening) {
      // once the panel above has collapsed and this one has expanded, bring
      // the opened case study into view so the page doesn't jump
      window.setTimeout(() => {
        document.getElementById(`${slug}-case-study`)?.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
      }, 550);
    }
  };

  useGSAP(
    () => {
      gsap.utils.toArray(".project-feature").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="section-padding px-5 md:px-10 pb-24">
      <TitleHeader as="h1" title="All Projects" sub="Everything I've Built" />

      <ProjectTrail items={trailItems} containerRef={listRef} />

      <div ref={listRef} className="flex flex-col mt-10">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            isOpen={openSlug === project.slug}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;
