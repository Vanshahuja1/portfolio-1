import { ChevronDown } from "lucide-react";

import ProjectPlaceholder from "./ProjectPlaceholder";
import ProjectLinks from "./ProjectLinks";
import TechTags from "./TechTags";
import ProjectTitle from "./ProjectTitle";
import CaseStudyContent from "./CaseStudyContent";
import { hasCaseStudy } from "../lib/caseStudy";

const ProjectCard = ({ project, isOpen = false, onToggle }) => {
  const { slug, title, image, description, stats, tech, links, detail } = project;
  const expandable = hasCaseStudy(detail);
  const panelId = `${slug}-case-study`;

  const toggle = expandable && (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={panelId}
      onClick={() => onToggle?.(slug)}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
    >
      {isOpen ? "Hide case study" : "Read case study"}
      <ChevronDown
        size={16}
        aria-hidden="true"
        className={`transition-transform duration-300 motion-reduce:transition-none ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );

  return (
    <div id={slug} className="project-feature">
      <div className="py-10 md:py-12">
        <div className="w-full max-w-6xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-start gap-10 md:gap-16">
          {/* left: project name above the photo */}
          <div className="w-full md:w-3/5 flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              <ProjectTitle project={project} />
            </h2>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black-100">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ProjectPlaceholder title={project.shortTitle || title} />
              )}
            </div>
          </div>

          {/* right: description, highlights, tech and actions */}
          <div className="w-full md:w-2/5 flex flex-col gap-5">
            <p className="text-white-50 text-base md:text-lg leading-relaxed">{description}</p>

            {stats?.length > 0 && (
              <div className="flex flex-col gap-2">
                {stats.map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    <p className="text-sm text-white-50">{s}</p>
                  </div>
                ))}
              </div>
            )}

            <TechTags tech={tech} tagClassName="px-2.5 py-1" />

            <ProjectLinks links={links} slug={slug} extra={toggle || null} />
          </div>
        </div>
      </div>

      {expandable && (
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-in-out motion-reduce:transition-none ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div
            id={panelId}
            role="region"
            aria-label={`${title} case study`}
            inert={!isOpen}
            className="min-h-0 overflow-hidden scroll-mt-28"
          >
            <div className="w-full max-w-6xl mx-auto px-5 md:px-10 pb-12">
              <div className="card-border rounded-xl p-6 md:p-10">
                <CaseStudyContent detail={detail} headingAs="h3" layout="grid" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
