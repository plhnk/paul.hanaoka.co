'use-client';
import DashboardCard from '../components/ui/dashboardcard';
import { getDateInfo, pluralize } from '@/lib/utils';

const { year, month, today, dayOfWeek, dayOfWeekNo, daysLeft } = getDateInfo();

const visualizeDay = (
  <ul className="flex w-full justify-between mb-2">
    {Array.from({ length: 7 }, (_, index) => (
      <li
        key={index}
        className={`h-3 w-3 rounded-full ${
          index === dayOfWeekNo ? 'bg-text/60' : 'bg-text/20'
        }`}
      ></li>
    ))}
  </ul>
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
        extraInfo={daysLeft + ' day' + pluralize(daysLeft) + ' left in ' + year}
        graphic={visualizeDay}
        graphicInfo={dayOfWeek}
      />
    </>
  );
}
