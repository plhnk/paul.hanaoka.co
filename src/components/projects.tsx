import React from 'react';

import ProjectDialog from '@/components/ui/projectdialog';
import ProjectCard from '@/components/ui/projectcard';

const Projects: React.FC<{ className?: string; projects: any[] }> = ({
  className,
  projects,
}) => {

  return (
    <ul
      className={`main-content overflow-x-clip [overflow-clip-margin:20px] sm:overflow-x-visible ${className}`}
    >
      {projects &&
        projects.map((project) => (
          <li
            className="group col-span-3 md:col-span-7 2xl:col-span-5 my-24"
            key={project.id}
          >
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
