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

const DashboardCard: React.FC<DashboardCardProps> = ({
  className,
  content,
  extraInfo,
  graphic,
  graphicInfo,
  importantNumber,
  title,
  fullScreen,
  onClick,
}) => {
  return (
    <Card className={className} onClick={onClick}>
      <CardHeader className={title ? '' : 'hidden'}>
        <CardTitle>
          <div className="">{title}</div>
          <div
            className={
              importantNumber
                ? 'text-[4rem] font-thin tracking-tighter font-mono -ml-1 text-text'
                : 'mb-auto'
            }
          >
            {importantNumber}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className={fullScreen ? 'p-0' : ''}>
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
