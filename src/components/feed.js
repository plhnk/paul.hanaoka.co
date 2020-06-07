/** @jsx jsx */

import { jsx } from 'theme-ui';
import Wrapper from '../components/wrapper'
import Photos from "./photos"

export default ({children}) => (
    <Wrapper sx={{ }}>
        <Photos />
    </Wrapper>
)