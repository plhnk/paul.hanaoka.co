// eslint-disable-next-line 
import reset from "../utilities/reset.css";
import React from "react";
import Footer from "../components/organisms/Footer";
import SocialIcons from "../components/molecules/SocialIcons";
import { Grid, styled } from "reakit";
// eslint-disable-next-line 
import global from "../utilities/global.css";
import styles from "./index.module.css";
import { Box, Heading, DarkMode, Label, Input, Button, ButtonOutline, Provider } from "rebass";

const template = `
  "l r" 1fr
  "lb rb" 5rem / minmax(320px, 1fr) minmax(320px, 1fr)
`;

const MyGrid = styled(Grid)`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @media (max-width: 660px) {
    height: 130vh;
    grid-template:"l" 0fr "r" 5.5fr "lb" .5fr "rb" .5fr / 1fr !important;
  }
`

const ItalicText = styled.p`
  font-style: italic;
`;

export default () => (
    <Provider>
      <MyGrid template={template}>
        <Grid.Item alignSelf="center" area="r" className={styles.intro}>
          <ItalicText>friendly introduction</ItalicText>
          <h1 className={styles.name}><span>paul</span> <span className={styles.light}>.hanaoka</span> <span className={styles.lighter}>.co</span></h1>
          <p className={styles.bio}>Brief, witty bio — a notable achievement.</p></Grid.Item>
        <Grid.Item area="lb"><SocialIcons></SocialIcons></Grid.Item>
        <Grid.Item className={styles.photoContainer}  area="lb"><img className={styles.photo} alt="paul is a 100% normal human" src="assets/images/cool-guy.png" /></Grid.Item>
        <Grid.Item area="rb"><Footer></Footer></Grid.Item>
      </MyGrid>
      <Box>
        <Heading mb={3}>Normal Theme</Heading>
        <DarkMode p={3}>
          <Heading>Dark Mode</Heading>
          <Box mb={3}>
            <Label htmlFor='hi'>Hi</Label>
            <Input id='hi' defaultValue='Hello' />
          </Box>
          <Button mr={3}>Beep</Button>
          <ButtonOutline>Boop</ButtonOutline>
        </DarkMode>
      </Box>
    </Provider>
  );