const TitleHeader = ({ title, sub, as = "h2" }) => {
  const Heading = as;
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="hero-badge">
        <p>{sub}</p>
      </div>
      <div>
        <Heading className="font-semibold md:text-5xl text-3xl text-center">
          {title}
        </Heading>
      </div>
    </div>
  );
};

export default TitleHeader;
