import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { projects } from "../constants";
import NotFound from "./NotFound";
import TitleHeader from "../components/TitleHeader";
import ProjectPlaceholder from "../components/ProjectPlaceholder";
import ProjectLinks from "../components/ProjectLinks";
import TechTags from "../components/TechTags";
import ProjectTitle from "../components/ProjectTitle";
import CaseStudyContent from "../components/CaseStudyContent";
import usePageTitle from "../hooks/usePageTitle";

const bodyText = "text-white-50 text-base md:text-lg leading-relaxed";

const NeighbourLink = ({ project, direction }) => {
  if (!project) return <span />;
  const isNext = direction === "next";
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`flex flex-col gap-1 max-w-[45%] text-white-50 hover:text-white transition-colors ${
        isNext ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <span className="text-sm flex items-center gap-2">
        {!isNext && <ArrowLeft size={16} aria-hidden="true" />}
        {isNext ? "Next project" : "Previous project"}
        {isNext && <ArrowRight size={16} aria-hidden="true" />}
      </span>
      <span className="font-semibold text-white">{project.shortTitle || project.title}</span>
    </Link>
  );
};

const ProjectDetail = ({ project, prev, next }) => {
  const { title, category, image, description, stats, tech, links, detail } = project;
  usePageTitle(`${title} — Vansh Ahuja`);

  return (
    <article className="section-padding pb-24 w-full">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-white-50 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All projects
        </Link>

        <TitleHeader as="h1" title={<ProjectTitle project={project} />} sub={category} />

        <div className="mt-12 relative rounded-2xl overflow-hidden aspect-video bg-black-100">
          {image ? (
            <img
              src={image}
              alt={title}
              decoding="async"
              className="w-full h-full object-cover"
            />
          ) : (
            <ProjectPlaceholder title={project.shortTitle || title} />
          )}
        </div>

        <div className="mt-12 flex flex-col gap-10 max-w-3xl mx-auto">
          <div className="flex flex-col gap-5">
            <p className={bodyText}>{description}</p>

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
            <ProjectLinks links={links} />
          </div>

          <CaseStudyContent detail={detail} headingAs="h2" layout="stack" />
        </div>

        <nav
          aria-label="More projects"
          className="mt-20 pt-8 border-t border-black-50 flex justify-between gap-6"
        >
          <NeighbourLink project={prev} direction="prev" />
          <NeighbourLink project={next} direction="next" />
        </nav>
      </div>
    </article>
  );
};

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) return <NotFound />;

  return (
    <ProjectDetail
      key={slug}
      project={projects[index]}
      prev={projects[index - 1]}
      next={projects[index + 1]}
    />
  );
};

export default ProjectDetailPage;
