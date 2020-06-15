/** @jsx jsx */
import { jsx, useColorMode, IconButton } from 'theme-ui';
import Icon from '../components/icon';

export default (props) => {
  const [mode, setMode] = useColorMode();

  return (
      <IconButton
        aria-label="Theme toggle"
        {...props}
        onClick={(e) => {
          const next = mode === 'dark' ? 'light' : 'dark';
          setMode(next);
        }}
      >
        <Icon name={`${mode === 'dark' ? 'lightMode' : 'darkMode'}`} />
      </IconButton>
  );
};
