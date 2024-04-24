import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
      <ul>
        <li className="group initial -z-10">
          <Dialog>
            <DialogTrigger>
              <Card className="bg-card/20 overflow-visible relative -z-20 group-hover:bg-card">
                <CardContent className="">
                  <div>Label</div>
                  <div className="iso relative -z-10 group-hover:rotate-0">
                    <img
                      src="https://placehold.co/600x400"
                      alt="Project Image"
                    />
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
            </DialogTrigger>
            <DialogContent className="border-card fixed top-0 left-[calc(3svw_-_2rem)] m-8 max-w-screen-2xl w-[94svw] h-[92svh] transform-none">
              <iframe
                className="w-full h-full m-1 rounded-sm"
                style={{ border: '1px solid rgba(0, 0, 0, 0.1);' }}
                src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FmtsdvHcgOfRl73u1CFaUY5%2Fplhnk-%40-GitHub?page-id%3D3112%3A59509%26type%3Ddesign%26node-id%3D3182-5895%26viewport%3D-1774%2C-1001%2C0.07%26t%3DkXBUImlj6qMtp853-8%26scaling%3Dscale-down-width%26starting-point-node-id%3D3182%3A5895%26hide-ui%3D1"
                // allowFullScreen
              ></iframe>
            </DialogContent>
          </Dialog>
        </li>
      </ul>
    </>
  );
};

export default Projects;

// TODOs
// project card
// project modal (figma embed)

// Parsing Figma embed URLs
// = %3D
// & %26
// / %2F

// options
// &disable-default-keyboard-nav%3D1
// &hide-ui%3D1
// &mode=design

// &scaling=scale-down
// or
// &scaling=scale-down-width
