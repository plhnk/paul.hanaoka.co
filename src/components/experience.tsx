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
              <p className="italic text-text/70">{experience.location}</p>
            </div>
            <p>{experience.duration}</p>
          </div>
          <p className="text-text/70 font-light mt-2 max-w-[58ch]">{experience.description}</p>
          {/* <h4 className="text-base text-text/70 font-normal mt-8 mb-2">Responsibilities</h4>
          <ul>
            {experience.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
          {experience.key_contributions && (
            <div>
              <h4 className="text-base text-text/70 font-normal mt-8 mb-2">Key Contributions:</h4>
              <ul>
                {experience.key_contributions.map((contribution, index) => (
                  <li key={index}>{contribution}</li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      ))}
    </>
  );
};

export default WorkExperienceComponent;
