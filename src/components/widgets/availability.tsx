'use client';

import { useState, useEffect } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Calendar, Mail } from 'lucide-react';
import NavButton from '../ui/navbutton';

export default function StatusIndicator() {
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
}

// mt-6 flex items-center gap-2 small-caps font-mono font-light text-xs text-green-200 px-2.5 py-0 bg-green-950/50 rounded-full outline outline-2 outline-green-950/30 -outline-offset-1
// animate-pulse bg-green-500 rounded-full h-2 w-2 outline outline-2 -outline-offset-1 outline-green-700/50

// {
//   icon={ <Calendar {...getIconStyle(null, false)} />}
//   label={ 'Calendar'}
//   hotkey={ 'c'}
//   collapsed={ collapsed}
//   url={ 'https://cal.com/plhnk'}
// },
// {
//   icon: <Mail {...getIconStyle(null, false)} />,
//   label: 'Email',
//   hotkey: 'm',
//   collapsed: collapsed,
//   textToCopy: 'paul@hanaoka.co',
// },
// 'use client';

// import { useState, useEffect } from 'react';
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from '@/components/ui/hover-card';
// import { Calendar, Mail } from 'lucide-react';
// import NavButton from '../ui/navbutton';
// import Loading from '../ui/loading';

// export default function StatusIndicator() {
//   const [status, setStatus] = useState('Loading');
//   const [ellipsis, setEllipsis] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [reason, setReason] = useState('');

//   const iconStyle = {
//     size: 16,
//     color: 'currentColor',
//     strokeWidth: 2,
//     className:
//       'hidden sm:block self-center group-hover:text-accent group-focus-visible:text-accent/60 text-element/50',
//   };

//   useEffect(() => {
//     const fetchStatusWithDelay = async () => {
//       const startTime = Date.now();
//       console.log(
//         `[${new Date().toISOString()}] StatusIndicator: Starting status fetch`
//       );

//       try {
//         const response = await fetch('/api/status');
//         const data = await response.json();
//         const elapsedTime = Date.now() - startTime;

//         console.log(
//           `[${new Date().toISOString()}] StatusIndicator: Status received`,
//           data
//         );

//         const remainingTime = 1500 - elapsedTime;
//         if (remainingTime > 0) {
//           console.log(
//             `[${new Date().toISOString()}] StatusIndicator: Waiting for ${remainingTime}ms`
//           );
//           await new Promise((resolve) => setTimeout(resolve, remainingTime));
//         }

//         setStatus(data.status);
//         setReason(data.reason || '');
//         setIsLoading(false);
//         console.log(
//           `[${new Date().toISOString()}] StatusIndicator: Status updated to ${
//             data.status
//           }, reason: ${data.reason || 'N/A'}`
//         );
//       } catch (error) {
//         console.error(
//           `[${new Date().toISOString()}] StatusIndicator Error:`,
//           error
//         );
//         setStatus('Error');
//         setReason('Failed to retrieve status');
//         setIsLoading(false);
//       }
//     };

//     console.log(
//       `[${new Date().toISOString()}] StatusIndicator: Initial render, calling fetchStatusWithDelay`
//     );
//     fetchStatusWithDelay();

//     const intervalId = setInterval(() => {
//       console.log(
//         `[${new Date().toISOString()}] StatusIndicator: Starting periodic status check`
//       );
//       fetchStatusWithDelay();
//     }, 60000); // check status every minute

//     return () => {
//       console.log(
//         `[${new Date().toISOString()}] StatusIndicator: Cleaning up interval`
//       );
//       clearInterval(intervalId);
//     };
//   }, []);

//   // Ellipsis animation
//   useEffect(() => {
//     if (isLoading) {
//       console.log(
//         `[${new Date().toISOString()}] StatusIndicator: Starting ellipsis animation`
//       );
//       const ellipsisInterval = setInterval(() => {
//         setEllipsis((prev) => (prev < 3 ? prev + 1 : 0));
//       }, 500); // Update ellipsis every 500ms

//       return () => {
//         console.log(
//           `[${new Date().toISOString()}] StatusIndicator: Cleaning up ellipsis animation`
//         );
//         clearInterval(ellipsisInterval);
//       };
//     }
//   }, [isLoading]);

//   let outerSpanClasses = '';
//   let innerDivClasses = '';

//   switch (status) {
//     case 'busy':
//       outerSpanClasses =
//         'bg-yellow-950/50 text-yellow-200 outline-yellow-950/30';
//       innerDivClasses = 'bg-yellow-500 outline-yellow-700/50';
//       break;
//     case 'available':
//       outerSpanClasses = 'bg-green-950/50 text-green-200 outline-green-950/30';
//       innerDivClasses = 'bg-green-500 outline-green-700/50';
//       break;
//     case 'unavailable':
//       outerSpanClasses =
//         'bg-orange-950/50 text-orange-200 outline-orange-950/30';
//       innerDivClasses = 'bg-orange-500 outline-orange-700/50';
//       break;
//     case 'offline':
//       outerSpanClasses = 'bg-blue-950/50 text-blue-200 outline-blue-950/30';
//       innerDivClasses = 'bg-blue-500 outline-blue-700/50';
//       break;
//     case 'error':
//       outerSpanClasses = 'bg-red-950/50 text-red-200 outline-red-950/30';
//       innerDivClasses = 'bg-red-500 outline-red-700/50';
//       break;
//     default:
//       outerSpanClasses = 'bg-gray-950/50 text-gray-200 outline-gray-950/30';
//       innerDivClasses = 'bg-gray-500 outline-gray-700/50';
//       break;
//   }

//   console.log(
//     `[${new Date().toISOString()}] StatusIndicator: Rendering with status: ${status}, isLoading: ${isLoading}`
//   );

//   const presenceDot = (
//     <span
//       className={`animate-pulse rounded-full h-2 w-2 outline outline-2 -outline-offset-1 ${innerDivClasses}`}
//     />
//   );

//   return (
//     <HoverCard openDelay={100} closeDelay={300}>
//       <HoverCardTrigger>
//         <div
//           className={`cursor-pointer md:mt-4 lg:mt-6 flex items-center gap-2 small-caps font-mono font-light text-xs px-2.5 py-1 rounded-full outline outline-2 -outline-offset-1 ${outerSpanClasses}`}
//         >
//           {presenceDot}
//           {status}
//         </div>
//       </HoverCardTrigger>
//       <HoverCardContent
//         align="end"
//         alignOffset={0}
//         sideOffset={16}
//         className="w-64 rounded-[.75rem] pb-1"
//       >
//         <div className="flex justify-between space-x-4">
//           <div className="space-y-1">
//             <h4 className="text-sm font-semibold">
//               Let’s build something together
//             </h4>
//             <p className="text-sm font-light">
//               Send me an email or schedule a quick meeting.
//             </p>
//             <div className="flex gap-1 -m-3">
//               <NavButton
//                 minimal
//                 icon={<Calendar {...iconStyle} />}
//                 label={'Calendar'}
//                 hotkey={'c'}
//                 url={'https://cal.com/plhnk'}
//               />
//               <NavButton
//                 minimal
//                 icon={<Mail {...iconStyle} />}
//                 label={'Email'}
//                 hotkey={'m'}
//                 textToCopy="paul@hanaoka.co"
//               />
//             </div>
//           </div>
//         </div>
//       </HoverCardContent>
//     </HoverCard>
//   );
// }
