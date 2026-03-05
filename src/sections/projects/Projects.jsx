import React, { useState, useRef, useEffect } from "react";
import useNetworkAnimation from "../../hooks/useNetworkAnimation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Github,
  Sparkles,
  Filter,
  Grid3x3,
  LayoutGrid,
  ChevronRight,
  Code2,
  Brain,
  Globe,
  Star,
} from "lucide-react";
import SectionHeading from "../../components/ui/SectionHeading";
import ProjectCard from "../../components/cards/ProjectCard";

// Import project images
import agricultureImage from "../../assets/agri.png";
import ganImage from "../../assets/inpaint.png";
import idsImage from "../../assets/ids.png";

const Projects = () => {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const projects = [
    {
      title: "Agriculture AI Platform",
      description:
        "AI-powered agriculture platform using Generative AI for crop insights and ML-driven recommendations.",
      tech: ["Next.js", "Django", "OpenAI", "PostgreSQL"],
      category: "ai",
      github: "https://github.com/likithsurya23/agriculture",
      demo: "https://agriculture---ai.vercel.app",
      featured: true,
      image: agricultureImage,
    },
    {
      title: "Image Inpainting Using GAN",
      description:
        "Deep learning-based image restoration system using GAN.",
      tech: ["PyTorch", "GAN", "React", "Django REST"],
      category: "ai",
      github:
        "https://github.com/likithsurya23/Image_Inpainting_Using_GAN",
      demo: "https://image-inpainting-using-gan.vercel.app",
      featured: true,
      image: ganImage,
    },
    {
      title: "Hybrid CNN-ConvNeXt IDS",
      description:
        "Optimized edge-based intrusion detection system for IoT networks.",
      tech: ["PyTorch", "Django", "IoT", "Edge AI"],
      category: "ai",
      github:
        "https://github.com/likithsurya23/Lightweight_Hybrid_CNN_And_ConvNeXt-Tiny_IDS_for_IoT_Networks",
      demo:
        "https://lightweight-hybrid-cnn-and-conv-ne.vercel.app",
      image: idsImage,
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  // Network animation with interconnected moving points
  useNetworkAnimation(canvasRef, {
    numPoints: 20,
    velocity: 0.2,
    radiusBase: 1.5,
    radiusVar: 2.5,
    opacityMult: 0.6,
    strokeDark: 'rgba(255, 255, 255, 0.1)',
    strokeLight: 'rgba(0, 0, 0, 0.08)',
  });

  return (
    <section
      id="projects"
      className="py-20 sm:py-24 lg:py-32 relative overflow-hidden bg-white dark:bg-black transition-colors duration-500"
    >
      {/* Canvas for interconnected points animation - Same as Hero.jsx */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Subtle gradient overlays for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30 dark:from-black/30 dark:via-transparent dark:to-black/30 pointer-events-none z-[5]" />

      {/* Simple Border Decoration */}
      <div className="absolute inset-0 pointer-events-none z-[5]">
        <div className="absolute top-0 left-0 right-0 h-px bg-black/10 dark:bg-white/10" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10 dark:bg-white/10" />
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        ref={ref}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading subtitle="Featured Work">
            <span className="flex items-center gap-3 justify-center">
              Projects
              <Sparkles className="w-5 h-5 text-black/40 dark:text-white/60" />
            </span>
          </SectionHeading>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-10 mb-12">
          {/* View Mode */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`p-2 rounded-lg border-2 transition-all ${viewMode === "grid"
                ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                : "bg-white dark:bg-black text-black dark:text-white border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white"
                }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("compact")}
              aria-label="Compact view"
              className={`p-2 rounded-lg border-2 transition-all ${viewMode === "compact"
                ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                : "bg-white dark:bg-black text-black dark:text-white border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white"
                }`}
            >
              <Grid3x3 size={18} />
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter + viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid grid-cols-1 ${viewMode === "grid"
              ? "sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8"
              : "sm:grid-cols-2 lg:grid-cols-3 gap-5"
              }`}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tech={project.tech}
                github={project.github}
                demo={project.demo}
                featured={project.featured}
                image={project.image}
                index={index}
                compact={viewMode === "compact"}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-black/20 dark:border-white/20 bg-white/90 dark:bg-black/90 backdrop-blur-sm mb-4">
              <Filter className="w-8 h-8 text-black/40 dark:text-white/40" />
            </div>
            <h3 className="text-xl font-medium text-black dark:text-white mb-2">No projects found</h3>
            <p className="text-black/60 dark:text-white/60">Try selecting a different category</p>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
          {[
            { label: "Total Projects", value: "10+", icon: Code2 },
            { label: "AI/ML", value: "6+", icon: Brain },
            { label: "Stars", value: "124+", icon: Star },
            { label: "Live Demos", value: "5+", icon: Globe },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 sm:p-6 text-center border-2 border-black/20 dark:border-white/20 bg-white/90 dark:bg-black/90 backdrop-blur-sm hover:border-black dark:hover:border-white transition-all hover:-translate-y-1"
            >
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-black/40 dark:text-white/40 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-black dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-black/50 dark:text-white/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <a
            href="https://github.com/likithsurya23"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-black/20 dark:border-white/20 bg-white/90 dark:bg-black/90 backdrop-blur-sm text-black dark:text-white hover:border-black dark:hover:border-white transition-all group"
          >
            <Github size={18} className="text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white" />
            <span className="text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white">View More on GitHub</span>
            <ChevronRight size={16} className="text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Gradient Fades - Kept for clean edges */}
      <div className="absolute top-0 left-0 right-0 h-24 sm:h-40 bg-gradient-to-b from-white dark:from-black to-transparent pointer-events-none z-[5]" />
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-40 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none z-[5]" />
    </section>
  );
};

export default Projects;
