'use client';
import React from 'react';
import PeopleData from '@/lib/data/people.json';
import { convertIdToFilename } from '@/lib/utils';
import Link from '@/components/ui/link';
import Image from 'next/image';

interface Link {
  [key: string]: string;
}

interface Person {
  publish: boolean;
  id: string;
  currentTitle: string;
  currentCompany: string;
  relationship: string;
  workedTogether: string;
  testimonial: string;
  links: Link[];
}

const people: Person[] = PeopleData as unknown as Person[];

const People: React.FC<{ className?: string }> = ({ className }) => {
  const sortedPeople = [...people].sort((a, b) => a.id.localeCompare(b.id));

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <ul className="grid col-start-1 lg:col-start-2 col-span-3 md:col-span-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 lg:-ml-28">
      {sortedPeople.map(
        (person) =>
          person.publish === true && (
            <li key={person.id} className="col-span-1 ">
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex flex-col gap-2 md:mt-8">
                  <div className="flex items-center justify-between lg:justify-start gap-4 lg:-mb-4">
                    <div className="order-1 lg:order-none w-16 h-20 mb-4 lg:mb-0 lg:w-24 lg:h-32 shrink-0 rounded-full overflow-hidden outline -outline-offset-1 outline-background/40">
                      <Image
                        width={100}
                        height={140}
                        className="w-full h-full object-cover"
                        src={`/headshots/${convertIdToFilename(person.id)}`}
                        alt={person.id}
                      />
                    </div>
                    <h3 className="font-semibold">
                      {person.id}{' '}
                      <span className="text-text/50">
                        <span className="">
                          {person.relationship} {person.workedTogether}
                        </span>
                        <br />
                        <span className="font-light">
                          {person.currentTitle} @ {person.currentCompany}
                        </span>
                      </span>
                    </h3>
                  </div>
                  <div className="ml-0 lg:ml-28">
                    <p className="text-text/80 mb-2">{person.testimonial}</p>
                    <div className="flex gap-4">
                      {person.links.map((link, index) => {
                        const [platform, url] = Object.entries(link)[0];
                        return (
                          <Link key={index} href={url} className="text-text/50">
                            {platform}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
      )}
    </ul>
  );
};

export default People;
