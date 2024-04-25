/* eslint-disable @next/next/no-img-element */
import Calendar from '../components/widgets/calendar';
import Proverbs from '../components/widgets/proverbs';
import Photos from '../components/widgets/photos';
import Weather from '../components/widgets/weather';

export default function Home() {
  return (
    <>
      <div className="col-span-1 flex flex-col justify-between pt-[6.9rem] h-fit sm:sticky top-[6.9rem] leading-normal *:mb-8 h-full">
        <div>
          <h1>Thank you for visiting my small corner of the world wide web!</h1>
          <p>My name is Paul and I‘m a designer with a passion for building.</p>
          <p>
            This is my digital workshop, garden, gallery, and notebook &mdash;
            it’s primary purpose is for me to learn, my hope is that by putting
            it out for the privileged few, it might help (or at least inform)
            someone else, such as yourself.
          </p>
          <div className="grid gap-4 grid-cols-2 text-text/40">
            <a href="/about">Learn more about me</a>
            <a href="/colophon">About this site</a>
          </div>
        </div>
        <Proverbs/>
      </div>
      <div className="grid items-stretch sm:flex sm:flex-col grid-cols-2 row-span-2 sm:grid-cols-1 gap-4 sm:gap-8 items-end mb-8">
        <Calendar className="col-span-1 sm:col-span-2" />
        <Weather className="col-span-1 sm:col-span-2" />
        {/* <Photos className="col-span-1 sm:col-span-2" /> */}
      </div>
    </>
  );
}
