import React from 'react';

interface WorkExperience {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  responsibilities: string[];
  key_contributions?: string[];
}

interface Props {
  workExperience: WorkExperience[];
}

const WorkExperienceComponent: React.FC<Props> = ({ workExperience }) => {
  return (
    <>
      {workExperience.map((experience, index) => (
        <div className="my-16" key={index}>
          <div className="flex items-baseline justify-between">
            <div>
              <h3 className="text-base font-normal m-0">
                {experience.title} at {experience.company}
              </h3>
              <p className="italic text-text/70 mb-1">{experience.location}</p>
            </div>
            <p>{experience.duration}</p>
          </div>
          <p className="text-text/70 italic font-light mt-0 max-w-[58ch]" dangerouslySetInnerHTML={{ __html: experience.description }}></p>
          <ul>
            {experience.responsibilities.map((responsibility, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: responsibility }}></li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default WorkExperienceComponent;
