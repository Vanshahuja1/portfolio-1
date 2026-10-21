const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Projects",
    link: "/projects",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 1, suffix: "+", label: "Years of Experience" },
  { value: 12, suffix: "+", label: "Completed Projects" },
  { value: 50, suffix: "+", label: "Satisfied Clients / Users" },
  { value: 90, suffix: "%", label: "Project Success Rate" },
];


/*
 * Single source of truth for projects: feeds the home-page showcase
 * (`homeFeaturedSlugs`, in display order), the /projects index and the
 * /projects/:slug detail pages (`projectOrder`, in display order).
 *
 * `detail` is optional and so is every field in it. It powers the expandable
 * case study on /projects and the detail page; a section only renders when its
 * field is present, so add content here as it is confirmed:
 *
 *   detail: {
 *     overview:       "string",          // what it is (when there is no clear problem)
 *     problem:        "string",          // the challenge / goal
 *     role:           "string",
 *     solution:       [item, ...],       // "How It Works", shown as numbered steps
 *     architecture:   [item, ...],
 *     decisions:      [item, ...],
 *     challenges:     [item, ...],
 *     scalability:    [item, ...],
 *     outcomes:       [item, ...],       // verified outcomes only
 *     infrastructure: ["Node.js", ...],  // tech stack, shown as tags
 *     metrics:        [{ value: "70%", label: "fewer LLM calls" }, ...],
 *     media:          [{ src, alt, caption? }, ...],
 *   }
 *
 * An `item` is either a plain string or { title: "Short lead-in", text: "Detail." }.
 */
