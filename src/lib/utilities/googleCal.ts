import { google } from 'googleapis';

function log(level: 'info' | 'error' | 'debug', message: string, ...args: any[]) {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] [${level.toUpperCase()}] ${message}`, ...args);
}

log('info', 'Initializing Google Auth');
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
});

log('info', 'Google Auth initialized with client email:', process.env.GOOGLE_CLIENT_EMAIL);
log('debug', 'Private key length:', process.env.GOOGLE_PRIVATE_KEY?.length);

const calendar = google.calendar({ version: 'v3', auth });

export type CalendarStatus = 'available' | 'busy' | 'unavailable' | 'error';

export async function checkCalendarStatus(): Promise<CalendarStatus> {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setUTCHours(23, 59, 59, 999);

  log('info', 'Checking calendar status', { now: now.toISOString(), endOfDay: endOfDay.toISOString() });

  try {
    log('info', 'Querying Google Calendar API');
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: now.toISOString(),
        timeMax: endOfDay.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
      },
    });

    log('debug', 'Google Calendar API response:', JSON.stringify(response.data, null, 2));

    const calendars = response.data.calendars;
    if (!calendars || !process.env.GOOGLE_CALENDAR_ID) {
      log('error', 'Calendars data is missing or GOOGLE_CALENDAR_ID is not set');
      return 'error';
    }

    const calendarData = calendars[process.env.GOOGLE_CALENDAR_ID];
    if (!calendarData) {
      log('error', 'Calendar data not found for the specified GOOGLE_CALENDAR_ID');
      return 'error';
    }

    if (calendarData.errors) {
      log('error', 'Errors in calendar data:', calendarData.errors);
      return 'error';
    }

    const busySlots = calendarData.busy;
    if (!busySlots) {
      log('error', 'Busy slots data is missing');
      return 'error';
    }

    const isBusy = busySlots.some(slot => {
      if (slot.start && slot.end) {
        const startTime = new Date(slot.start);
        const endTime = new Date(slot.end);
        return startTime <= now && endTime > now;
      }
      return false;
    });

    log('info', `Busy status: ${isBusy}`);
    return isBusy ? 'busy' : 'available';
  } catch (error) {
    log('error', 'Error checking busy status:', error);
    log('error', 'Error details:', (error as any).response?.data);
    return 'error';
  }
}

export function isWithinWorkingHours(date: Date): boolean {
  const pstOffset = -7; // PST offset from UTC (TODO adjust for daylight savings)
  const hours = date.getUTCHours() + pstOffset;
  const isWithin = hours >= 9 && hours < 17;
  log('debug', 'Checking working hours', { date: date.toISOString(), pstHours: hours, isWithinWorkingHours: isWithin });
  return isWithin;
}