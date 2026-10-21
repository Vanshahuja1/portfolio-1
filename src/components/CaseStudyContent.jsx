import {
  leadSections,
  stepSections,
  pointSections,
  hasContent,
  toItem,
} from "../lib/caseStudy";

const pad = (n) => String(n).padStart(2, "0");

const SectionHeading = ({ as, large, children }) => {
  const Heading = as;
  return (
    <Heading className={large ? "text-2xl md:text-3xl font-semibold" : "text-xl font-semibold"}>
      {children}
    </Heading>
  );
};

/**
 * Renders a project's `detail` object as a case study. Only sections with
 * content appear.
 * layout="grid"  → story + side column (expandable panel on /projects)
 * layout="stack" → single reading column (project detail page)
 */
const CaseStudyContent = ({ detail = {}, headingAs = "h3", layout = "grid" }) => {
  const isGrid = layout === "grid";
  const large = layout === "stack";
  const heading = (title) => (
    <SectionHeading as={headingAs} large={large}>
      {title}
    </SectionHeading>
  );

  const hasAside = hasContent(detail.role) || hasContent(detail.infrastructure);

  return (
    <div className="flex flex-col gap-10">
      {hasContent(detail.metrics) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {detail.metrics.map((metric) => (
            <div key={metric.label} className="bg-zinc-900 rounded-lg p-6 flex flex-col gap-1">
              <span className="text-3xl font-bold text-white">{metric.value}</span>
              <span className="text-sm text-white-50">{metric.label}</span>
            </div>
          ))}
        </div>
      )}

      <div
        className={
          isGrid && hasAside
            ? "grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14"
            : "flex flex-col gap-12"
        }
      >
        {/* the story */}
        <div className={`flex flex-col gap-10 ${isGrid && hasAside ? "lg:col-span-2" : ""}`}>
          {leadSections.map(({ key, title }) =>
            hasContent(detail[key]) ? (
              <div key={key} className="flex flex-col gap-3">
                {heading(title)}
                <p className="text-white-50 text-lg md:text-xl leading-relaxed">{detail[key]}</p>
              </div>
            ) : null
          )}

          {stepSections.map(({ key, title }) =>
            hasContent(detail[key]) ? (
              <div key={key} className="flex flex-col gap-5">
                {heading(title)}
                <ol className="flex flex-col">
                  {detail[key].map(toItem).map((item, i) => (
                    <li
                      key={item.text}
                      className={`grid grid-cols-[auto_1fr] gap-x-5 py-4 ${
                        i > 0 ? "border-t border-black-50" : ""
                      }`}
                    >
                      <span className="text-sm font-semibold text-white-50/60 tabular-nums pt-1">
                        {pad(i + 1)}
                      </span>
                      <div className="flex flex-col gap-1">
                        {item.title && <span className="font-semibold text-white">{item.title}</span>}
                        <span className="text-white-50 leading-relaxed">{item.text}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null
          )}

          {pointSections.map(({ key, title }) =>
            hasContent(detail[key]) ? (
              <div key={key} className="flex flex-col gap-4">
                {heading(title)}
                <ul className="flex flex-col gap-3">
                  {detail[key].map(toItem).map((item) => (
                    <li key={item.text} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white-50" />
                      <p className="text-white-50 leading-relaxed">
                        {item.title && (
                          <span className="font-semibold text-white">{item.title}. </span>
                        )}
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null
          )}
        </div>

        {/* role and stack */}
        {hasAside && (
          <aside
            className={`flex flex-col gap-8 ${
              isGrid ? "lg:border-l lg:border-black-50 lg:pl-10" : ""
            }`}
          >
            {hasContent(detail.role) && (
              <div className="flex flex-col gap-3">
                {heading("My Role")}
                <p className="text-white-50 leading-relaxed">{detail.role}</p>
              </div>
            )}
            {hasContent(detail.infrastructure) && (
              <div className="flex flex-col gap-4">
                {heading("Tech Stack")}
                <ul className="flex flex-wrap gap-2">
                  {detail.infrastructure.map((tech) => (
                    <li
                      key={tech}
                      className="text-sm px-3 py-1.5 rounded-md border border-white/15 text-white-50"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        )}
      </div>

      {hasContent(detail.media) && (
        <div className="flex flex-col gap-6">
          {heading("Screenshots & Demos")}
          {detail.media.map((item) => (
            <figure key={item.src} className="flex flex-col gap-3">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl"
              />
              {item.caption && (
                <figcaption className="text-sm text-white-50">{item.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
};

export default CaseStudyContent;
