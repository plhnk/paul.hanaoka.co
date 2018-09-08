import React from 'react';
import Icon from '../../atoms/Icon';
import {ICONS} from '../../../utilities/constants.js';
import styles from './socialicons.module.css'

export default props => (
    <div className={styles.wrapper}>
        <a href="https://dribbble.com/plhnk"><Icon class="no-invert" label={'dribbble'} icon={ICONS.dribbble} /></a>
        <a href="https://github.com/plhnk"><Icon class="no-invert" label={'github'} icon={ICONS.github} /></a>
        <a href="https://twitter.com/plhnk"><Icon class="no-invert" label={'twitter'} icon={ICONS.twitter} /></a>
        <a href="https://unsplash.com/paul_"><Icon class="no-invert" label={'unsplash'}icon={ICONS.unsplash} /></a>
        <a href="https://www.youtube.com/channel/UCigojBfH5N25aoGwrQRzK4A"><Icon class="no-invert" label={'youtube'} icon={ICONS.youtube} /></a>
    </div>
);