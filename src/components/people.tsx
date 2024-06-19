'use client';
import React from 'react';
import PeopleData from '@/lib/data/People.json';
import { convertIdToFilename } from '@/lib/utils';

// Define the Person interface to match the JSON structure
interface Link {
    [key: string]: string;
}

interface Person {
    id: string;
    title: string;
    currentCompany: string;
    relationship: string;
    workedTogether: string;
    testimonial: string;
    links: Link[];
}

// Explicitly assert the type of PeopleData
const people: Person[] = PeopleData as Person[];

const People: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <ul className={`main-content overflow-x-clip [overflow-clip-margin:20px] sm:overflow-x-visible ${className}`}>
            {people.map((person) => (
                <li key={person.id}>
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-full h-48 rounded-xl overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                src={`/images/${convertIdToFilename(person.id)}`}
                                alt={person.id}
                            />
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <h3 className="font-semibold">{person.title}</h3>
                            <p className="text-sm">{person.currentCompany}</p>
                            <p className="text-sm">{person.relationship}</p>
                            <p className="text-sm">{person.workedTogether}</p>
                            <p className="text-sm">{person.testimonial}</p>
                            <div className="flex gap-2">
                                {person.links.map((link, index) => {
                                    const [platform, url] = Object.entries(link)[0];
                                    return (
                                        <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                                            {platform}
                                        </a>
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
