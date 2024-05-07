import Photos from '@/components/widgets/photos';
import Calendar from '../components/widgets/calendar';
import Weather from '../components/widgets/weather';
import Projects from '@/components/projects';

export default function Home() {
  return (
    <>
      {/* first div is the main content */}
      {/* <div className="main-content h-fit">
      </div> */}
        <Projects className='2xl:col-start-2' />
      {/* the 2nd div is the sidebar */}
      <div className="sidebar">
        <Calendar className="col-span-2" />
        <Weather className="col-span-2" />
        <Photos className='col-span-4 sm:col-span-2 h-[80vh] mt-4 sm:mt-0 sm:h-full' />
        {/* <Proverbs/> */}
      </div>
    </>
  );
}

// TODO --> extract grids into tailwind for easier re-use (main, sidebar)

// grid sticky top-0 items-stretch sm:flex sm:flex-col grid-cols-2 row-span-2 sm:grid-cols-1 gap-4 sm:gap-8 mb-8

// TODO --> photos height is wonky on desktop --> weather height ? something w/grid need to troubleshoot