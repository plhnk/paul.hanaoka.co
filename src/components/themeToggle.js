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

// const [mode, setMode] = useColorMode();

// const timeFormat = 'HH'; // set time format to something easy
// const time = moment();
// const dayStart = moment('08', timeFormat);
// const dayEnd = moment('20', timeFormat);

// const timeSensitiveTheme = time.isBetween(dayStart, dayEnd)
//   ? setMode('light')
//   : setMode('dark');
// // time.isBetween(dayStart, dayEnd) ? setMode('dark') : setMode('light');
// console.log(time);
