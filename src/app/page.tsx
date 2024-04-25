/* eslint-disable @next/next/no-img-element */
import DashboardCard from '@/components/ui/dashboardcard';
import Calendar from '../components/widgets/calendar';
import Proverbs from '../components/widgets/proverbs';
import Weather from '../components/widgets/weather';

export default function Home() {
  return (
    <>
      <div className="col-span-1 pt-[6.9rem] h-fit sm:sticky top-[6.9rem] leading-normal *:mb-8">
        <h1>Thank you for visiting my small corner of the world wide web!</h1>
        <p>
          My name is Paul and I‘m a designer with a
          passion for building.
        </p>
        <p>
          This is my digital workshop, garden, gallery, and notebook &mdash; it’s primary purpose is for me to learn, my hope is that by putting it out for the privileged few, it might help (or at least inform) someone else, such as yourself.
        </p>
        <div className="grid gap-4 grid-cols-2 text-text/40">
          <a href="/about">Learn more about me</a>
          <a href="/colophon">About this site</a>
        </div>
      </div>
      <div className="grid items-stretch sm:flex sm:flex-col grid-cols-2 sm:grid-cols-1 gap-4 sm:gap-8 items-end">
        <Calendar className="col-span-1 sm:col-span-2" />
        <Weather className="col-span-1 sm:col-span-2" />
        <Proverbs className="col-span-2" />
        {/* <DashboardCard
          className="col-span-2"
          title="idea"
          content="What if this was a Spotify music player?" */}
        {/* /> */}
      </div>
    </>
  );
}
