import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Github, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const aiMedicalRef = useRef(null);

  const qruzineTech = [
    { name: "Next.js", color: "bg-blue-500/15 text-blue-300 border-blue-400/30" },
    { name: "Express.js", color: "bg-purple-500/15 text-purple-300 border-purple-400/30" },
    { name: "TailwindCSS", color: "bg-teal-500/15 text-teal-300 border-teal-400/30" },
    { name: "Node.js", color: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
    { name: "MongoDB", color: "bg-green-500/15 text-green-300 border-green-400/30" },
    { name: "Rest APIs", color: "bg-violet-500/15 text-violet-300 border-violet-400/30" },
    { name: "AWS EC2", color: "bg-yellow-500/15 text-yellow-300 border-yellow-400/30" },
  ];

  const hrmsTech = [
    { name: "Next.js", color: "bg-sky-500/15 text-sky-300 border-sky-400/30" },
    { name: "Node.js", color: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
    { name: "MongoDB", color: "bg-indigo-500/15 text-indigo-300 border-indigo-400/30" },
    { name: "TailwindCSS", color: "bg-teal-500/15 text-teal-300 border-teal-400/30" },
    { name: "REST API", color: "bg-orange-500/15 text-orange-300 border-orange-400/30" },
    { name: "AWS EC2", color: "bg-yellow-500/15 text-yellow-300 border-yellow-400/30" },
  ];

  const aiMedicalTech = [
    { name: "React", color: "bg-sky-500/15 text-sky-300 border-sky-400/30" },
    { name: "OpenAI API", color: "bg-violet-500/15 text-violet-300 border-violet-400/30" },
    { name: "Node.js", color: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
    { name: "MongoDB", color: "bg-green-500/15 text-green-300 border-green-400/30" },
    { name: "WebSockets", color: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30" },
    { name: "AWS S3", color: "bg-yellow-500/15 text-yellow-300 border-yellow-400/30" },
  ];

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, aiMedicalRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="px-4 md:px-8 lg:px-12 mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Projects</h1>
          <p className="text-white-50 md:text-lg mt-2">A selection of products and apps I've designed and built with a focus on reliability, performance, and user experience.</p>
        </div>
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <div className="image-wrapper relative overflow-hidden group">
              <img src="/images/heroo.png" alt="Ryde App Interface" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <a href="#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm">
                  <ExternalLink size={16} />
                  <span>View Project</span>
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm">
                  <Github size={16} />
                  <span>View Code</span>
                </a>
              </div>
            </div>
            <div className="text-content">
              <h2>QR-based ordering system</h2>
              <p className="text-white-50 md:text-xl">
                Qruzine is a comprehensive QR-based ordering platform that transforms the dining experience. Built for enterprise-scale reliability, it enables seamless menu browsing, real-time order placement, secure payment processing, and kitchen management—all through a simple QR code scan. The system streamlines restaurant operations while delivering an intuitive, contactless experience for customers.
              </p>
              <div className="flex flex-col gap-2 mt-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                  <p className="text-sm text-white-50">Used by 10+ restaurants</p>
                </div>
              
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                  <p className="text-sm text-white-50">Serving 500+ customers daily</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {qruzineTech.map((t) => (
                  <div key={t.name} className={`text-xs px-2 py-1 rounded-md border ${t.color}`}>
                    {t.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper bg-gradient-to-br from-cyan-100 via-white to-orange-100 relative overflow-hidden group">
                <img
                  src="/images/shrm.png"
                  alt="Library Management Platform"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a href="#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm">
                    <ExternalLink size={16} />
                    <span>View Project</span>
                  </a>
                  <a href="#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm">
                    <Github size={16} />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
              <h2>Systematic Human Resource Management System</h2>
              <p className="text-white-50 md:text-sm">
                An end-to-end HRMS focused on streamlined workflows, accurate data, and team productivity across hiring, onboarding, and performance.
              </p>
              <div className="flex items-center gap-2 mt-2 mb-3">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                <p className="text-xs text-white-50">Used by 2 organizations managing 200+ employees</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {hrmsTech.map((t) => (
                  <div key={t.name} className={`text-xs px-2 py-1 rounded-md border ${t.color}`}>
                    {t.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="project" ref={aiMedicalRef}>
              <div className="image-wrapper bg-[#E8F5E9] relative overflow-hidden group">
                <img src="/images/ai.png" alt="AI Medical Documentation System" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a href="#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm">
                    <ExternalLink size={16} />
                    <span>View Project</span>
                  </a>
                  <a href="#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm">
                    <Github size={16} />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
              <h2>AI Medical Documentation System</h2>
              <p className="text-white-50 md:text-sm">
                An intelligent documentation tool for doctors to record patient conversations and automatically generate summaries using OpenAI, streamlining clinical workflows.
              </p>
              <div className="flex items-center gap-2 mt-2 mb-3">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                <p className="text-xs text-white-50">Used by 5+ doctors with 100+ patient consultations recorded</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {aiMedicalTech.map((t) => (
                  <div key={t.name} className={`text-xs px-2 py-1 rounded-md border ${t.color}`}>
                    {t.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;