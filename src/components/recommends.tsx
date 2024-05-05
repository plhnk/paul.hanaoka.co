'use client';
import React, { useEffect, useState } from 'react';
import { RecommendsProps } from '@/lib/utilities/types';
import Link from 'next/link';
import recommendsData from '@/lib/data/recommends.json';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const Recommends: React.FC = () => {
  const [recommends, setRecommends] = useState<RecommendsProps[]>([]);

  useEffect(() => {
    setRecommends(recommendsData);
  }, []);

  const groupedRecommends = recommends.reduce(
    (groups: { [key: string]: RecommendsProps[] }, item) => {
      const group = groups[item.category] || [];
      group.push(item);
      groups[item.category] = group;
      return groups;
    },
    {}
  );

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.pageYOffset - 140;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-y-32 my-48 main-content">
      <div className="bg-background/20 backdrop-blur-lg py-4 sticky top-11 z-30 w-full flex justify-between">
        {Object.keys(groupedRecommends).map((category) => (
          <button onClick={() => scrollTo(category)} key={category}>
            {category}
          </button>
        ))}
      </div>
      {Object.entries(groupedRecommends).map(([category, recommends]) => (
        <div key={category} id={category}>
          <ul className="gap-y-32">
            {recommends.map((recommend, index) => (
              <li className="text-text" key={index}>
                <Card className="flex-row bg-background">
                  <div className="order-2 z-10">
                    <CardHeader>
                      <CardTitle>
                        <a href={recommend.url}>{recommend.label}</a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="max-w-[60ch]">
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
        </div>
      ))}
    </div>
  );
};

export default Recommends;
