import Photos from '@/components/widgets/photos';
import Calendar from '../components/widgets/calendar';
import Weather from '../components/widgets/weather';
import Projects from '@/components/projects';

export default async function Home() {
  let projectsData;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
      cache: 'no-store',
    });
    projectsData = await response.json();
  } catch (error) {
    projectsData = [];
  }

  return (
    <>
      {/* first div is the main content */}
      <Projects className="2xl:col-start-2" projects={projectsData} />
      {/* the 2nd div is the sidebar */}
      <div className="sidebar">
        <Calendar className="col-span-2" />
        <Weather className="col-span-2" />
        <Photos className="col-span-4 sm:col-span-2 h-[80vh] mt-4 sm:mt-0 sm:h-full" />
      </div>
    </>
  );
}

// TODO --> photos height is wonky on desktop --> weather height ? something w/grid need to troubleshoot
// Holy shit --> learned the hard way that server components aren't able to process relative URLs
// perplexity couldn't help w/this for some reason?