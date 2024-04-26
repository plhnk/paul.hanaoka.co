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
    <Card className="bg-transparent overflow-visible relative -z-20 text-left">
      <CardContent className="">
        <div className="iso relative -z-10 group-hover:rotate-0">
          <img
            className=" rounded-xl"
            src={imageUrl}
            alt={title + ' ' + subtitle}
          />
        </div>
        <div className="shadow" />
      </CardContent>
      <CardHeader>
        <CardTitle className="normal-case mb-2 *:block *:font-normal">
          <span>{label}</span>
          <span>{title}</span>
          <span>{subtitle}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ProjectCard;
