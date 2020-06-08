/** @jsx jsx */

import Icon from '../components/icon';
import { jsx, Grid, IconButton } from 'theme-ui';

export default (props) => (
  <Grid gap={3} columns={4}>
    <IconButton
      {...props}
      as="a"
      target="_new"
      aria-label="Dribbble Link"
      href="https://dribbble.com/plhnk"
      >
      <Icon label={'dribbble'} name='dribbble' />
    </IconButton>
    <IconButton
      {...props}
      as="a"
      target="_new"
      aria-label="GitHub Link"
      href="https://GitHub.com/plhnk"
      >
      <Icon label={'github'} name='github' />
    </IconButton>
    <IconButton
      {...props}
      as="a"
      target="_new"
      aria-label="Twitter Link"
      href="https://Twitter.com/plhnk"
      >
      <Icon label={'twitter'} name='twitter' />
    </IconButton>
    <IconButton
      {...props}
      as="a"
      target="_new"
      aria-label="Unsplash Link"
      href="https://Unsplash.com/plhnk"
    >
      <Icon label={'unsplash'} name='unsplash' />
    </IconButton>
  </Grid>
);