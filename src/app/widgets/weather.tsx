'use-client';
import DashboardCard from '../components/ui/dashboardcard';
import {
  CircleUserRound,
  Layers,
  PenLine,
  Mail,
  Github,
  Twitter,
  ClipboardCopy,
  ExternalLink,
  Moon,
  Sun,
  FileText,
  Terminal,
  Pizza,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const Weather = () => {
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(null);
  const [dailyHigh, setDailyHigh] = useState<number | null>(null);
  const [dailyLow, setDailyLow] = useState<number | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('https://api.weather.gov/SEW/131,123/forecast');
        const data = await response.json();
        const { temperature, temperatureHigh, temperatureLow } = data;

        setCurrentTemperature(temperature);
        setDailyHigh(temperatureHigh);
        setDailyLow(temperatureLow);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <>
      <DashboardCard
        className="row-span-2"
        title='Bellingham, WA'
        importantNumber={currentTemperature ?? undefined}
        extraInfo={'H:' + dailyHigh + ' L:' + dailyLow}
        graphic={'icon'}
        graphicInfo={'weather'}
      />
    </>
  );
};

export default Weather;
