/* eslint-disable @next/next/no-img-element */
import DashboardCard from '@/components/ui/dashboardcard';
import Calendar from '../components/widgets/calendar';
import Proverbs from '../components/widgets/proverbs';
import Weather from '../components/widgets/weather';

export default function Home() {
  return (
    <>
      <div className="col-span-2 sm:col-span-6 leading-normal *:mb-8">
        <h1>Thank you for visiting my small corner of the world wide web!</h1>
        <p>
          My name is Paul Hanaoka — I am different things to many people, but
          the purpose of this site is to communicate that I am a designer with a
          passion for building.
        </p>
        <p>
          Please — scroll, click, tap, hover, key — however you like to interact
          with pages on the internet.
        </p>
        <div className="grid gap-4 grid-cols-2 text-text/40">
          <a href="/about">Learn more about me</a>
          <a href="/colophon">About this site</a>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-2 grid-rows-auto sm:grid-cols-6">
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
