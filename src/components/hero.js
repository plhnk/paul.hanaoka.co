import React from 'react';
import { Text, Image, Heading, Box } from 'theme-ui';
import NavBar from '../components/navbar'
import Wrapper from '../components/wrapper'

export default ({ image, pretitle, title, subtitle }) => (
  <Wrapper>
      <Box>
        <Text as='span'>{pretitle}</Text>
        <Heading as='h1'>{title}</Heading>
        <Text as='h2'>{subtitle}</Text>
      </Box>
    <Image src={image} />
    <NavBar />
  </Wrapper>
);
