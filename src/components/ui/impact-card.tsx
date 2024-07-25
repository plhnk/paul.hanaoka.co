'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImpactCardProps } from '../../lib/utilities/types';
import { cn } from '../../lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

const getOutcomeColor = (outcome: ImpactCardProps['outcome']): string => {
  switch (outcome) {
    case 'positive':
      return 'text-green-500 bg-green-800/10 outline-green-900/20';
    case 'negative':
      return 'text-red-500 bg-red-800/10 outline-red-900/20';
    case 'neutral':
      return 'text-yellow-500 bg-yellow-800/10 outline-yellow-900/20';
    default:
      return 'black';
  }
};

const getArrowIcon = (arrow: ImpactCardProps['arrow']): JSX.Element | null => {
  switch (arrow) {
    case 'up':
      return <ArrowUp />;
    case 'down':
      return <ArrowDown />;
    case 'none':
      return null;
    default:
      return null;
  }
};

const getNumberModifier = (
  type: 'percentage' | 'integer'
): JSX.Element | null => {
  if (type === 'percentage') {
    return <sup style={{ marginLeft: '-0.1em' }}>&#65130;</sup>;
  }
  return null;
};

const ImpactCard: React.FC<ImpactCardProps> = ({
  className,
  content,
  extraInfo,
  outcome = 'positive',
  arrow = 'up',
  importantNumber,
  numberType = 'percentage',
  title,
  onClick,
}) => {
  const outcomeColor = outcome ? getOutcomeColor(outcome) : 'black';
  const ArrowIcon = arrow ? getArrowIcon(arrow) : null;
  const NumberModifier = getNumberModifier(numberType);

  return (
    <Card
      className={cn('min-h-fit overflow-visible min-w-48 outline-background/40', className)}
      onClick={onClick}
    >
      <CardHeader className="">
        <CardTitle className="text-pretty flex flex-col h-full">
          <span className="block small-caps text-text/80 md:max-lg:ml-4 ml-16">{title}</span>
          <span className={`flex md:max-lg:-ml-11  ${ArrowIcon ? null : 'md:max-lg:-ml-1 ml-9'}`}>
            {ArrowIcon && (
              <span
                className={`my-auto rounded-full outline-2 outline -outline-offset-2 p-2 ${outcomeColor}`}
              >
                {ArrowIcon}
              </span>
            )}
            <span className="md:max-lg:ml-3 ml-5 text-7xl lg:text-9xl !leading-normal font-thin tracking-tighter font-mono text-text">
              {importantNumber}
              {NumberModifier}
            </span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className='!pt-0'>
        <span className="md:max-lg:ml-4 text-text/60 ml-16 block">{content}</span>
      </CardContent>
    </Card>
  );
};

export default ImpactCard;
