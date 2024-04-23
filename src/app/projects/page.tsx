import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const Projects: React.FC = () => {
  return (
    <>
      <div>
        <h1>Projects Page</h1>
        <p>
          In 2014, I started my first job in tech at a private enterprise
          software company. It was relatively small when I joined (&#60;350
          people, &#60;10 designers) and there was plenty of work for a
          web/UX/whatever designer.
        </p>
        <p>
          These were exciting times &mdash; I never had the same role for more
          than 3 years, and as we grew, my role shifted from being on the front
          lines with customers and products to more managerial.
        </p>
        <p>
          Here are a few of the rare projects that I took the time to document
          before moving on to the next thing.
        </p>
      </div>
      {/* <ul>
        <li>
          <Card>
            <CardContent>
              <div>Label</div>
              <div className="imageContainer">
                <img src="https://placehold.co/600x400" alt="Project Image" />
              </div>
              <div className="shadow" />
            </CardContent>
            <CardHeader>
              <CardTitle>
                <div>Title</div>
                <div>Subtitle</div>
              </CardTitle>
            </CardHeader>
          </Card>
        </li>
      </ul> */}
    </>
  );
};

export default Projects;

// TODOs
// project card
// project modal (figma embed)
