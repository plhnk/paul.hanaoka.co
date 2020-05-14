// eslint-disable-next-line 
import React from "react";
import Footer from "../components/organisms/Footer";
import SocialIcons from "../components/molecules/SocialIcons";
import { Grid, styled } from "reakit";
// eslint-disable-next-line 
import styles from "./index.module.css";
import { Styled } from 'theme-ui'
import ThemeToggle from "../components/atoms/ThemeToggle";
import { ThemeProvider } from 'theme-ui';

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
    <ThemeProvider>
      <MyGrid template={template}>
        <Grid.Item alignSelf="center" area="r" className={styles.intro}>
          <ThemeToggle />
          <ItalicText>friendly introduction</ItalicText>
          <Styled.h1><span>paul</span> <span className={styles.light}>.hanaoka</span> <span className={styles.lighter}>.co</span></Styled.h1>
          <Styled.p>Brief, witty bio — a notable achievement.</Styled.p></Grid.Item>
        <Grid.Item area="lb"><SocialIcons></SocialIcons></Grid.Item>
        <Grid.Item className={styles.photoContainer}  area="lb"><img className={styles.photo} alt="paul is a 100% normal human" src="assets/images/cool-guy.png" /></Grid.Item>
        <Grid.Item area="rb"><Footer></Footer></Grid.Item>
      </MyGrid>
    </ThemeProvider>
  );
