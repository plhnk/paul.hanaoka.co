'use client';
import React, { useEffect, useState } from 'react';

import ProjectDialog from '@/components/ui/projectdialog';
import ProjectCard from '@/components/ui/projectcard';
import projectsData from '../../lib/data/projects.json';

import { MDXProvider } from '@mdx-js/react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<
    {
      id: number;
      label: string;
      title: string;
      subtitle: string;
      image: string;
      prototypeUrl: string;
    }[]
  >([]);

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  return (
    <>
      <MDXProvider>
        <MdxLayout>
          <Content />
        </MdxLayout>
      </MDXProvider>
      <ul>
        {projects.map((project) => (
          <li className="group initial -z-10 my-32" key={project.id}>
            <ProjectDialog content={project.prototypeUrl}>
              <ProjectCard
                label={project.label}
                title={project.title}
                subtitle={project.subtitle}
                imageUrl={project.image}
              />
            </ProjectDialog>
          </li>
        ))}
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

// scaling options
// &scaling=scale-down
// &scaling=scale-down-width
// &scaling=contain

// <li className="group initial -z-10">
//   <Dialog>
//     <DialogTrigger>
//       <Card className="bg-card/10 overflow-visible relative -z-20 group-hover:bg-card text-left">
//         <CardContent className="">
//           <div className="iso relative -z-10 group-hover:rotate-0">
//             <img
//               className=" rounded-md"
//               src="https://placehold.co/600x400"
//               alt="Project Image"
//             />
//           </div>
//           <div className="shadow" />
//         </CardContent>
//         <CardHeader>
//           <CardTitle className="normal-case mb-2 *:block *:font-normal">
//             <span>Label</span>
//             <span>Title</span>
//             <span>Subtitle</span>
//           </CardTitle>
//         </CardHeader>
//       </Card>
//     </DialogTrigger>
//     <DialogContent className="border-card p-1 sm:p-4 fixed top-0 left-[calc(1svw_-_.5rem)] sm:left-[calc(3svw_-_2rem)] m-2 sm:m-8 max-w-screen-2xl w-[98svw] sm:w-[94svw] h-[92svh] transform-none">
//       <iframe
//         className="w-full h-full rounded-sm"
//         style={{ border: '1px solid rgba(0, 0, 0, 0.1);' }}
//         src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FmtsdvHcgOfRl73u1CFaUY5%2Fplhnk-%40-GitHub?page-id%3D3112%3A59509%26type%3Ddesign%26node-id%3D3182-5895%26viewport%3D-1774%2C-1001%2C0.07%26t%3DkXBUImlj6qMtp853-8%26scaling%3Dcontain-width%26starting-point-node-id%3D3182%3A5895%26hide-ui%3D1"
//         // allowFullScreen
//       ></iframe>
//     </DialogContent>
//   </Dialog>
// </li>
