/** @jsx jsx */

import { jsx } from 'theme-ui';
import LinearFeed from '../components/linearFeed';

import MainLayout from '../layouts/main';

export default () => {
  return <MainLayout sidebar={null} mainContent={<LinearFeed />} />;
};
