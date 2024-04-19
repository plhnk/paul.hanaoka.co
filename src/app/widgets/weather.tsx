'use-client';
import { useState, useEffect } from 'react';
import DashboardCard from '../components/ui/dashboardcard';

const Weather: React.FC = () => {
  // const [data, setData] = useState(null);
  // const [isLoading, setLoading] = useState(true);

  // const fetcher = async (url: string | URL | Request) => {
  //   const response = await fetch(
  //     'https://api.weather.gov/SEW/131,123/forecast'
  //   );
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   return response.json();
  // };

  // const data = GET('https://api.weather.gov/SEW/131,123/forecast');
  // console.log(data);

  // useEffect(() => {
  //   fetch('https://api.weather.gov/SEW/131,123/forecast')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, []);

  // console.log(data);

  return (
    <>
      <DashboardCard
        className="row-span-2"
        title="Bellingham, WA"
        importantNumber={'69'}
        extraInfo={'H:' + 69 + ' L:' + 40}
        graphic={'icon'}
        graphicInfo={'weather'}
      />
    </>
  );
};

export default Weather;
