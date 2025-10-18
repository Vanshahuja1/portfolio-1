"use client"
import React from "react";
import { motion } from "framer-motion";
import { FaJs, FaReact, FaNodeJs, FaDatabase , FaHtml5} from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiNextdotjs, SiTensorflow, SiFramer, SiDocker,SiAwsamplify } from "react-icons/si";

import { TbApi } from "react-icons/tb";

const skills = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-600" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "React.js", icon: <FaReact className="text-cyan-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
  { name: "SQL", icon: <FaDatabase className="text-blue-400" /> },
  { name: "Framer Motion", icon: <SiFramer className="text-pink-500" /> },
  { name: "Docker", icon: <SiDocker className="text-blue-400" /> },
  { name: "AWS", icon: <SiAwsamplify className="text-orange-400" /> },
  { name: "REST APIs", icon: <TbApi className="text-green-400" /> },
];

export const Skills = () => {
    
  return (
    <div id = "Skills" className="bg-black text-white py-12">
      
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">My Skills</h2>
        <p className="text-center text-lg text-gray-400 mb-12">
          A showcase of my technical expertise and tools I work with.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 ">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="text-5xl">{skill.icon}</div>
              <p className="text-xl font-medium">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
