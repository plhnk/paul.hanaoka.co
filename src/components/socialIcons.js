import React from 'react';
import Icon from '../components/icon';
import {ICONS} from '../utilities/constants.js';

export default props => (
    <div>
        <a aria-label="Dribbble Link" href="https://dribbble.com/plhnk"><Icon label={'dribbble'} icon={ICONS.dribbble} /></a>
        <a aria-label="GitHub Link" href="https://github.com/plhnk"><Icon label={'github'} icon={ICONS.github} /></a>
        <a aria-label="Twitter Link" href="https://twitter.com/plhnk"><Icon label={'twitter'} icon={ICONS.twitter} /></a>
        <a aria-label="Unsplash Link" href="https://unsplash.com/paul_"><Icon label={'unsplash'}icon={ICONS.unsplash} /></a>
    </div>
);