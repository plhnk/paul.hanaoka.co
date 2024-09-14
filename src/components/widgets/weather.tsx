'use client';
import { useEffect, useState } from 'react';
import DashboardCard from '../ui/dashboardcard';
import {
  getIcon,
  useWeatherData,
  getLocationFromZip,
} from '../../lib/utilities/weather';
import { Navigation } from 'lucide-react';
import { Button } from '../ui/button';
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip';
import { useFathomEvent } from '@/hooks/useFathom';

interface WeatherProps {
  className?: string;
}

export default function Weather(props: WeatherProps) {
  const { className } = props;
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [zipCode, setZipCode] = useState('');
  const { data, isLoading } = useWeatherData(
    location?.lat || 0,
    location?.lon || 0
  );
  const { trackEvent } = useFathomEvent();
  const [isCelsius, setIsCelsius] = useState(false);

  useEffect(() => {
    const browserLanguage = navigator.language;
    const isEnUs = browserLanguage === 'en-US';
    setIsCelsius(isEnUs ? false : true);

    // Set default location to Bellingham, WA
    setLocation({ lat: 48.7519, lon: -122.4787 });
  }, []);

  // const handleZipCodeSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const newLocation = await getLocationFromZip(zipCode);
  //   if (newLocation) {
  //     setLocation(newLocation);
  //   }
  // };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert(
            'Sorry there was an error, please try again or send me an email with your location.'
          );
        }
      );
    } else {
      alert(
        'Geolocation is not supported by your browser. Go outside and look up.'
      );
    }
  };

  const handleClick = () => {
    trackEvent('Weather Locate Me Click');
    handleLocateMe;
  };

  const currentTemp = data
    ? data.hourlyData.properties.periods[0].temperature
    : 'ERR';
  const shortForecast = data
    ? data.forecastData.properties.periods[0].shortForecast
    : 'Weather API error';

  const icon = getIcon(shortForecast, {});

  function convertToCelsius(currentTemp: string): string {
    const fahrenheit = parseFloat(currentTemp);
    const celsius = ((fahrenheit - 32) * 5) / 9;
    return celsius.toFixed(0);
  }

  function toggleTemperatureUnit() {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  }

  const temperatureUnit = (
    <>
      <span className={isCelsius ? 'text-text' : ''}>C</span>/
      <span className={isCelsius ? '' : 'text-text'}>F</span>
    </>
  );
  const convertedTemp = isCelsius
    ? convertToCelsius(currentTemp.toString())
    : currentTemp;

  const loadingSpinner = (
    <svg
      className="animate-spin h-12 w-12 ml-0 m-4 text-text/80"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  const tempData = isLoading ? loadingSpinner : convertedTemp + '°';

  const toggle = (
    <>
      <button
        className="text-text/40 tracking-[.4rem]"
        onClick={toggleTemperatureUnit}
      >
        {temperatureUnit}
      </button>
    </>
  );

  const locateMe = (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="-mt-2 translate-x-2 rounded-lg sm:rounded-md sm:-mt-3.5 sm:translate-x-3.5 hover:text-text"
            onClick={handleClick}
          >
            <Navigation />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          sideOffset={8}
          className="text-text/80 bg-element/10 rounded-md w-auto outline outline-1 outline-element/20"
        >
          <p className="text-sm normal-case tracking-normal">
            Click to use your current location.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const title = (
    <span className="flex justify-between">
      {data?.location || 'Loading...'}
      {locateMe}
    </span>
  );

  return (
    <>
      <DashboardCard
        className={className}
        title={title}
        importantNumber={tempData}
        extraInfo={toggle}
        graphic={icon}
        graphicInfo={shortForecast}
      />
    </>
  );
}

// for later
// <div className="mt-2 flex flex-col space-y-2">
//   <form onSubmit={handleZipCodeSubmit} className="flex">
//     <input
//       type="text"
//       value={zipCode}
//       onChange={(e) => setZipCode(e.target.value)}
//       placeholder="Enter ZIP code"
//       className="text-black px-2 py-1 text-sm rounded-l flex-grow"
//     />
//     <button
//       type="submit"
//       className="text-sm bg-blue-500 text-white px-2 py-1 rounded-r"
//     >
//       Update
//     </button>
//   </form>
// </div>;
