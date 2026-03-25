import projectsData from '@/lib/data/projects.json';

export interface Project {
  id: string;
  labels: string[];
  title: string;
  subtitle: string;
  publish: boolean;
  prototypeUrl: string;
}

const coverExtensions: Record<string, 'jpg' | 'png'> = {
  quality: 'jpg',
  navigation: 'jpg',
  'translation-experience': 'png',
  hiring: 'jpg',
  insurance: 'jpg',
};

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getPublishedProjects(): Project[] {
  return getAllProjects().filter((project) => project.publish);
}

export function getProjectCoverSources(projectId: string): {
  light: string;
  dark: string;
} {
  const extension = coverExtensions[projectId] ?? 'jpg';

  return {
    light: `/projects/${projectId}/cover-light.${extension}`,
    dark: `/projects/${projectId}/cover-dark.${extension}`,
  };
}
