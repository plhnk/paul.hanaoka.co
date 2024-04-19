/* eslint-disable @next/next/no-img-element */
import DashboardCard from './components/ui/dashboardcard';

const date = new Date();
const today = date.getTime();

export default function Home() {
  return (
    <div className="grid gap-4 grid-cols-4 grid-rows-3 mt-[30%]">
      <DashboardCard
        className="row-span-2"
        title={'April'}
        importantNumber={'16'}
        extraInfo={'259 days left in 2024'}
        graphic={'[dots]'}
        graphicInfo={'Tuesday'}
      />
      <DashboardCard
        className="row-span-2"
        title={'Bellingham, WA'}
        importantNumber={'41º'}
        extraInfo={'H:58º L:39º'}
        graphic={'[clear icon]'}
        graphicInfo={'Clear'}
      />
      <DashboardCard
        fullScreen
        className="row-span-3 col-span-2"
        content={
          <img
            className="w-full h-[380px] object-cover "
            src="https://images.unsplash.com/photo-1580106815415-1d1a768d27cc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={''}
          />
        }
      />
      <DashboardCard
        className="col-span-2"
        title="Proverb of the day"
        content="There is a way that seems right to a man, but it’s end is the way to
      death."
      />
    </div>
  );
}

// {/* <Billboard>
// </Billboard> */}
