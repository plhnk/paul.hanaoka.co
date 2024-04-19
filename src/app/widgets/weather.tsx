'use client';
import { useEffect, useState } from 'react';
import DashboardCard from '../components/ui/dashboardcard';
import { Skeleton } from '@/components/ui/skeleton';
import { Sun, CloudSun, CloudRain, CloudSunRain, CloudOff } from 'lucide-react';

export default function Weather() {
  const [data, setData] = useState<{
    hourlyData: any;
    forecastData: any;
  } | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(
        'https://api.weather.gov/gridpoints/SEW/132,123/forecast/hourly'
      ).then((res) => res.json()),
      fetch('https://api.weather.gov/gridpoints/SEW/132,123/forecast').then(
        (res) => res.json()
      ),
    ])
      .then(([hourlyData, forecastData]) => {
        setData({ hourlyData, forecastData });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  }, []);

  // if (data) {
  //   console.log(data.forecastData.properties);
  //   console.log(data.hourlyData.properties.periods[0].temperature);
  //   console.log(data.forecastData.properties.periods[0].detailedForecast);
  //   console.log(data.forecastData.properties.periods[0].shortForecast);
  //   console.log(data.forecastData.properties.periods[0].minTemperature);
  // }

  const currentTemp = data ? (
    data.hourlyData.properties.periods[0].temperature
  ) : (
    <Skeleton className="w-[4rem] h-[4rem]" />
  );
  const detailedForecast = data
    ? data.forecastData.properties.periods[0].detailedForecast
    : 'loading...';
  const shortForecast = data
    ? data.forecastData.properties.periods[0].shortForecast
    : 'loading...';
  const dewPoint = data
    ? data.forecastData.properties.periods[0].dewpoint.value
    : 'loading...';
  // console.log([
  //   { dewPoint: dewPoint },
  //   { shortForecast: shortForecast },
  //   { currentTemp: currentTemp },
  //   { detailedForecast: detailedForecast },
  // ]);
  function getIcon(shortForecast: string): React.ReactNode {
    let icon: React.ReactNode;
    const forecast = shortForecast.toLowerCase();
    if (forecast.includes('sunny')) {
      icon = <Sun />;
    } else if (forecast.includes('cloudy')) {
      icon = <CloudSun />;
    } else if (forecast.includes('rain')) {
      icon = <CloudRain />;
    } else if (forecast.includes('scattered')) {
      icon = <CloudSunRain />;
    } else {
      icon = <CloudOff />;
    }
    return icon;
  }

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
        className="row-span-1 col-span-1 sm:row-span-2"
        title="Bellingham, WA"
        importantNumber={convertedTemp + '°'}
        extraInfo={toggle}
        graphic={getIcon(shortForecast)}
        graphicInfo={shortForecast}
      />
    </>
  );
}
