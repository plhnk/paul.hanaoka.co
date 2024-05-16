import Photos from '@/components/widgets/photos';
import Calendar from '../components/widgets/calendar';
import Weather from '../components/widgets/weather';
import Projects from '@/components/projects';

export default function Home() {
  return (
    <>
      {/* first div is the main content */}
        <Projects className='2xl:col-start-2' />
      {/* the 2nd div is the sidebar */}
      <div className="sidebar">
        <Calendar className="col-span-2" />
        <Weather className="col-span-2" />
        <Photos className='col-span-4 sm:col-span-2 h-[80vh] sm:max-h-96 mt-4 sm:mt-0' />
      </div>
    </>
  );
}

// TODO --> photos height is wonky on desktop --> weather height ? something w/grid need to troubleshoot
// TODO --> have placeholders while Projects loads
