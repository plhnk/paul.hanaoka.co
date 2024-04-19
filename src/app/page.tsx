/* eslint-disable @next/next/no-img-element */
import DashboardCard from './components/ui/dashboardcard';
import Calendar from './widgets/calendar';
import Weather from './widgets/weather';

export default function Home() {
  return (
    <div className="grid gap-4 grid-cols-1 grid-rows-auto sm:grid-cols-4 sm:grid-rows-3 mt-[30%]">
      <Calendar />
      <Weather />
      <DashboardCard
        fullScreen
        className="row-span-3 col-span-1 sm:col-span-2"
        content={
          <img
            className="w-full h-[380px] object-cover "
            src="https://images.unsplash.com/photo-1580106815415-1d1a768d27cc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={''}
          />
        }
      />
      <DashboardCard
        className="col-span-1 sm:col-span-2"
        title="Proverb of the day"
        content="There is a way that seems right to a man, but it’s end is the way to
      death."
      />
    </div>
  );
}
