import { Link } from "react-router-dom";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

// Action row for a project: external links (only those that exist) and,
// optionally, a link to the project's detail page.
const ProjectLinks = ({ links, slug, extra, className = "flex flex-wrap gap-3 mt-2" }) => {
  const hasExternal = Boolean(links?.live || links?.github);
  if (!hasExternal && !slug && !extra) return null;

  return (
    <div className={className}>
      {extra}
      {links?.live && (
        <a
          href={links.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white-50 text-black text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <ExternalLink size={16} />
          View Project
        </a>
      )}
      {links?.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 text-sm font-medium hover:bg-white/10 transition-colors"
        >
          <Github size={16} />
          View Code
        </a>
      )}
      {slug && (
        <Link
          to={`/projects/${slug}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 text-sm font-medium hover:bg-white/10 transition-colors"
        >
          View Details
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default ProjectLinks;
