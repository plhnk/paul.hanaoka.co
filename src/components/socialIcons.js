import React from 'react';
import Icon from '../components/icon';
import {ICONS} from '../utilities/constants.js';

export default props => (
    <div>
        <a href="https://dribbble.com/plhnk"><Icon label={'dribbble'} icon={ICONS.dribbble} /></a>
        <a href="https://github.com/plhnk"><Icon label={'github'} icon={ICONS.github} /></a>
        <a href="https://twitter.com/plhnk"><Icon label={'twitter'} icon={ICONS.twitter} /></a>
        <a href="https://unsplash.com/paul_"><Icon label={'unsplash'}icon={ICONS.unsplash} /></a>
        <a href="https://www.youtube.com/channel/UCigojBfH5N25aoGwrQRzK4A"><Icon label={'youtube'} icon={ICONS.youtube} /></a>
    </div>
);