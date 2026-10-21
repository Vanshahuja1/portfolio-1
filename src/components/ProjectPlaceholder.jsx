// Shown for projects that have no screenshot yet. Same look the /projects page
// already used for image-less projects.
const ProjectPlaceholder = ({ title, size = "lg" }) => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500/20 via-black-100 to-sky-500/20">
    <span
      className={`font-bold text-white/80 px-6 text-center ${
        size === "sm" ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"
      }`}
    >
      {title}
    </span>
  </div>
);

export default ProjectPlaceholder;
