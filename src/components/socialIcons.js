/** @jsx jsx */

import Icon from '../components/icon';
import { jsx, Grid, IconButton } from 'theme-ui';
import Link from './link';

const SocialIcons = (props) => {
  const data = props.display;

  const icons = data.map((site, i) => (
    <Link to={'https://' + site + '.com/plhnk'}>
      <IconButton
        key={i}
        sx={{ backdropFilter: 'blur(4px)' }}
        aria-label={site + ' link'}
      >
        <Icon label={site} name={site} />
      </IconButton>
    </Link>
  ));

  return (
    <Grid gap={3} columns={4}>
      {icons}
    </Grid>
  );
};

export default SocialIcons;
