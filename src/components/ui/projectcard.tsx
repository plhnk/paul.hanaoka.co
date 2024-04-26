import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectCardProps {
  label: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  label,
  title,
  subtitle,
  imageUrl,
}) => {
  return (
    <Card className="m-0 p-0 bg-transparent overflow-visible relative -z-20 text-left">
      <CardContent className="px-0">
        <div className="iso relative -z-10 group-hover:rotate-0">
          <img
            className=" rounded-sm"
            src={'/images/' + imageUrl}
            alt={title + ' ' + subtitle}
          />
        </div>
        <div className="shadow" />
      </CardContent>
      <CardHeader className='px-0'>
        <CardTitle className="normal-case mb-2 tracking-normal *:block *:font-normal">
          <span className='text-text/40 uppercase  leading-loose'>{label}</span>
          <span className='text-text text-base'>{title}</span>
          <span className='text-text/60 text-base'>{subtitle}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ProjectCard;
