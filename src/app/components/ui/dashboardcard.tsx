'use client';
/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DashboardCardProps } from '../../utilities/types';

const date = new Date();
const today = date.getTime();

const DashboardCard: React.FC<DashboardCardProps> = ({
  className,
  content,
  extraInfo,
  graphic,
  graphicInfo,
  importantNumber,
  title,
  fullScreen,
}) => {
  return (
    <Card className={className}>
      <CardHeader className={title ? 'pb-0' : 'hidden'}>
        <CardTitle>
          <div>{title}</div>
          <div className="text-[4rem]">{importantNumber}</div>
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
