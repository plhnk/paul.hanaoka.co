'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ImpactCardProps } from '../../lib/utilities/types';
import { cn } from '../../lib/utils';

const ImpactCard: React.FC<ImpactCardProps> = ({
  className,
  content,
  extraInfo,
  indicator,
  importantNumber,
  title,
  onClick,
}) => {
  return (
    <Card
      className={cn('w-full min-h-fit outline-background/40 px-4', className)}
      onClick={onClick}
    >
      <CardHeader className={title ? '' : 'hidden'}>
        <CardTitle>
          <div className="small-caps">
            {title}
          </div>
          <div className="text-[8rem] -mb-4 font-thin tracking-tighter font-mono -ml-1 text-text">
            {importantNumber}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="sm:pt-0">
        {extraInfo}
        {content}
      </CardContent>
    </Card>
  );
};
export default ImpactCard;
