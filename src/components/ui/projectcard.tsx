import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
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

  const checkImageExists = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  useEffect(() => {
    const loadImage = async () => {
      const currentTheme = theme === 'system' ? systemTheme : theme;
      const baseSrc = `/projects/${id}/cover-${currentTheme}`;
      const extensions = ['jpg', 'png', 'webp'];

      for (const ext of extensions) {
        const src = `${baseSrc}.${ext}`;
        const exists = await checkImageExists(src);
        if (exists) {
          setImageSrc(src);
          return;
        }
      }

      setImageSrc('/images/dank-guy.png');
    };

    loadImage();
  }, [theme, systemTheme, id]);

  return (
    <Card className="max-sm:outline-none m-0 px-0 py-4 bg-transparent group-hover:shadow-elevate group-hover:-translate-y-1 transition-transform duration-75 ease-in-out overflow-visible relative -z-20 text-left">
      <CardContent className="sm:py-0 px-0">
        <div className="iso relative -z-10 group-hover:rotate-0 after:shadow-bgBlend after:w-full after:h-full after:absolute after:top-0 after:left-0 dark:after:mix-blend-normal after:mix-blend-color">
          {imageSrc && (
            <Image
              className="rounded-sm"
              src={imageSrc}
              alt={`${title} ${subtitle}`}
              width={900}
              height={600}
            />
          )}
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
