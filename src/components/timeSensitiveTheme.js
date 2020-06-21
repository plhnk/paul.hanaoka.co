/** @jsx jsx */

import { useColorMode } from 'theme-ui';
import { useEffect } from 'react';
import moment from 'moment';

// thanks to https://stackoverflow.com/questions/36197031/how-to-use-moment-js-to-check-whether-the-current-time-is-between-2-times
// and https://stackoverflow.com/questions/56663785/invalid-hook-call-hooks-can-only-be-called-inside-of-the-body-of-a-function-com
// and https://css-tricks.com/run-useeffect-only-once/
// and https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

const TimeSensitiveTheme = () => {
  const [mode, setMode] = useColorMode();
  const timeFormat = 'HH'; // set time format to something easy
  const time = moment();
  const dayStart = moment('08', timeFormat);
  const dayEnd = moment('20', timeFormat); // 24h time is better

  function SetTheme() {
    // if it's daytime, set theme to default
    if (time.isBetween(dayStart, dayEnd)) {
      setMode('default');
    } 
    // if its nighttime, if the user hasn't set it to light, set it to dark
    else if (sessionStorage.getItem('theme-ui-color-mode') === null) {
      setMode('dark');
    }
  }

  useEffect(() => {
    SetTheme();
    // save theme to session storage 
    sessionStorage.setItem('theme-ui-color-mode', mode);
  }, []);
  return null;
};

export default TimeSensitiveTheme;
