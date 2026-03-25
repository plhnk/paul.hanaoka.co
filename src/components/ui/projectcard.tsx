import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  cover: {
    light: string;
    dark: string;
  };
  labels: string[];
  title: string;
  subtitle: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  cover,
  labels,
  title,
  subtitle,
  className
}) => {
  return (
    <Card className={cn('max-sm:outline-none m-0 px-0 py-4 bg-transparent overflow-visible relative isolate text-left', className)}>
      <CardContent className="sm:py-0 px-0 my-auto">
        <div className="iso relative -z-10 group-hover:rotate-0 after:shadow-bgBlend after:w-full after:h-full after:absolute after:top-0 after:left-0 dark:after:mix-blend-normal after:mix-blend-color">
          <Image
            className="rounded-sm dark:hidden elite:hidden exec:hidden"
            src={cover.light}
            alt={`${title} ${subtitle}`}
            width={900}
            height={600}
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 900px"
          />
          <Image
            className="rounded-sm hidden dark:block elite:block exec:block"
            src={cover.dark}
            alt={`${title} ${subtitle}`}
            width={900}
            height={600}
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 900px"
          />
        </div>
        <div className="shadow" />
      </CardContent>
      <CardHeader className="px-0">
        {labels && (
          <div className="flex mb-2 -ml-0.5">
            {labels.map((label, index) => (
              <div
                className="rounded-full text-nowrap mr-2 px-3 py-1 bg-card text-element text-xs uppercase tracking-wider"
                key={index}
              >
                {label}
              </div>
            ))}
          </div>
        )}
        <CardTitle className="normal-case mb-2 tracking-normal *:block *:font-normal">
          <span className="text-text text-base">{title}</span>
          <span className="text-text/60 text-base">{subtitle}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ProjectCard;
