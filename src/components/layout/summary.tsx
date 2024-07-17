import React from 'react';

interface SummaryProps {
  problem: string;
  role: string;
  contributions: string[];
}

const Summary: React.FC<SummaryProps> = ({
  problem,
  role,
  contributions,
}) => {
  return (
    <div className="grid grid-cols-subgrid lg:!col-start-2 2xl:col-start-3">
      <div className="col-span-3 md:max-lg:col-span-5 mb-8">
        <h3 className="text-element uppercase tracking-widest text-xs">
          Problem
        </h3>
        <p className="my-[.5em] ">{problem}</p>
      </div>
      <div className="flex gap-4 sm:gap-8 col-span-3 md:max-lg:col-span-4">
        <div className="">
          <h3 className="text-element uppercase tracking-widest text-xs">
            Role
          </h3>
          <p className="my-[.5em] ">{role}</p>
        </div>
        <div className="min-w-fit">
          <h3 className="text-element uppercase tracking-widest text-xs">
            Contributions
          </h3>
          <ul className="py-2">
            {contributions.map((item, index) => (
              <li
                className='leading-6 px-0 mb-2 before:content-["•"] before:absolute before:text-element/50 before:-ml-2.5'
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Summary;
