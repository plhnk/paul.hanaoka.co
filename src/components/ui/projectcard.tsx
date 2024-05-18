import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import ProgressiveBlur from './progressiveblur';
import { useTheme } from 'next-themes';

interface ProjectCardProps {
  id: string;
  labels: string[];
  title: string;
  subtitle: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  labels,
  title,
  subtitle,
}) => {
  const { theme, systemTheme } = useTheme();
  const [imageSrc, setImageSrc] = useState('');
  // <string>(`/projects/${id}/cover-${theme}.jpg`);

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setImageSrc(`/projects/${id}/cover-${currentTheme}.jpg`);
  }, [theme, systemTheme, id]);

  // NB --> projects need to be in public/$id with cover-$themes.jpg  

  return (
    <Card className="m-0 p-0 bg-transparent group-hover:shadow-elevate group-hover:-translate-y-1 transition-transform duration-75 ease-in-out overflow-visible relative -z-20 text-left">
      <CardContent className="px-0">
        <div className="iso relative -z-10 group-hover:rotate-0 after:shadow-bgBlend after:w-full after:h-full after:absolute after:top-0 after:left-0 dark:after:mix-blend-normal after:mix-blend-color">
          <Image
            className="rounded-sm"
            src={imageSrc}
            alt={title + ' ' + subtitle}
            width={900}
            height={600}
          />
          {/* <ProgressiveBlur className="group-hover:invisible absolute -bottom-48 -right-48 rotate-[-45deg] w-[30rem] h-[30rem]" />
          <ProgressiveBlur className="group-hover:invisible absolute -top-48 -left-48 rotate-[135deg] w-[30rem] h-[30rem]" /> */}
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
