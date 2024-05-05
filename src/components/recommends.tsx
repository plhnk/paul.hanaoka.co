'use client';
import React, { useEffect, useState } from 'react';
import { RecommendsProps } from '@/lib/utilities/types';

import recommendsData from '@/lib/data/recommends.json';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const Recommends: React.FC = () => {
  const [recommends, setRecommends] = useState<RecommendsProps[]>([]);

  useEffect(() => {
    setRecommends(recommendsData);
  }, []);

  return (
    <ul className="main-content flex flex-col gap-y-32 my-64">
      {recommends.map((recommend, index) => (
        <li className="text-text" key={index}>
          <Card className="flex-row bg-background">
            <div className="order-2 z-10">
              <CardHeader>
                <CardTitle>
                  <a href={recommend.url}>{recommend.label}</a>
                </CardTitle>
              </CardHeader>
              <CardContent className='max-w-[60ch]'>
                <p>{recommend.description}</p>
                {/* <a href={recommend.url}>{recommend.referralDescription}</a> */}
                {/* <div>{recommend.category}</div> */}
                {recommend.tags && (
                  <div className="flex gap-x-2 mt-2">
                    {recommend.tags.map((tag, index) => (
                      <div
                        className="rounded-full px-3 py-1 bg-background/50 text-element text-sm"
                        key={index}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </div>
            <div className="rounded-md flex w-1/6 min-w-40 items-center justify-center relative order-1">
              <img
                src={recommend.url + '/favicon.ico'}
                className="w-7 h-7 rounded-md z-10"
              />
              <div
                className="absolute inset-0 blur-3xl"
                style={{
                  background: `url(${recommend.url}/favicon.ico) no-repeat center/cover`,
                }}
              />
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default Recommends;