const projectData = [
  {
    slug: "qruzine",
    detail: {
      overview:
        "Qruzine gives restaurants a contactless ordering flow: diners scan a QR code at the table to browse the menu, order and pay, while staff manage incoming orders from the kitchen side.",
      solution: [
        {
          title: "Scan to order",
          text: "A QR code opens the restaurant's menu on the diner's phone.",
        },
        {
          title: "Real-time ordering and payment",
          text: "Orders are placed in real time and paid for securely in the same flow.",
        },
        {
          title: "Kitchen management",
          text: "Staff manage incoming orders as they arrive.",
        },
        {
          title: "Restaurant dashboard",
          text: "Today's revenue and orders, menu items, QR codes and an order-status breakdown in one view.",
        },
      ],
      infrastructure: ["Next.js", "TailwindCSS", "Node.js", "Express.js", "MongoDB", "AWS EC2"],
    },
    title: "QR-based Restaurant Ordering System",
    shortTitle: "Qruzine",
    // leading words of the title shown in Qruzine's brand gold (its maroon is
    // too dark to read as text on this site's near-black background)
    accent: { text: "QR-based", color: "#d4af37" },
    category: "Full-Stack",
    image: "/images/heroo.png",
    description:
      "Qruzine is a comprehensive QR-based ordering platform that transforms the dining experience. Built for enterprise-scale reliability, it enables seamless menu browsing, real-time order placement, secure payment processing, and kitchen management—all through a simple QR code scan. The system streamlines restaurant operations while delivering an intuitive, contactless experience for customers.",
    stats: ["Used by 10+ restaurants", "Serving 500+ customers daily"],
    tech: [
      { name: "Next.js", color: "bg-blue-500/15 text-blue-300 border-blue-400/30" },
      { name: "Express.js", color: "bg-purple-500/15 text-purple-300 border-purple-400/30" },
      { name: "TailwindCSS", color: "bg-teal-500/15 text-teal-300 border-teal-400/30" },
      { name: "Node.js", color: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
      { name: "MongoDB", color: "bg-green-500/15 text-green-300 border-green-400/30" },
      { name: "Rest APIs", color: "bg-violet-500/15 text-violet-300 border-violet-400/30" },
      { name: "AWS EC2", color: "bg-yellow-500/15 text-yellow-300 border-yellow-400/30" },
    ],
    links: {
      live: "https://qruzine.com/",
      github: "https://github.com/qruzine01-gif/v1",
    },
  },
  {
    slug: "shrm",
    detail: {
      overview:
        "An end-to-end HR management system covering hiring, onboarding and performance, built around streamlined workflows, accurate data and team productivity.",
      infrastructure: ["Next.js", "TailwindCSS", "Node.js", "REST API", "MongoDB", "AWS EC2"],
    },
    title: "Systematic Human Resource Management System",
    shortTitle: "SHRM",
    accent: { text: "Systematic", color: "#818cf8" },
    category: "Full-Stack",
    image: "/images/projects/shrm.png",
    description:
      "An end-to-end HRMS focused on streamlined workflows, accurate data, and team productivity across hiring, onboarding, and performance.",
    stats: ["Used by 2 organizations managing 200+ employees"],
    tech: [
      { name: "Next.js", color: "bg-sky-500/15 text-sky-300 border-sky-400/30" },
      { name: "Node.js", color: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
      { name: "MongoDB", color: "bg-indigo-500/15 text-indigo-300 border-indigo-400/30" },
      { name: "TailwindCSS", color: "bg-teal-500/15 text-teal-300 border-teal-400/30" },
      { name: "REST API", color: "bg-orange-500/15 text-orange-300 border-orange-400/30" },
      { name: "AWS EC2", color: "bg-yellow-500/15 text-yellow-300 border-yellow-400/30" },
    ],
    links: {
      live: "https://shrm-temp-wf5b.vercel.app/landing",
      github: "https://github.com/Vanshahuja1/shrm.git",
    },
  },
  {
    slug: "ai-medical-documentation",
    detail: {
      overview:
        "A documentation tool for doctors: patient consultations are recorded in the app and summarized automatically with the OpenAI API, to streamline clinical workflows.",
      solution: [
        {
          title: "Consultation recording",
          text: "Doctors record patient conversations in the app.",
        },
        {
          title: "Automatic summaries",
          text: "Recordings are summarized with the OpenAI API.",
        },
      ],
      infrastructure: ["React", "Node.js", "WebSockets", "MongoDB", "AWS S3", "OpenAI API"],
    },
    title: "AI Medical Documentation System",
    shortTitle: "AI Medical Docs",
    accent: { text: "AI Medical", color: "#3b82f6" },
    category: "AI",
    image: "/images/projects/ai-medical.png",
    description:
      "An intelligent documentation tool for doctors to record patient conversations and automatically generate summaries using OpenAI, streamlining clinical workflows.",
    stats: ["Used by 5+ doctors", "100+ patient consultations recorded"],
    tech: [
      { name: "React", color: "bg-sky-500/15 text-sky-300 border-sky-400/30" },
      { name: "OpenAI API", color: "bg-violet-500/15 text-violet-300 border-violet-400/30" },
      { name: "Node.js", color: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
      { name: "MongoDB", color: "bg-green-500/15 text-green-300 border-green-400/30" },
      { name: "WebSockets", color: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30" },
      { name: "AWS S3", color: "bg-yellow-500/15 text-yellow-300 border-yellow-400/30" },
    ],
    links: {
      live: "https://saramedico.com/",
      github: "https://github.com/ShikharPandey123/ai-medical.git",
    },
  },
  {
    slug: "atomic-player",
    detail: {
      problem:
        "The goal: let users of a video analytics and conversion platform query their workspace data and run workspace operations in plain language, while every state-changing action stays under their explicit approval.",
      solution: [
        {
          title: "A dedicated assistant service",
          text: "The LLM-powered workspace assistant runs as its own microservice, separate from the core product.",
        },
        {
          title: "Tool registry and execution harness",
          text: "A structured registry of 21 read-only tools for data retrieval and 7 action tools for workspace operations, executed through a controlled harness.",
        },
        {
          title: "Approval gating",
          text: "Every state-changing action is held for the user's explicit approval before it runs.",
        },
        {
          title: "Dynamic model routing",
          text: "Simple requests go to lightweight models; complex tasks go to reasoning-capable models.",
        },
        {
          title: "Streaming responses",
          text: "Answers stream back to the user while tool execution stays controlled.",
        },
      ],
      scalability: [
        {
          title: "Isolated service",
          text: "Running the assistant as a separate microservice keeps it independent of the core product.",
        },
        {
          title: "Right-sized models",
          text: "Routing reserves reasoning-capable models for the requests that need them.",
        },
      ],
      infrastructure: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Azure"],
      metrics: [
        { value: "21", label: "read-only tools" },
        { value: "7", label: "approval-gated action tools" },
      ],
    },
    title: "Atomic Player — Video Analytics & Conversion SaaS",
    shortTitle: "Atomic Player",
    accent: { text: "Atomic Player", color: "#f97316" },
    category: "AI",
    image: "/images/projects/atomic-player.png",
    description:
      "A video analytics and conversion SaaS with an LLM-powered workspace assistant deployed as a dedicated microservice. A structured tool registry and execution harness orchestrates read-only tools for data retrieval and action tools for workspace operations, with explicit approval gating every state-changing action. Dynamic model routing sends simple requests to lightweight models and complex tasks to reasoning-capable models, with streaming responses and controlled tool execution.",
    stats: [
      "21 read-only tools + 7 approval-gated action tools",
      "Dynamic model routing with streaming responses",
    ],
    tech: [
      { name: "Node.js", color: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
      { name: "TypeScript", color: "bg-blue-500/15 text-blue-300 border-blue-400/30" },
      { name: "LLMs", color: "bg-violet-500/15 text-violet-300 border-violet-400/30" },
      { name: "PostgreSQL", color: "bg-indigo-500/15 text-indigo-300 border-indigo-400/30" },
      { name: "Redis", color: "bg-red-500/15 text-red-300 border-red-400/30" },
      { name: "Azure", color: "bg-sky-500/15 text-sky-300 border-sky-400/30" },
    ],
    links: {},
  },
  {
    slug: "gatherrgo",
    detail: {
      problem:
        "GatherrGo is a group travel and social events app built in React Native. It needed a backend covering the full lifecycle of a trip or event (accounts, groups, bookings, payments and notifications) on infrastructure that can scale horizontally.",
      role: "I designed and built the end-to-end backend architecture.",
      solution: [
        {
          title: "REST API",
          text: "Endpoints for authentication, trip and group lifecycles, bookings, payments and notifications power the React Native app.",
        },
        {
          title: "Containerized deployment",
          text: "The backend ships as Docker images through ECR and runs on EC2 instances behind an Application Load Balancer.",
        },
        {
          title: "Managed data and delivery",
          text: "PostgreSQL on RDS stores the data; CloudFront handles content delivery.",
        },
      ],
      scalability: [
        {
          title: "Separated tiers",
          text: "Compute, content delivery and data storage are separated, so the app can scale horizontally.",
        },
        {
          title: "Load-balanced compute",
          text: "Containers run behind an Application Load Balancer, so capacity grows by adding instances.",
        },
      ],
      infrastructure: [
        "Node.js",
        "Express.js",
        "PostgreSQL (RDS)",
        "Docker",
        "AWS EC2",
        "Application Load Balancer",
        "ECR",
        "CloudFront",
      ],
    },
    title: "GatherrGo — Group Travel & Social Events Platform",
    shortTitle: "GatherrGo",
    accent: { text: "GatherrGo", color: "#14b8a6" },
    category: "Full-Stack",
    image: "/images/projects/gatherrgo.png",
    description:
      "A group travel and social events platform. I designed and built the end-to-end backend architecture, with REST APIs for authentication, trip and group lifecycles, bookings, payments, and notifications that power the React Native app. It runs on a containerized AWS architecture: Dockerized EC2 instances behind an Application Load Balancer, ECR-based deployments, CloudFront, and PostgreSQL on RDS. Compute, content delivery, and data storage are separated so the app can scale horizontally.",
    stats: [
      "End-to-end backend for a React Native app",
      "Horizontally scalable AWS deployment (ALB, ECR, CloudFront, RDS)",
    ],
    tech: [
      { name: "Node.js", color: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
      { name: "Express.js", color: "bg-purple-500/15 text-purple-300 border-purple-400/30" },
      { name: "PostgreSQL", color: "bg-indigo-500/15 text-indigo-300 border-indigo-400/30" },
      { name: "Docker", color: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30" },
      { name: "AWS", color: "bg-yellow-500/15 text-yellow-300 border-yellow-400/30" },
    ],
    links: {},
  },
  {
    slug: "ai-shopping-assistant",
    detail: {
      problem:
        "Keyword search matches what shoppers type, not what they mean. The goal was a conversational shopping assistant that understands intent across a catalog of 5,000+ product variants, narrows results by colour and size, and takes the shopper all the way to checkout without leaving the chat.",
      role: "Built at Monkstack Solutions as part of my work as an AI Engineer.",
      solution: [
        {
          title: "Catalog to language",
          text: "Every product variant, with its attributes such as colour and size, is converted into a natural-language description the model can reason about.",
        },
        {
          title: "Embeddings in pgvector",
          text: "Those descriptions are embedded with Azure OpenAI and stored in PostgreSQL with pgvector.",
        },
        {
          title: "Semantic retrieval (RAG)",
          text: "A shopper's request is matched by meaning against the embedded catalog, so results reflect intent rather than exact keywords.",
        },
        {
          title: "Tool calling over MCP",
          text: "GPT-4.1 calls the catalog-search tools exposed through MCP instead of guessing from memory.",
        },
        {
          title: "Colour and size filters",
          text: "Semantic results are narrowed with structured colour and size filters.",
        },
        {
          title: "In-chat checkout",
          text: "The shopper completes checkout inside the conversation.",
        },
      ],
      architecture: [
        {
          title: "Request flow",
          text: "Shopper message → GPT-4.1 → MCP search tool → pgvector semantic search with colour/size filters → products back into the chat → checkout.",
        },
        {
          title: "Retrieval-augmented answers",
          text: "Responses are grounded in products retrieved from the catalog (RAG).",
        },
      ],
      scalability: [
        {
          title: "Catalog scale",
          text: "Semantic search runs across 5,000+ product variants.",
        },
        {
          title: "Containerized deployment",
          text: "The assistant runs on Azure Container Apps.",
        },
      ],
      infrastructure: [
        "GPT-4.1",
        "Azure OpenAI embeddings",
        "MCP",
        "PostgreSQL + pgvector",
        "Azure Container Apps",
      ],
      metrics: [{ value: "5,000+", label: "product variants searchable" }],
    },
    title: "AI Shopping Assistant",
    shortTitle: "AI Shopping Assistant",
    accent: { text: "AI Shopping", color: "#f59e0b" },
    category: "AI",
    image: "/images/projects/ai-shopping.gif",
    description:
      "A RAG-based shopping assistant that understands what shoppers mean, not just what they type. Catalog variants are turned into natural-language descriptions, embedded with Azure OpenAI into pgvector, and searched semantically by GPT-4.1 through MCP tool calls, with colour and size filters and checkout right inside the chat.",
    stats: [
      "Semantic search across 5,000+ product variants",
      "GPT-4.1 tool calling via MCP with in-chat checkout",
    ],
    tech: [
      { name: "GPT-4.1", color: "bg-violet-500/15 text-violet-300 border-violet-400/30" },
      { name: "Azure OpenAI", color: "bg-sky-500/15 text-sky-300 border-sky-400/30" },
      { name: "MCP", color: "bg-pink-500/15 text-pink-300 border-pink-400/30" },
      { name: "pgvector", color: "bg-indigo-500/15 text-indigo-300 border-indigo-400/30" },
      { name: "RAG", color: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30" },
      { name: "Azure Container Apps", color: "bg-blue-500/15 text-blue-300 border-blue-400/30" },
    ],
    links: {},
  },
];

// Order of the /projects index and detail-page prev/next: the three lead
// projects first, then the AI projects, then the rest. Projects not listed
// here are appended in the order they appear in `projectData`.
const projectOrder = [
  "atomic-player",
  "gatherrgo",
  "qruzine",
  "ai-shopping-assistant",
  "ai-medical-documentation",
  "shrm",
];

const projects = [
  ...projectOrder
    .map((slug) => projectData.find((project) => project.slug === slug))
    .filter(Boolean),
  ...projectData.filter((project) => !projectOrder.includes(project.slug)),
];

// Projects shown in the home-page showcase. The first is the large slot on the
// left, the rest follow in order.
const homeFeaturedSlugs = ["atomic-player", "gatherrgo", "qruzine"];

const expCards = [
  {
    imgPath: "/images/logos/monkstack.png",
    logoPath: "/images/logos/monkstack.png",
    title: "AI Engineer",
    company: "Monkstack Solutions",
    date: "Feb 2026 - Present",
    responsibilities: [
      "Engineered an optimized blueprint-to-3D pipeline combining deterministic Python vector parsing (AutoCAD PDF) with targeted Claude Sonnet 4 (AWS Bedrock) inference on tiled crops, cutting LLM calls by 70%, processing time from 6 min to 90 sec, and per-drawing cost under $0.50 via wall-graph polygon tracing.",
      "Designed a multi-tenant FastAPI backend deployed with Docker on AWS EC2, using PostgreSQL row-level security for tenant isolation, cancellable long-running jobs with stage-wise progress streamed live via Redis Streams and SSE, and per-stage artifacts stored in S3 for debugging and replay.",
      "Built a RAG-based shopping assistant on Azure Container Apps that converts catalog variants into natural-language descriptions, embeds them with Azure OpenAI into pgvector, and uses GPT-4.1 tool calling via MCP for semantic search across 5,000+ product variants with colour/size filters and in-chat checkout.",
    ],
    review:
      "Vansh brings strong technical depth and a fast-learning mindset to every AI initiative he takes on, consistently translating complex ideas into working solutions.",
  },
  {
    imgPath: "/images/logos/one_aim.png",
    logoPath: "/images/logos/one_aim.png",
    title: "Software Developer",
    company: "One Aim IT Solutions (Remote)",
    date: "Mar 2025 - Feb 2026",
    responsibilities: [
      "Designed the PostgreSQL schema for an employee management portal covering employee records, payroll, and leave, with indexed queries and transactional updates to maintain data consistency.",
      "Built Node.js REST APIs with JWT authentication and role-based access control for admin, manager, and employee roles, including validation, pagination, and connection pooling.",
    ],
    review:
      "Vansh is a dedicated and talented software developer who consistently delivers high-quality, efficient, and well-structured code. His proactive approach and attention to detail greatly enhance our project outcomes.",
  },
  {
    imgPath: "/images/logos/one_aim.png",
    logoPath: "/images/logos/digital.png",
    title: "Software Developer Intern",
    company: "Digital2Days",
    date: "June 2024 - January 2025",
    responsibilities: [
      "Assisted in developing and testing full-stack web applications using React.js and Node.js.",
      "Contributed to frontend feature enhancements and bug fixing.",
      "Collaborated with senior developers to integrate RESTful APIs.",
      "Gained hands-on experience in real-world software development workflows.",
    ],
    review:
      "During his internship, Vansh showed impressive growth and adaptability. He quickly learned new technologies and made valuable contributions to both frontend and backend development tasks.",
  },
  {
    imgPath: "/images/logos/one_aim.png",
    logoPath: "/images/logos/gehu.png",
    title: "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
    company: "Graphic Era Hill University, Dehradun",
    date: "2021 - 2025",
    responsibilities: [
      "Completed core courses in Computer Science, including Data Structures, Algorithms, Machine Learning, and Web Development.",
      "Worked on multiple academic and personal projects showcasing practical implementation of learned skills.",
      "Actively participated in technical events and hackathons to enhance development and problem-solving skills.",
    ],
    review:
      "Vansh has demonstrated excellent academic performance and practical technical skills throughout his studies. His consistent effort, teamwork, and innovative thinking have been commendable.",
  },
];



const testimonials = [
  {
    name: "Shikhar Pandey",
    mentions: "Colleague",
    review:
      "Working together on multiple features, I appreciated his clear communication and reliable delivery.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Pooja Devrari",
    mentions: "Colleague",
    review:
      "A supportive teammate with great attention to detail. Collaboration was smooth and productive.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Gargi Mishra",
    mentions: "Manager",
    review:
      "Demonstrated ownership and consistency across deliverables. A pleasure to manage and mentor.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Sumit Nagarkoti",
    mentions: "Colleague",
    review:
      "Great problem-solving mindset and a dependable partner in shipping features on time.",
    imgPath: "/images/client4.png",
  },
  
  {
    name: "Ashutosh Kumar Singh",
    mentions: "Client",
    review:
      "Delivered exactly what we needed with a strong focus on quality and timelines.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Manish",
    mentions: "Client",
    review:
      "Professional, responsive, and results-driven. The final product exceeded expectations.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Chander Sansariya",
    mentions: "Employer",
    review:
      "Showed initiative and delivered value across multiple projects with minimal supervision.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Narendra Raj Singh",
    mentions: "Employer",
    review:
      "Reliable, detail-oriented, and a strong team player. Consistently met expectations.",
    imgPath: "/images/client4.png",
  },
];

export {
  words,
  projects,
  homeFeaturedSlugs,
  counterItems,
  expCards,
  testimonials,
  navLinks,
};
