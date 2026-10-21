import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

import { projects, homeFeaturedSlugs } from "../constants";
import ProjectPlaceholder from "../components/ProjectPlaceholder";
import TechTags from "../components/TechTags";
import ProjectTitle from "../components/ProjectTitle";

gsap.registerPlugin(ScrollTrigger);

// Hover/focus overlay with the project's external links.
const OverlayLinks = ({ links }) => {
  if (!links?.live && !links?.github) return null;
  return (
  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity flex items-center justify-center gap-4">
    {links?.live && (
      <a
        href={links.live}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm"
      >
        <ExternalLink size={16} />
        <span>View Project</span>
      </a>
    )}
    {links?.github && (
      <a
        href={links.github}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm"
      >
        <Github size={16} />
        <span>View Code</span>
      </a>
    )}
  </div>
  );
};

const DetailsLink = ({ slug, title }) => (
  <Link
    to={`/projects/${slug}`}
    className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white-50 transition-colors"
  >
    View details
    <span className="sr-only"> for {title}</span>
    <ArrowRight size={16} aria-hidden="true" />
  </Link>
);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const featuredProjects = homeFeaturedSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean);
  const [mainProject, ...listProjects] = featuredProjects;

  useGSAP(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });

    cardRefs.current.filter(Boolean).forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="px-4 md:px-8 lg:px-12 mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Projects</h2>
            <p className="text-white-50 md:text-lg mt-2">
              A selection of digital products I&apos;ve designed and built with a focus on
              reliability, performance, and user experience.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium whitespace-nowrap"
          >
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="showcaselayout">
          {mainProject && (
            <div ref={(el) => (cardRefs.current[0] = el)} className="first-project-wrapper">
              <div className="image-wrapper relative overflow-hidden group">
                {mainProject.image ? (
                  <img
                    src={mainProject.image}
                    className="rounded-2xl"
                    alt={mainProject.title}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="aspect-video w-[min(100vw,48rem)] max-w-full">
                    <ProjectPlaceholder title={mainProject.shortTitle || mainProject.title} />
                  </div>
                )}
                <OverlayLinks links={mainProject.links} />
              </div>
              <div className="text-content">
                <h3>
                  <ProjectTitle project={mainProject} />
                </h3>
                <p className="text-white-50 md:text-xl">{mainProject.description}</p>
                {mainProject.stats?.length > 0 && (
                  <div className="flex flex-col gap-2 mt-3 mb-4">
                    {mainProject.stats.map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                        <p className="text-sm text-white-50">{s}</p>
                      </div>
                    ))}
                  </div>
                )}
                <TechTags tech={mainProject.tech} />
                <DetailsLink slug={mainProject.slug} title={mainProject.title} />
              </div>
            </div>
          )}

          <div className="project-list-wrapper overflow-hidden">
            {listProjects.map((project, index) => (
              <div
                className="project"
                key={project.slug}
                ref={(el) => (cardRefs.current[index + 1] = el)}
              >
                <div className="image-wrapper relative overflow-hidden group">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="aspect-video w-[min(100vw,28rem)] max-w-full">
                      <ProjectPlaceholder title={project.shortTitle || project.title} size="sm" />
                    </div>
                  )}
                  <OverlayLinks links={project.links} />
                </div>
                <h3>
                  <ProjectTitle project={project} />
                </h3>
                <p className="text-white-50 md:text-sm xl:line-clamp-2">{project.description}</p>
                {project.stats?.length > 0 && (
                  <div className="flex items-center gap-2 mt-2 mb-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                    <p className="text-xs text-white-50">{project.stats[0]}</p>
                  </div>
                )}
                <TechTags tech={project.tech} />
                <div className="mt-3">
                  <DetailsLink slug={project.slug} title={project.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
