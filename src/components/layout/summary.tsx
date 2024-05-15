import React from 'react';

interface SummaryProps {
  context: string;
  contributions: string[];
  impact: string[];
}

const Summary: React.FC<SummaryProps> = ({
  context,
  contributions,
  impact,
}) => {
  return (
    <div className="grid grid-cols-subgrid xl:col-start-2 2xl:col-start-3">
      <div className="col-span-3 md:col-span-5 lg:col-span-4 2xl:col-span-3">
        <h3 className="text-element uppercase tracking-widest text-xs">Context</h3>
        <p className="my-[.5em] ">{context}</p>
      </div>
      <div className="flex gap-4 sm:gap-8 col-span-3 md:col-span-5 lg:col-span-5 2xl:col-span-4">
        <div className="min-w-fit">
          <h3 className="text-element uppercase tracking-widest text-xs">Contributions</h3>
          <ul className="py-0">
            {contributions.map((item, index) => (
              <li
                className='leading-6 px-0 before:content-["•"] before:absolute before:text-element/50 before:-ml-2.5'
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <h3 className="text-element uppercase tracking-widest text-xs">Impact</h3>
          <ul className="py-0">
            {impact.map((item, index) => (
              <li
                className='leading-6 px-0 before:content-["•"] before:absolute before:text-element/50 before:-ml-2.5'
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
