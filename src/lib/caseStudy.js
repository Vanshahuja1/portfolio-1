// Case-study sections, in display order, grouped by how they render.
// Each project's `detail` object (see constants/index.js) only shows the ones it has.

// short narrative paragraphs at the top of the story
export const leadSections = [
  { key: "problem", title: "The Challenge" },
  { key: "overview", title: "Overview" },
];

// numbered walkthrough
export const stepSections = [{ key: "solution", title: "How It Works" }];

// lists of points, each optionally with a bold lead-in
export const pointSections = [
  { key: "architecture", title: "Architecture" },
  { key: "decisions", title: "Key Decisions" },
  { key: "challenges", title: "Challenges & Trade-offs" },
  { key: "scalability", title: "Built to Scale" },
  { key: "outcomes", title: "Outcomes" },
];

export const hasContent = (value) =>
  Array.isArray(value) ? value.length > 0 : Boolean(value);

const allKeys = [
  ...leadSections,
  ...stepSections,
  ...pointSections,
].map(({ key }) => key).concat(["role", "infrastructure", "metrics", "media"]);

export const hasCaseStudy = (detail) =>
  Boolean(detail) && allKeys.some((key) => hasContent(detail[key]));

// items may be plain strings or { title, text }
export const toItem = (item) =>
  typeof item === "string" ? { title: null, text: item } : item;
