export type CalendarStatus = 'available' | 'busy' | 'unavailable' | 'error';

const CALENDAR_STATUS_TTL_MS = 60_000;

let cachedCalendarStatus:
  | {
      status: CalendarStatus;
      expiresAt: number;
    }
  | undefined;

async function getCalendarClient() {
  const { google } = await import('googleapis');

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  });

  return google.calendar({ version: 'v3', auth });
}

export async function checkCalendarStatus(): Promise<CalendarStatus> {
  if (
    cachedCalendarStatus &&
    cachedCalendarStatus.expiresAt > Date.now()
  ) {
    return cachedCalendarStatus.status;
  }

  if (
    !process.env.GOOGLE_CALENDAR_ID ||
    !process.env.GOOGLE_CLIENT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY
  ) {
    return 'error';
  }

  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setUTCHours(23, 59, 59, 999);

  try {
    const calendar = await getCalendarClient();
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: now.toISOString(),
        timeMax: endOfDay.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
      },
    });

    const calendars = response.data.calendars;
    if (!calendars) {
      return 'error';
    }

    const calendarData = calendars[process.env.GOOGLE_CALENDAR_ID];
    if (!calendarData || calendarData.errors || !calendarData.busy) {
      return 'error';
    }

    const isBusy = calendarData.busy.some((slot) => {
      if (slot.start && slot.end) {
        const startTime = new Date(slot.start);
        const endTime = new Date(slot.end);
        return startTime <= now && endTime > now;
      }
      return false;
    });

    const status = isBusy ? 'busy' : 'available';
    cachedCalendarStatus = {
      status,
      expiresAt: Date.now() + CALENDAR_STATUS_TTL_MS,
    };

    return status;
  } catch {
    return 'error';
  }
}

export function isWithinWorkingHours(date: Date): boolean {
  const pacificHour = Number(
    new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      hour12: false,
      timeZone: 'America/Los_Angeles',
    }).format(date)
  );

  return pacificHour >= 9 && pacificHour < 17;
}
