'use client';
import React from 'react';
import PeopleData from '@/lib/data/People.json';
import { convertIdToFilename } from '@/lib/utils';
import Link from '@/components/ui/link';

// Define the Person interface to match the JSON structure
interface Link {
  [key: string]: string;
}

interface Person {
  id: string;
  currentTitle: string;
  currentCompany: string;
  relationship: string;
  workedTogether: string;
  testimonial: string;
  links: Link[];
}

// Explicitly assert the type of PeopleData
const people: Person[] = PeopleData as Person[];

const People: React.FC<{ className?: string }> = ({ className }) => {
  const sortedPeople = [...people].sort((a, b) => a.id.localeCompare(b.id));

  return (
    <ul className="grid col-span-9 grid-cols-3">
      {sortedPeople.map((person) => (
        <li key={person.id} className="col-span-1">
          <div className="flex gap-4">
            <div className="w-16 h-20 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={`/headshots/${convertIdToFilename(person.id)}`}
                alt={person.id}
              />
            </div>
            <div className="flex flex-col gap-2 w-80 mt-4">
              <h3 className="font-semibold">
                {person.id}{' '}
                <span>
                  {person.relationship} {person.workedTogether}
                </span>
                <br />
                <span>
                  {person.currentTitle} @ {person.currentCompany}
                </span>
              </h3>
              <p className="text-sm">{person.testimonial}</p>
              <div className="flex gap-4">
                {person.links.map((link, index) => {
                  const [platform, url] = Object.entries(link)[0];
                  return (
                    <Link
                      key={index}
                      href={url}
                      className='text-text/50'
                    >
                      {platform}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default People;
