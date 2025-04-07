import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from '@/components/ui/link';
import Projects from '@/components/projects';
import Posts from '@/components/posts';
import Highlight from '@/components/ui/highlight';
import WeirdGuy from '@/components/widgets/weird-guy';
import Greeting from '@/components/widgets/greeting';
import Availability from '@/components/widgets/availability';

export default function Home() {
  return (
    <>
      <div className="col-span-full lg:col-span-7 lg:col-start-2">
        <div className="flex justify-between">
          <Greeting className="md:mt-4 lg:mt-6" />
          <Availability />
        </div>
        <div className="flex justify-between items-end mt-40 md:mb-32">
          <h1 className="text-4xl text-text/60 mb-12 mt-32 md:mt-8 z-10">
          
            Hi,EVERYONE <br />
            {/* <Highlight
              word="designer"
              hoverContent="designer"
            />{''} */}
            欢迎来到我的网站!
          </h1>
          {/* FIXME: 首页头像 */}
          <WeirdGuy className="absolute top-32 lg:top-0 lg:relative -ml-8 right-4 lg:-mr-4" />
          {/* fix this section in light mode */}
        </div>
      </div>
      <div className="col-span-3 lg:col-span-4 lg:col-start-2 my-40 sm:my-0">
        <span className="block mb-4 text-sm small-caps">我的项目</span>
        {/* 项目 */}
        <Projects variant="random" />

        <Link
          className="group mt-8 text-text/60 hover:text-text self-end flex text-nowrap"
          href="/projects"
        >
          <span className="w-0 sm:w-full" />
          所有项目{' '}
          <ArrowRight className="ml-4 text-text/40 group-hover:text-text/60 group-hover:translate-x-2 transition-all duration-300" />
          <span className="w-full sm:w-0" />
        </Link>
      </div>
      <div className="col-span-3 md:col-span-2 lg:col-span-3 lg:col-start-6">
        <span className="block mb-4 text-sm small-caps">我的笔记</span>

        {/* POSTS */}
        <Posts />
        <Link
          className="group mt-12 text-text/60 hover:text-text self-end flex text-nowrap"
          href="/posts"
        >
          所有笔记{' '}
          <ArrowRight className="ml-4 text-text/40 group-hover:text-text/60 group-hover:translate-x-2 transition-all duration-300" />
          <span className="w-full" />
        </Link>
      </div>
    </>
  );
}
