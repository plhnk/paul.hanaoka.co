/** @jsx jsx */

import { useColorMode } from 'theme-ui';
import { useEffect } from 'react';
import moment from 'moment';

// thanks to https://stackoverflow.com/questions/36197031/how-to-use-moment-js-to-check-whether-the-current-time-is-between-2-times
// and https://stackoverflow.com/questions/56663785/invalid-hook-call-hooks-can-only-be-called-inside-of-the-body-of-a-function-com
// and https://css-tricks.com/run-useeffect-only-once/

const TimeSensitiveTheme = () => {
  const [mode, setMode] = useColorMode();
  useEffect(() => {

    const timeFormat = 'HH'; // set time format to something easy
    const time = moment();
    const dayStart = moment('08', timeFormat);
    const dayEnd = moment('20', timeFormat); // 24h time is better
    function SetTheme() {
      if (time.isBetween(dayStart, dayEnd)) {
        setMode('default');
      } else {
        setMode('dark');
      }
    }
    SetTheme();
    console.log(mode);
  }, []);

  return null;
};

export default TimeSensitiveTheme;
