/** @jsx jsx */
import { jsx, useColorMode, IconButton } from 'theme-ui'
import Icon from '../components/icon';

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
      <Icon label={'Theme Toggle'} name={`${mode === 'dark' ? 'lightMode' : 'darkMode'}`} />
    </IconButton>
  );
}