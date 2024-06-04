'use client';
import DashboardCard from '../../components/ui/dashboardcard';
import { getDateInfo, pluralize } from '@/lib/utils';

const {
  year,
  month,
  today,
  dayOfWeek,
  dayOfWeekNo,
  daysLeft,
  percentageOfYearPassed,
} = getDateInfo();

const visualizeDay = (
  <ul className="flex w-full justify-between mb-2">
    {Array.from({ length: 7 }, (_, index) => (
      <li
        key={index}
        className={`h-8 w-1 rounded-full ${
          index === dayOfWeekNo ? 'bg-text/30' : 'bg-text/10'
        }`}
      ></li>
    ))}
  </ul>
);

const visualizeYear = (
  <div className="w-[calc(100%_+_.5rem)] h-8 bg-text/10 rounded-md p-1 -ml-1 mb-2">
    <div
      style={{ width: percentageOfYearPassed + '%' }}
      className="h-full bg-card rounded-sm"
    ></div>
  </div>
);

interface CalendarProps {
  className?: string;
}

export default function Calendar(props: CalendarProps) {
  const { className } = props;

  return (
    <>
      <DashboardCard
        className={className}
        title={month}
        importantNumber={today}
        extraInfo={dayOfWeek}
        graphic={visualizeYear}
        graphicInfo={
          daysLeft + ' day' + pluralize(daysLeft) + ' left in ' + year
        }
      />
    </>
  );
}
