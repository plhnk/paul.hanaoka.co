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

export function useWeatherData(latitude: number, longitude: number) {
  const [data, setData] = useState<{
    hourlyData: any;
    forecastData: any;
    location: string;
  } | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // First, get the grid points
        const pointResponse = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
        const pointData = await pointResponse.json();
        const { gridX, gridY, gridId: office, relativeLocation } = pointData.properties;

        // Then fetch the weather data
        const [hourlyData, forecastData] = await Promise.all([
          fetch(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast/hourly`).then(res => res.json()),
          fetch(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast`).then(res => res.json()),
        ]);

        setData({ 
          hourlyData, 
          forecastData, 
          location: `${relativeLocation.properties.city}, ${relativeLocation.properties.state}` 
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchWeatherData();
    }
  }, [latitude, longitude]);

  return { data, isLoading };
}

export async function getLocationFromZip(zipCode: string): Promise<{ lat: number, lon: number } | null> {
  try {
    const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
    const data = await response.json();
    return {
      lat: parseFloat(data.places[0].latitude),
      lon: parseFloat(data.places[0].longitude)
    };
  } catch (error) {
    console.error('Error fetching location from zip code:', error);
    return null;
  }
}