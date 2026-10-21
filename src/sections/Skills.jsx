// eslint-disable-next-line no-unused-vars -- `motion` is used via the <motion.div> JSX tag below
import { motion } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiMongodb,
  SiNextdotjs,
  SiDocker,
  SiTypescript,
  SiPostgresql,
  SiPython,
  SiFastapi,
  SiFlask,
  SiAmazonec2,
  SiAmazons3,
  SiAmazonrds,
} from "react-icons/si";
import { TbApi, TbSql } from "react-icons/tb";
import {
  Network,
  Bot,
  Wrench,
  BookOpen,
  Search,
  Plug,
  Braces,
  Route,
  ClipboardCheck,
  Container,
  MessagesSquare,
  HardDrive,
  Zap,
  Infinity as InfinityIcon,
  Radio,
} from "lucide-react";

import TitleHeader from "../components/TitleHeader";

const skills = [
  { name: "LLM Orchestration", icon: <Network size="1em" className="text-violet-400" /> },
  { name: "Agentic Workflows", icon: <Bot size="1em" className="text-violet-400" /> },
  { name: "Tool Calling", icon: <Wrench size="1em" className="text-violet-400" /> },
  { name: "RAG", icon: <BookOpen size="1em" className="text-violet-400" /> },
  { name: "Embeddings & Semantic Search", icon: <Search size="1em" className="text-violet-400" /> },
  { name: "MCP", icon: <Plug size="1em" className="text-violet-400" /> },
  { name: "Structured Outputs", icon: <Braces size="1em" className="text-violet-400" /> },
  { name: "Model Routing", icon: <Route size="1em" className="text-violet-400" /> },
  { name: "LLM Evaluation", icon: <ClipboardCheck size="1em" className="text-violet-400" /> },
  { name: "AWS EC2", icon: <SiAmazonec2 className="text-orange-400" /> },
  { name: "AWS S3", icon: <SiAmazons3 className="text-orange-400" /> },
  { name: "AWS RDS", icon: <SiAmazonrds className="text-orange-400" /> },
  { name: "Azure Container Apps", icon: <Container size="1em" className="text-sky-400" /> },
  { name: "Azure Service Bus", icon: <MessagesSquare size="1em" className="text-sky-400" /> },
  { name: "Azure Blob Storage", icon: <HardDrive size="1em" className="text-sky-400" /> },
  { name: "Azure Function Apps", icon: <Zap size="1em" className="text-sky-400" /> },
  { name: "Docker", icon: <SiDocker className="text-blue-400" /> },
  { name: "CI/CD", icon: <InfinityIcon size="1em" className="text-green-400" /> },
  { name: "Python", icon: <SiPython className="text-blue-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  { name: "SQL", icon: <TbSql className="text-amber-400" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "FastAPI", icon: <SiFastapi className="text-teal-400" /> },
  { name: "Flask", icon: <SiFlask className="text-white" /> },
  { name: "REST APIs", icon: <TbApi className="text-green-400" /> },
  { name: "SSE", icon: <Radio size="1em" className="text-pink-400" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-600" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
];

export const Skills = () => {
  return (
    <section id="skills" className="section-padding px-5 md:px-10">
      <TitleHeader
        title="How I Can Contribute & My Key Skills"
        sub="What I Bring to the Table"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-16">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            // stagger within a row only, so items far down the list don't wait seconds
            transition={{ duration: 0.3, delay: (index % 4) * 0.1 }}
            className="flex flex-col items-center text-center gap-4"
          >
            <div className="text-5xl">{skill.icon}</div>
            <p className="text-xl font-medium">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
