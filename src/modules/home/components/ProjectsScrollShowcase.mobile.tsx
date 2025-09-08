"use client";

import React from "react";
import { motion } from "framer-motion";
import { Project } from "./ProjectsScrollShowcase";

interface MobileProjectCardProps {
  project: Project;
}

function MobileProjectCard({ project }: MobileProjectCardProps) {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-violet-700/25 via-violet-500/10 to-transparent mb-8"
      >
        <div className="p-5">
          <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
          <p className="text-white/70 text-sm mb-4">{project.blurb}</p>
          
          {project.video ? (
            <div className="relative rounded-xl overflow-hidden mb-4">
              <video
                muted
                playsInline
                controls
                className="w-full rounded-lg"
              >
                <source src={project.video} type="video/mp4" />
              </video>
            </div>
          ) : (
            <div className="aspect-video bg-black/20 rounded-lg mb-4 flex items-center justify-center text-white/50">
              No preview available
            </div>
          )}

          {project.points?.length ? (
            <div className="space-y-2 mb-4">
              {project.points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="inline-block mt-1.5 h-1.5 w-1.5 rounded-full bg-white/70 flex-shrink-0" />
                  <span className="text-sm text-white/80">{point}</span>
                </div>
              ))}
            </div>
          ) : null}

          {project.tags?.length ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="flex gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 px-4 rounded-full bg-white text-neutral-900 text-sm font-medium"
              >
                Visit ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function MobileProjectsShowcase({ projects }: { projects: Project[] }) {
  return (
    <div className="px-4 py-8">
      <div className="space-y-6 max-w-2xl mx-auto">
        {projects.map((project) => (
          <MobileProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}
