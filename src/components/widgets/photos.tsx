'use client';
import { useEffect, useState } from 'react';
import DashboardCard from '../ui/dashboardcard';
interface PhotoProps {
  className?: string;
}
export default function Photo(props: PhotoProps) {
  const { className } = props;
  const { data, isLoading } = usePhotoData();

  const currentTemp = data
    ? data.hourlyData.properties.periods[0].temperature
    : 'ono';
  const shortForecast = data
    ? data.forecastData.properties.periods[0].shortForecast
    : 'Photo API error';

  const icon = getIcon(shortForecast, {});

  function convertToCelsius(currentTemp: string): string {
    const fahrenheit = parseFloat(currentTemp);
    const celsius = ((fahrenheit - 32) * 5) / 9;
    return celsius.toFixed(0);
  }

  useEffect(() => {
    const browserLanguage = navigator.language;
    const isEnUs = browserLanguage === 'en-US';
    setIsCelsius(isEnUs ? false : true);
  }, []);
  const [isCelsius, setIsCelsius] = useState(false);

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

  return (
    <>
      <DashboardCard
        className={className}
        title="Bellingham, WA"
        importantNumber={tempData}
        extraInfo={toggle}
        graphic={icon}
        graphicInfo={shortForecast}
      />
    </>
  );
}
