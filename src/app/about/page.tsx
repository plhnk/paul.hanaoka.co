"use client";
import React from 'react';

import { MDXProvider } from '@mdx-js/react';
import Content from './content.mdx';
import CV from './cv.mdx';

const About: React.FC = () => {
    return (
        <div>
            <h1>About Page</h1>
            <p>Welcome to the About page!</p>
            <MDXProvider>
                <Content />
            </MDXProvider>
        </div>
    );
};


export default About;