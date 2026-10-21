// A project's title with its leading word(s) in the project's brand colour,
// when the project defines `accent: { text, color }` (see constants/index.js).
const ProjectTitle = ({ project }) => {
  const { title, accent } = project;
  if (!accent || !title.startsWith(accent.text)) return title;

  return (
    <>
      <span style={{ color: accent.color }}>{accent.text}</span>
      {title.slice(accent.text.length)}
    </>
  );
};

export default ProjectTitle;
