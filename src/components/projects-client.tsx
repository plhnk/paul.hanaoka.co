'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { PartyPopper } from 'lucide-react';
import CustomLink from '@/components/ui/link';
import ProjectCard from '@/components/ui/projectcard';

interface ProjectWithCover {
  id: string;
  labels: string[];
  title: string;
  subtitle: string;
  cover: {
    light: string;
    dark: string;
  };
}

interface ProjectsClientProps {
  className?: string;
  initialProjectId: string | null;
  projects: ProjectWithCover[];
  variant: 'random' | 'next';
}

function getFallbackProject(
  projects: ProjectWithCover[],
  currentProjectId?: string
): ProjectWithCover | null {
  return (
    projects.find((project) => project.id !== currentProjectId) ??
    projects[0] ??
    null
  );
}

function getNextProject(
  projects: ProjectWithCover[],
  viewedProjects: string[],
  currentProjectId?: string
): ProjectWithCover | null {
  const unviewedProjects = projects.filter(
    (project) =>
      !viewedProjects.includes(project.id) && project.id !== currentProjectId
  );

  return unviewedProjects[0] ?? null;
}

function getRandomProject(
  projects: ProjectWithCover[],
  viewedProjects: string[],
  currentProjectId?: string
): ProjectWithCover | null {
  const unviewedProjects = projects.filter(
    (project) =>
      !viewedProjects.includes(project.id) && project.id !== currentProjectId
  );

  if (unviewedProjects.length === 0) {
    return getFallbackProject(projects, currentProjectId);
  }

  return unviewedProjects[Math.floor(Math.random() * unviewedProjects.length)];
}

export default function ProjectsClient({
  className,
  initialProjectId,
  projects,
  variant,
}: ProjectsClientProps) {
  const params = useParams();
  const currentProjectId = params?.projectId as string | undefined;
  const initialProject =
    projects.find((project) => project.id === initialProjectId) ??
    getFallbackProject(projects, currentProjectId);

  const [viewedProjects, setViewedProjects] = useState<string[]>([]);
  const [hasHydratedViewedProjects, setHasHydratedViewedProjects] =
    useState(false);

  useEffect(() => {
    const storedViewedProjects = sessionStorage.getItem('viewedProjects');

    if (storedViewedProjects) {
      setViewedProjects(JSON.parse(storedViewedProjects));
    }

    setHasHydratedViewedProjects(true);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('viewedProjects', JSON.stringify(viewedProjects));
  }, [viewedProjects]);

  const project = useMemo(() => {
    if (!hasHydratedViewedProjects) {
      return initialProject;
    }

    if (variant === 'next') {
      return (
        getNextProject(projects, viewedProjects, currentProjectId) ??
        getFallbackProject(projects, currentProjectId)
      );
    }

    return (
      getRandomProject(projects, viewedProjects, currentProjectId) ??
      getFallbackProject(projects, currentProjectId)
    );
  }, [
    currentProjectId,
    hasHydratedViewedProjects,
    initialProject,
    projects,
    variant,
    viewedProjects,
  ]);

  if (!project) {
    return (
      <section className="flex flex-col gap-4 w-96 my-40 md:col-start-2">
        <PartyPopper />
        <h2>Thanks for checking out all of my projects!</h2>
        <p>
          Hit <kbd>M</kbd> to email me and let me know how I can help.
        </p>
      </section>
    );
  }

  return (
    <CustomLink
      href={`/projects/${project.id}`}
      className={`group mt-8 lg:col-start-2 col-span-3 lg:col-span-5 ${className ?? ''}`}
      onClick={() =>
        setViewedProjects((prev) => [...new Set([...prev, project.id])])
      }
    >
      {variant === 'next' && (
        <span className="small-caps mb-4 block">Next Project</span>
      )}
      <ProjectCard
        cover={project.cover}
        labels={project.labels}
        subtitle={project.subtitle}
        title={project.title}
      />
    </CustomLink>
  );
}
