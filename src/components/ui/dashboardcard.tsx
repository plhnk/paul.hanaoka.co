'use client';
/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DashboardCardProps } from '../../lib/utilities/types';
import { cn } from '../../lib/utils';

const DashboardCard: React.FC<DashboardCardProps> = ({
  className,
  content,
  extraInfo,
  graphic,
  graphicInfo,
  importantNumber,
  title,
  onClick,
}) => {
  return (
    <Card
      className={cn(
        'w-full min-h-fit max-h-72 outline-background/40',
        className
      )}
      onClick={onClick}
    >
      <CardHeader className={title ? '' : 'hidden'}>
        <CardTitle>
          <div className="text-sm mb-0 text-text/40 font-semibold uppercase leading-tight tracking-[.12em] h-8">
            {title}
          </div>
          {importantNumber && (
            <div className="text-[4rem] -mb-4 font-thin tracking-tighter font-mono -ml-1 text-text">
              {importantNumber}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="sm:py-0">
        {extraInfo}
        {content}
      </CardContent>
      <CardFooter className={graphic ? '' : 'hidden'}>
        {graphic}
        <span>{graphicInfo}</span>
      </CardFooter>
    </Card>
  );
};
export default DashboardCard;
