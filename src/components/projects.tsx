import CustomLink from '@/components/ui/link';
import ProjectsClient from '@/components/projects-client';
import ProjectCard from '@/components/ui/projectcard';
import {
  getProjectCoverSources,
  getPublishedProjects,
} from '@/server/content/projects';

type ProjectsProps = {
  className?: string;
  variant: 'random' | 'all' | 'next';
};

function getDailyRandomProjectId(projectIds: string[]): string | null {
  if (projectIds.length === 0) {
    return null;
  }

  const dayKey = new Date().toISOString().slice(0, 10);
  const seed = Array.from(dayKey).reduce(
    (total, character) => total + character.charCodeAt(0),
    0
  );

  return projectIds[seed % projectIds.length];
}

const Projects = ({ className, variant }: ProjectsProps) => {
  const projects = getPublishedProjects().map((project) => ({
    ...project,
    cover: getProjectCoverSources(project.id),
  }));

  if (variant === 'random' || variant === 'next') {
    return (
      <ProjectsClient
        className={className}
        initialProjectId={
          variant === 'random'
            ? getDailyRandomProjectId(projects.map((project) => project.id))
            : projects[0]?.id ?? null
        }
        projects={projects}
        variant={variant}
      />
    );
  }

  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 ${className ?? ''}`}
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
          <CustomLink
            href={`/projects/${project.id}`}
            className="group mt-8 lg:col-start-2 col-span-3 lg:col-span-5"
          >
            <ProjectCard
              className="h-full"
              cover={project.cover}
              labels={project.labels}
              subtitle={project.subtitle}
              title={project.title}
            />
          </CustomLink>
        </li>
      ))}
    </ul>
  );
};

export default Projects;
