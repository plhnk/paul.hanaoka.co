import React from 'react';
import { Image, Heading, Box } from 'rebass';
import NavBar from '../components/navbar'
import Wrapper from '../components/wrapper'

export default ({ image, pretitle, title, subtitle }) => (
  <Wrapper>
      <Box>
        <Heading>{pretitle}</Heading>
        <Heading>{title}</Heading>
        <Heading>{subtitle}</Heading>
      </Box>
    <Image src={image} />
    <NavBar />
  </Wrapper>
);
