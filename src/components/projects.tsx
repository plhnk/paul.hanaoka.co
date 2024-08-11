'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProjectCard from '@/components/ui/projectcard';
import projectsData from '@/lib/data/projects.json';
import { Skeleton } from './ui/skeleton';
import CustomLink from '@/components/ui/link';
import { PartyPopper } from 'lucide-react';

type Project = {
  id: string;
  labels: string[];
  title: string;
  subtitle: string;
  publish: boolean;
  prototypeUrl: string;
};

type ProjectsProps = {
  className?: string;
  variant: 'random' | 'all' | 'next';
};

const Projects: React.FC<ProjectsProps> = ({ className, variant }) => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [viewedProjects, setViewedProjects] = useState<string[]>([]);
  const [clickDisabled, setClickDisabled] = useState(false);
  const params = useParams();
  const currentProjectId = params?.projectId as string | undefined;

  const ThankYou = (
    <section className="flex flex-col gap-4 w-96 my-40 md:col-start-2">
      <PartyPopper />
      <h2 className="">Thanks for checking out all of my projects!</h2>
      <p>
        Hit <kbd>M</kbd> to email me and let me know how I can help.
      </p>
    </section>
  );

  useEffect(() => {
    setTimeout(() => {
      const publishedProjects = projectsData.filter(
        (project) => project.publish
      );
      setProjects(publishedProjects);
      setLoading(false);
    }, 150);
  }, []);

  useEffect(() => {
    const storedViewedProjects = sessionStorage.getItem('viewedProjects');
    if (storedViewedProjects) {
      setViewedProjects(JSON.parse(storedViewedProjects));
    }
  }, []);

  useEffect(() => {
    if (viewedProjects.length > 0) {
      sessionStorage.setItem('viewedProjects', JSON.stringify(viewedProjects));
    }
  }, [viewedProjects]);

  const getNextProject = () => {
    const unviewedProjects = projects.filter(
      (project) =>
        !viewedProjects.includes(project.id) && project.id !== currentProjectId
    );

    if (unviewedProjects.length > 0) {
      return unviewedProjects[0];
    }

    // If all projects have been viewed, return null to trigger the Thank You message
    return null;
  };

  const getRandomUnviewedProject = () => {
    const unviewedProjects = projects.filter(
      (project) =>
        !viewedProjects.includes(project.id) && project.id !== currentProjectId
    );
    if (unviewedProjects.length > 0) {
      return unviewedProjects[
        Math.floor(Math.random() * unviewedProjects.length)
      ];
    }
    // If all projects have been viewed, select a random project that's not the current one
    const otherProjects = projects.filter(
      (project) => project.id !== currentProjectId
    );
    return otherProjects.length > 0
      ? otherProjects[Math.floor(Math.random() * otherProjects.length)]
      : null;
  };

  const handleProjectClick = (projectId: string) => {
    if (!clickDisabled) {
      setViewedProjects((prev) => [...new Set([...prev, projectId])]);
      setClickDisabled(true);  // Disable further clicks until navigation completes
    }
  };

  const renderProjectCard = (project: Project) => (
    <CustomLink
      href={'/projects/' + project.id}
      className="group mt-8 lg:col-start-2 col-span-3 lg:col-span-5"
      onClick={() => handleProjectClick(project.id)}
    >
      {variant === 'next' && (
        <span className="small-caps mb-4 block">Next Project</span>
      )}
      <ProjectCard
        className={`${variant === 'all' ? 'h-full' : ''}`}
        id={project.id}
        labels={project.labels}
        title={project.title}
        subtitle={project.subtitle}
      />
    </CustomLink>
  );

  if (loading) {
    return (
      <div className="flex flex-col col-span-7 my-24">
        <div className="flex flex-col w-full space-y-8">
          <Skeleton className="ml-8 h-96 w-5/6 rounded-xl iso relative -z-10" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-2/6" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'random') {
    const randomProject = getRandomUnviewedProject();
    return randomProject ? renderProjectCard(randomProject) : ThankYou;
  }

  if (variant === 'next') {
    const nextProject = getNextProject();
    return nextProject ? renderProjectCard(nextProject) : ThankYou;
  }

  if (variant === 'all') {
    return (
      <ul
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 ${className}`}
      >
        {projects.map((project, index) => (
          <li
            key={project.id}
            className={
              index % 4 === 0
                ? 'col-span-full md:col-span-4'
                : index % 4 === 1
                ? 'col-span-full md:col-span-2 lg:col-span-3'
                : index % 4 === 2
                ? 'col-span-full md:col-span-2 lg:col-span-3'
                : 'col-span-full md:col-span-4'
            }
          >
            {renderProjectCard(project)}
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

export default Projects;
