/** @jsx jsx */

import Icon from '../components/icon';
import { jsx, Grid, IconButton } from 'theme-ui';
import Link from './link';

const SocialIcons = (props) => {
  const data = props.show;

  const icons = data.map((site, i) => (
    <Link to={'https://' + site + '.com/plhnk'} key={i}>
      <IconButton
        sx={{ backdropFilter: 'blur(4px)' }}
        aria-label={site + ' link'}
      >
        <Icon label={site} name={site} />
      </IconButton>
    </Link>
  ));

  return (
  <Grid {...props} gap={3} columns={4}>
      {icons}
    </Grid>
  );
};

SocialIcons.defaultProps = {
  show: ['dribbble', 'github', 'twitter', 'unsplash'],
};

export default SocialIcons;
