'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      className={cn(
        'w-full min-h-fit flex-row sm:flex-col outline-background/40 lg:px-4',
        className
      )}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className='pb-4 sm:pb-0'>
          <div className="hidden sm:blocksmall-caps">{title}</div>
          <div className="text-7xl lg:text-9xl !leading-normal -mb-4 font-thin tracking-tighter font-mono -ml-1 text-text">
            {importantNumber}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-0 sm:pl-4 sm:pt-0">
        <div className="sm:hidden small-caps">{title}</div>
        {extraInfo}
        {content}
      </CardContent>
    </Card>
  );
};
export default ImpactCard;
