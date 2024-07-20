import React from 'react';

interface SummaryProps {
  problem: string;
  role: string;
  contributions: string[];
}

const Summary: React.FC<SummaryProps> = ({
  problem = '',
  role,
  contributions,
}) => {
  const paragraphs = problem?.split('\n') ?? [];

  return (
    <div className="grid grid-cols-subgrid lg:!col-start-2 2xl:col-start-3">
      <div className="col-span-3 md:max-lg:col-span-5 mb-8">
        <h3 className="text-element uppercase tracking-widest text-xs">
          Problem
        </h3>
        {paragraphs.map((paragraph, index) => (
          <p className="my-2" key={index}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-subgrid gap-4 sm:gap-8 col-span-3 md:col-span-5">
        <div className="col-span-3">
          <h3 className="text-element uppercase tracking-widest text-xs">
            Role
          </h3>
          <p className="my-2">{role}</p>
        </div>
        <div className="col-span-3 md:col-span-2">
          <h3 className="text-element uppercase tracking-widest text-xs">
            Contributions
          </h3>
          <ul className="py-2 flex flex-wrap">
            {contributions.map((item, index) => (
              <li
                className='flex-none w-1/2 lg:w-full min-w-[12ch] max-w-[20ch] leading-6 px-0 mb-2 before:content-["•"] before:absolute before:text-element/50 before:-ml-2.5'
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
