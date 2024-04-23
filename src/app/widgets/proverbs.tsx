'use-client';
import DashboardCard from '../components/ui/dashboardcard';
import { getDateInfo, pluralize } from '@/lib/utils';

const { today } = getDateInfo();


interface ProverbsProps {
  className?: string;
}

export default function Proverbs(props: ProverbsProps) {
  const { className } = props;

  return (
    <>
      <DashboardCard
        className={className}
        title='Daily Proverb'
        extraInfo='proverb'
      />
    </>
  );
}
