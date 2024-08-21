import { NextResponse } from 'next/server';
import { checkBusyStatus } from '@/lib/utilities/googleCal';

function isWithinWorkingHours(date: Date): boolean {
  const pstOffset = -7; // PST offset from UTC (adjust for daylight saving if needed)
  const hours = date.getUTCHours() + pstOffset;
  return hours >= 9 && hours < 17; // 9 AM to 5 PM PST
}

export async function GET(request: NextRequest) {
  try {
    const now = new Date();
    
    if (!isWithinWorkingHours(now)) {
      console.log('Outside working hours');
      return NextResponse.json({ status: 'unavailable' });
    }

    const isBusy = await checkBusyStatus();

    if (isBusy === null) {
      console.error('Error checking busy status');
      return NextResponse.json({ status: 'error' }, { status: 500 });
    }

    console.log(`Current status: ${isBusy ? 'busy' : 'available'}`);
    return NextResponse.json({ status: isBusy ? 'busy' : 'available' });
  } catch (error) {
    console.error('Error in status API:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}