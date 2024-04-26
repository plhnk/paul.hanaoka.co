'use client';
import React, { useEffect, useState } from 'react';

import ProjectDialog from '@/components/ui/projectdialog';
import ProjectCard from '@/components/ui/projectcard';
import projectsData from '@/lib/data/projects.json';

const Projects: React.FC = () => {
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
    <ul className='main-content' >
      {projects.map((project) => (
        <li className="group col-span-3 md:col-span-7 lg:col-span-5 md:col-start-1 lg:col-start-2 my-24" key={project.id}>
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
