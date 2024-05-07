'use client';
import React, { useEffect, useState } from 'react';

import ProjectDialog from '@/components/ui/projectdialog';
import ProjectCard from '@/components/ui/projectcard';
import projectsData from '@/lib/data/projects.json';

const Projects: React.FC<{ className?: string }> = ({ className }) => {
  const [projects, setProjects] = useState<
    {
      id: number;
      label: string;
      title: string;
      subtitle: string;
      image: string;
      prototypeUrl: string;
    }[]
  >([]);

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  return (
    <ul className={`main-content ${className}`}>
      {projects.map((project) => (
        <li className="group col-span-3 md:col-span-7 2xl:col-span-5 my-24" key={project.id}>
          <ProjectDialog content={project.prototypeUrl}>
            <ProjectCard
              label={project.label}
              title={project.title}
              subtitle={project.subtitle}
              imageUrl={project.image}
            />
          </ProjectDialog>
        </li>
      ))}
    </ul>
  );
};

export default Projects;
