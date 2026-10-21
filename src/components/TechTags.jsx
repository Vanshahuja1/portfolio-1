const TechTags = ({ tech, tagClassName = "px-2 py-1" }) => (
  <div className="flex flex-wrap gap-2">
    {tech.map((t) => (
      <span key={t.name} className={`text-xs rounded-md border ${tagClassName} ${t.color}`}>
        {t.name}
      </span>
    ))}
  </div>
);

export default TechTags;
