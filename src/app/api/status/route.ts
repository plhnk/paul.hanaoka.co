import { NextResponse } from 'next/server';
import {
  checkCalendarStatus,
  isWithinWorkingHours,
  CalendarStatus,
} from '@/lib/utilities/googleCal';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const now = new Date();

    if (!isWithinWorkingHours(now)) {
      // console.log('Outside working hours');
      return NextResponse.json({
        status: 'offline',
        reason: 'outside working hours',
      });
    }

    const calendarStatus = await checkCalendarStatus();

    let status: CalendarStatus;
    let reason: string | undefined;

    switch (calendarStatus) {
      case 'busy':
        status = 'busy';
        reason = 'in a meeting';
        break;
      case 'available':
        status = 'available';
        break;
      case 'error':
        status = 'error';
        reason = 'calendar error';
        break;
      default:
        status = 'unavailable';
        reason = 'nunya business';
    }

    // console.log(
    //   `Current status: ${status}${reason ? `, reason: ${reason}` : ''}`
    // );
    return NextResponse.json({ status, reason });
  } catch (error: unknown) {
    console.error('Error in status API:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { status: 'error', reason: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { status: 'error', reason: 'An unknown error in the calendar route occurred' },
        { status: 500 }
      );
    }
  }
}
