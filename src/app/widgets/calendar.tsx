'use-client';
import DashboardCard from '../components/ui/dashboardcard';

const date = new Date();
const year = date.toLocaleDateString('en-US', { year: 'numeric' });
const month = date.toLocaleDateString('en-US', { month: 'long' });
const today = date.toLocaleDateString('en-US', { day: 'numeric' });
const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
const dayOfWeekNo = date.getDay();
const remainingDays =
  new Date(date.getFullYear(), 11, 31).getTime() - date.getTime();
const daysLeft = Math.ceil(remainingDays / (1000 * 60 * 60 * 24));
const pluralize = (input: number): string => {
  if (input === 1) {
    return '';
  } else {
    return 's';
  }
};

const visualizeDay = (
  <ul className='flex w-full justify-between mb-2'>
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

export default function Calendar() {
  return (
    <>
      <DashboardCard
        className="row-span-2"
        title={month}
        importantNumber={today}
        extraInfo={daysLeft + ' day' + pluralize(daysLeft) + ' left in ' + year}
        graphic={visualizeDay}
        graphicInfo={dayOfWeek}
      />
    </>
  );
}
