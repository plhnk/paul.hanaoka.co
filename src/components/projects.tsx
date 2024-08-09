'use client';
import React, { useEffect, useState } from 'react';
import ProjectCard from '@/components/ui/projectcard';
import projectsData from '@/lib/data/projects.json';
import { Skeleton } from './ui/skeleton';
import Link from '@/components/ui/link';
import { Button } from './ui/button';
import ProjectDialog from './ui/projectdialog';

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

  useEffect(() => {
    setTimeout(() => {
      setProjects(projectsData);
      setLoading(false);
    }, 150);
  }, []);

  useEffect(() => {
    const storedViewedProjects = localStorage.getItem('viewedProjects');
    if (storedViewedProjects) {
      setViewedProjects(JSON.parse(storedViewedProjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('viewedProjects', JSON.stringify(viewedProjects));
  }, [viewedProjects]);

  const getNextProject = () => {
    const unviewedProjects = projects.filter(project => !viewedProjects.includes(project.id));
    return unviewedProjects.length > 0 ? unviewedProjects[0] : null;
  };

  const renderProjectCard = (project: Project) => (
    <Link href={'/projects/' + project.id}>
      <ProjectCard
        id={project.id}
        labels={project.labels}
        title={project.title}
        subtitle={project.subtitle}
        className={className}
      />
    </Link>
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
    const randomProject = projects[Math.floor(Math.random() * projects.length)];
    return randomProject ? renderProjectCard(randomProject) : <div>Contact me</div>;
  }

  if (variant === 'next') {
    const nextProject = getNextProject();
    if (nextProject) {
      setViewedProjects(prev => [...prev, nextProject.id]);
      return renderProjectCard(nextProject);
    }
    return <div>Contact me</div>;
  }

  if (variant === 'all') {
    return (
      <ul className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {projects.map(project => (
          <li key={project.id}>
            {renderProjectCard(project)}
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

export default Projects;
