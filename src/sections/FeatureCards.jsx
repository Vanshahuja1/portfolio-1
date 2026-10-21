import { Code2, BrainCircuit, Cloud, Handshake } from "lucide-react";

const abilities = [
  {
    Icon: Code2,
    title: "Full-Stack Development",
    desc: "Building responsive, scalable web apps end-to-end — from pixel-perfect UI to robust backend APIs.",
  },
  {
    Icon: BrainCircuit,
    title: "AI Systems & LLM Integration",
    desc: "Building LLM-powered features, RAG pipelines, and semantic search that make products genuinely intelligent.",
  },
  {
    Icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Deploying and scaling applications on AWS with CI/CD pipelines built for reliability.",
  },
  {
    Icon: Handshake,
    title: "Seamless Collaboration",
    desc: "Bridging ideas and execution through honest communication and a shared vision for success.",
  },
];

const FeatureCards = () => (
  <div className="w-full padding-x-lg">
    <div className="mx-auto grid-4-cols">
      {abilities.map((ability) => (
        <div
          key={ability.title}
          className="card-border rounded-xl p-8 flex flex-col gap-4"
        >
          <div className="size-14 flex items-center justify-center rounded-full bg-white/5">
            <ability.Icon className="text-white-50" size={28} strokeWidth={1.75} />
          </div>
          <h3 className="text-white text-2xl font-semibold mt-2">{ability.title}</h3>
          <p className="text-white-50 text-lg">{ability.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureCards;