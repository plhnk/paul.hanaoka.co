import React, { useState, useEffect } from 'react';
import {
  Sun,
  CloudSun,
  CloudRain,
  CloudLightning,
  CloudSunRain,
  MoonStar,
  CloudOff,
} from 'lucide-react';

export function getIcon(
  shortForecast: string,
  iconStyle: object
): React.ReactNode {
  let icon: React.ReactNode;
  const forecast = shortForecast.toLowerCase();
  if (forecast.includes('sunny')) {
    icon = <Sun {...iconStyle} />;
  } else if (forecast.includes('cloudy')) {
    icon = <CloudSun {...iconStyle} />;
  } else if (forecast.includes('lightning') || forecast.includes('thunder')) {
    icon = <CloudLightning {...iconStyle} />;
  } else if (forecast.includes('rain')) {
    icon = <CloudRain {...iconStyle} />;
  } else if (forecast.includes('scattered')) {
    icon = <CloudSunRain {...iconStyle} />;
  } else if (forecast.includes('clear')) {
    icon = <MoonStar {...iconStyle} />; // TODO add nighttime icons / logic
  } else {
    icon = <CloudOff {...iconStyle} />;
  }
  return icon;
}

export function useWeatherData() {
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
    return { data, isLoading };
  }

// const myLocation = {
//     'long': '48.7637° N',
//     'lat': '122.458° W',
//     'office': 'SEW',
//     'gridX': 132,
//     'gridY':123,
// },

// // current weather conditions
// GET https://api.weather.gov/gridpoints/{office}/{gridX},{gridY}/forecast

// // hourly forecast
// GET https://api.weather.gov/gridpoints/{office}/{gridX},{gridY}/forecast/hourly

// // alerts
// GET https://api.weather.gov/alerts?point={latitude},{longitude}

// // forecast for date
// GET https://api.weather.gov/gridpoints/{office}/{gridX},{gridY}/forecast?start={YYYY-MM-DD}T00:00:00Z&end={YYYY-MM-DD}T23:59:59Z

// // nearby weather stations
// GET https://api.weather.gov/points/{latitude},{longitude}/stations
