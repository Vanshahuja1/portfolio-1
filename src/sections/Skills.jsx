"use client"
import React from "react";
import { motion } from "framer-motion";
import { FaJs, FaReact, FaNodeJs, FaDatabase , FaHtml5, FaGitAlt} from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiNextdotjs, SiTensorflow, SiFramer, SiDocker,SiAwsamplify, SiTypescript, SiGraphql, SiPrisma, SiPostgresql } from "react-icons/si";
import { TbApi } from "react-icons/tb";

const skills = [
  { name: "React.js", icon: <FaReact className="text-cyan-400" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "GraphQL", icon: <SiGraphql className="text-pink-600" /> },
  { name: "REST APIs", icon: <TbApi className="text-green-400" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-600" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
  { name: "Prisma ORM", icon: <SiPrisma className="text-cyan-600" /> },
  { name: "AWS", icon: <SiAwsamplify className="text-orange-400" /> },
  { name: "Docker", icon: <SiDocker className="text-blue-400" /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-500" /> },
  { name: "Framer Motion", icon: <SiFramer className="text-pink-500" /> },
  { name: "HTML5", icon: <FaHtml5 className="text-orange-600" /> },
];

export const Skills = () => {
    
  return (
    <div id = "Skills" className="bg-black text-white py-12">
      
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Technical Expertise</h2>
        <p className="text-center text-lg text-gray-400 mb-12">
          Building scalable solutions with modern technologies that drive innovation and deliver exceptional user experiences
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