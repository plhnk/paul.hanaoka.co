/** @jsx jsx */

import Icon from '../components/icon';
import {ICONS} from '../utilities/constants.js';
import { jsx, IconButton } from 'theme-ui';

export default (props) => (
  <div>
    <IconButton
      as="a"
      target="_new"
      aria-label="Dribbble Link"
      href="https://dribbble.com/plhnk"
    >
      <Icon label={'dribbble'} icon={ICONS.dribbble} />
    </IconButton>
    <IconButton
      as="a"
      target="_new"
      aria-label="GitHub Link"
      href="https://GitHub.com/plhnk"
    >
      <Icon label={'github'} icon={ICONS.github} />
    </IconButton>
    <IconButton
      as="a"
      target="_new"
      aria-label="Twitter Link"
      href="https://Twitter.com/plhnk"
    >
      <Icon label={'twitter'} icon={ICONS.twitter} />
    </IconButton>
    <IconButton
      as="a"
      target="_new"
      aria-label="Unsplash Link"
      href="https://Unsplash.com/plhnk"
    >
      <Icon label={'unsplash'} icon={ICONS.unsplash} />
    </IconButton>
  </div>
);