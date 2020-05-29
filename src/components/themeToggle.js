/** @jsx jsx */
import { jsx, useColorMode, IconButton } from 'theme-ui'
import Icon from '../components/icon';
import { ICONS } from '../utilities/constants.js';

export default props => {
  const [ mode, setMode ] = useColorMode()
  return (
    <IconButton
      {...props}
      onClick={(e) => {
        const next = mode === 'dark' ? 'light' : 'dark';
        setMode(next);
      }}
    >
      <Icon label={'Theme Toggle'} icon={`${mode === 'dark' ? ICONS.lightMode : ICONS.darkMode}`} />
    </IconButton>
  );
}