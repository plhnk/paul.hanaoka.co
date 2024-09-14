'use client';
import { useState, useEffect } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Calendar, Mail } from 'lucide-react';
import NavButton from '../ui/navbutton';
import ErrorBoundary from '@/lib/utilities/ErrorBoundary';

const StatusIndicatorContent: React.FC = () => {
  const [status, setStatus] = useState('Loading...');
  const [reason, setReason] = useState('');

  const iconStyle = {
    size: 16,
    color: 'currentColor',
    strokeWidth: 2,
    className:
      'hidden sm:block self-center group-hover:text-accent group-focus-visible:text-accent/60 text-element/50',
  };

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch('/api/status');
        const data = await response.json();
        setStatus(data.status);
        setReason(data.reason || ''); // Set reason if provided
      } catch (error) {
        console.error('Error fetching status:', error);
        setStatus('Error');
        setReason('Failed to retrieve status');
      }
    }

    fetchStatus();

    // Optionally set up an interval to refresh status periodically
    const intervalId = setInterval(fetchStatus, 60000); // every minute

    return () => clearInterval(intervalId);
  }, []);

  // Determine the styles for the outer span and inner div based on the status
  let outerSpanClasses = '';
  let innerDivClasses = '';

  switch (status) {
    case 'busy':
      outerSpanClasses =
        'bg-yellow-950/50 text-yellow-200 outline-yellow-950/30';
      innerDivClasses = 'bg-yellow-500 outline-yellow-700/50';
      break;
    case 'available':
      outerSpanClasses = 'bg-green-950/50 text-green-200 outline-green-950/30';
      innerDivClasses = 'bg-green-500 outline-green-700/50';
      break;
    case 'unavailable':
      outerSpanClasses =
        'bg-orange-950/50 text-orange-200 outline-orange-950/30';
      innerDivClasses = 'bg-orange-500 outline-orange-700/50';
      break;
    case 'offline':
      outerSpanClasses = 'bg-blue-950/50 text-blue-200 outline-blue-950/30';
      innerDivClasses = 'bg-blue-500 outline-blue-700/50';
      break;
    case 'error':
      outerSpanClasses = 'bg-red-950/50 text-red-200 outline-red-950/30';
      innerDivClasses = 'bg-red-500 outline-red-700/50';
      break;
    default:
      outerSpanClasses = 'bg-gray-950/50 text-gray-200 outline-gray-950/30';
      innerDivClasses = 'bg-gray-500 outline-gray-700/50';
      break;
  }

  return (
    <HoverCard openDelay={100} closeDelay={300}>
      <HoverCardTrigger>
        <div
          className={`cursor-pointer md:mt-4 lg:mt-6 flex items-center gap-2 small-caps font-mono font-light text-xs px-2.5 py-1 rounded-full outline outline-2 -outline-offset-1 ${outerSpanClasses}`}
        >
          <span
            className={`animate-pulse rounded-full h-2 w-2 outline outline-2 -outline-offset-1 ${innerDivClasses}`}
          />{' '}
          {status}
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        align="end"
        alignOffset={0}
        sideOffset={16}
        className="w-64 rounded-[.75rem] pb-1"
      >
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">
              Let’s build something together
            </h4>
            <p className="text-sm font-light">
              Send me an email or schedule a quick meeting.
            </p>
            <div className="flex gap-1 -m-3">
              <NavButton
                minimal
                icon={<Calendar {...iconStyle} />}
                label={'Calendar'}
                hotkey={'c'}
                url={'https://cal.com/plhnk'}
              />
              <NavButton
                minimal
                icon={<Mail {...iconStyle} />}
                label={'Email'}
                hotkey={'m'}
                textToCopy="paul@hanaoka.co"
              />
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const ErrorFallback: React.FC = () => <div>error</div>;

export default function StatusIndicator() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <StatusIndicatorContent />
    </ErrorBoundary>
  );
}
