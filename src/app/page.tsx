import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from '@/components/ui/link';
import Projects from '@/components/projects';
import Highlight from '@/components/ui/highlight';
import WeirdGuy from '@/components/widgets/weird-guy';
import Greeting from '@/components/widgets/greeting';

export default function Home() {
  return (
    <>
      <div className="col-span-full lg:col-span-7 lg:col-start-2">
        <div className="flex justify-between">
          <Greeting className="md:mt-4 lg:mt-6" />
          {/* <span className="mt-6 flex items-center gap-2 small-caps font-mono font-light text-xs text-green-200 px-2.5 py-0 bg-green-950/50 rounded-full outline outline-2 outline-green-950/30 -outline-offset-1">
            <div className="animate-pulse bg-green-500 rounded-full h-2 w-2 outline outline-2 -outline-offset-1 outline-green-700/50" />{' '}
            Available
          </span> */}
          {/* TODO link avail to calendar */}
        </div>
        <div className="flex justify-between items-end mt-40 md:mb-32">
          <h1 className="text-4xl text-text/60 mb-12 mt-32 md:mt-8 z-10">
            Paul Hanaoka is a <br />
            <Highlight
              word="designer"
              // hoverContent="designer"
            />{' '}
            with a passion for building <br />
            <Highlight
              word="high-quality"
              // hoverContent="Beautiful and useful"
            />{' '}
            <Highlight
              word="products"
              // hoverContent="mostly software, but sometimes websites, homes, cabinets, and anything else that needs building"
            />{' '}
            and doing
            <br />
            other stuff good too.
          </h1>
          <WeirdGuy className="absolute top-32 lg:top-0 lg:relative -ml-8 right-4 lg:-mr-4" />
        </div>
      </div>
      <div className="col-span-4 lg:col-start-2">
        <span className="block mb-4 text-sm small-caps">Featured Project</span>
        <Projects variant="random" />
        <Link
          className="group mt-8 text-text/80 hover:text-text self-end flex text-nowrap"
          href="/projects"
        >
          <span className="w-full" />
          View All{' '}
          <ArrowRight className="ml-4 text-text/40 group-hover:text-text/60 group-hover:translate-x-2 transition-all duration-300" />
        </Link>
      </div>
    </>
  );
}
