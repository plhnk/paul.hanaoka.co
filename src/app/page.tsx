import Calendar from '../components/widgets/calendar';
import Weather from '../components/widgets/weather';
import Projects from '@/components/projects';

export default function Home() {
  return (
    <>
      {/* first div is the main content */}
      <div className="main-content h-fit">
        <Projects />
      </div>
      {/* the 2nd div is the sidebar */}
      <div className="sidebar">
        <Calendar className="col-span-2" />
        <Weather className="col-span-2" />
        {/* <Proverbs/> */}
      </div>
    </>
  );
}

// TODO --> extract grids into tailwind for easier re-use (main, sidebar)

// grid sticky top-0 items-stretch sm:flex sm:flex-col grid-cols-2 row-span-2 sm:grid-cols-1 gap-4 sm:gap-8 mb-8
