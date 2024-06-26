'use client';
import React, { useEffect, useState } from 'react';
import ProjectCard from '@/components/ui/projectcard';
import projectsData from '@/lib/data/projects.json';
import { Skeleton } from './ui/skeleton';
import Link from '@/components/ui/link';
import { Button } from './ui/button';
import { toast } from 'sonner';
import ProjectDialog from './ui/projectdialog';

const Projects: React.FC<{ className?: string }> = ({ className }) => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<
    {
      id: string;
      labels: string[];
      title: string;
      subtitle: string;
      publish: boolean;
      prototypeUrl: string;
    }[]
  >([]);

  // simulate loading to give time for page to render
  useEffect(() => {
    setTimeout(() => {
      setProjects(projectsData);
      setLoading(false);
    }, 150);
  }, []);

  return (
    <ul
      className={`main-content overflow-x-clip [overflow-clip-margin:20px] sm:overflow-x-visible  ${className}`}
    >
      {/* TODO fix card overflow on mobile...try setting a size for the card (max?) and overflow visible? */}
      {loading ? ( // Render placeholder content if loading
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
      ) : (
        // Render actual project cards when data is loaded
        projects.map((project) => (
          <li
            className="group col-span-3 md:col-span-7 lg:col-span-5 my-24 relative"
            key={project.id}
          >
            {project.publish === false && (
              <div className="hidden items-center gap-4 flex-col backdrop-blur-sm justify-center group-hover:flex bg-background/80 rounded-2xl absolute w-full h-full top-0 left-0">
                <h3 className="font-semibold">Full write-up in progress!</h3>
                <p className="italic text-center">
                  In the meantime, click through a presentation optimized for a
                  larger screen
                </p>
                <ProjectDialog content={project.prototypeUrl}>
                  <Button className="w-48">View slides</Button>
                </ProjectDialog>
                <Button
                  asChild
                  className="w-48 mb-16"
                  variant="ghost"
                >
                  <a href="mailto:?subject=REMINDER%3A%20Look%20at%20this%20later!&body=Click%20through%20the%20case%20studies%20on%20https%3A%2F%2Fpaul.hanaoka.co%2Fprojects%20when%20I'm%20on%20a%20bigger%20screen">
                    Email yourself a reminder
                  </a>
                </Button>
              </div>
            )}
            <Link href={'/projects/' + project.id}>
              <ProjectCard
                id={project.id}
                labels={project.labels}
                title={project.title}
                subtitle={project.subtitle}
              />
            </Link>
          </li>
        ))
      )}
    </ul>
  );
};

export default Projects;
