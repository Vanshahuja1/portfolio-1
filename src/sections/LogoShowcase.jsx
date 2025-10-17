import { 
  Users, 
  Handshake, 
  MessageSquare, 
  Brain, 
  Target, 
  ShieldCheck, 
  Lightbulb, 
  HeartHandshake, 
  Rocket, 
  Trophy, 
  Clock, 
  Presentation
} from "lucide-react";

const LogoIcon = ({ Icon, label }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <div className="group flex flex-col items-center gap-2">
        <div className="rounded-xl p-3 transition-all duration-300 ease-out ring-1 ring-white/10 bg-white/5 group-hover:bg-gradient-to-r group-hover:from-indigo-500/20 group-hover:via-sky-500/20 group-hover:to-emerald-500/20 group-hover:ring-indigo-400/40">
          <Icon aria-label={label} className="text-white/80 transition-colors duration-300 group-hover:text-white" size={42} strokeWidth={1.75} />
        </div>
        <span className="text-xs md:text-sm text-white/60 transition-all duration-300 bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:via-sky-300 group-hover:to-emerald-300">
          {label}
        </span>
      </div>
    </div>
  );
};

const softSkills = [
  { Icon: Users, label: "Collaboration" },
  { Icon: Handshake, label: "Teamwork" },
  { Icon: MessageSquare, label: "Communication" },
  { Icon: Brain, label: "Problem Solving" },
  { Icon: Target, label: "Goal Oriented" },
  { Icon: ShieldCheck, label: "Accountability" },
  { Icon: Lightbulb, label: "Creativity" },
  { Icon: HeartHandshake, label: "Empathy" },
  { Icon: Rocket, label: "Initiative" },
  { Icon: Trophy, label: "Ownership" },
  { Icon: Clock, label: "Time Management" },
  { Icon: Presentation, label: "Stakeholder Alignment" },
];

const LogoShowcase = () => (
  <div className="md:my-10 my-5 relative">
    <div className="gradient-edge" />
    <div className="gradient-edge" />

    <div className="marquee h-48">
      <div className="marquee-box md:gap-12 gap-5">
        {softSkills.map((item, index) => (
          <LogoIcon key={`soft-1-${index}`} Icon={item.Icon} label={item.label} />
        ))}

        {softSkills.map((item, index) => (
          <LogoIcon key={`soft-2-${index}`} Icon={item.Icon} label={item.label} />
        ))}
      </div>
    </div>
  </div>
);

export default LogoShowcase;
