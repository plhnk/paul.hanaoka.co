import Photos from '@/components/widgets/photos';
import Calendar from '../components/widgets/calendar';
import Weather from '../components/widgets/weather';
import Projects from '@/components/projects';

export default function Home() {
  return (
    <>
      <div className="defaultContainer row-span-1 md:max-lg:-mb-8">
        <h1 className='text-base mb-0'>Designer &amp; Developer </h1>
      </div>
      <Projects className="2xl:col-start-2 row-span-2" />
      <div className="sidebar row-span-3 lg:row-start-1">
        <Calendar className="col-span-2" />
        <Weather className="col-span-2" />
        <Photos className="col-span-4 sm:col-span-2 h-[70vh] sm:max-h-96" />
      </div>
    </>
  );
}
