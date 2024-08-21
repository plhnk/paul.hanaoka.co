import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
});

const calendar = google.calendar({ version: 'v3', auth });

export async function checkBusyStatus() {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setUTCHours(23, 59, 59, 999);

  try {
    console.log('Querying Google Calendar API');
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: now.toISOString(),
        timeMax: endOfDay.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
      },
    });

    console.log('Google Calendar API response:', JSON.stringify(response.data, null, 2));

    const busySlots = response.data.calendars[process.env.GOOGLE_CALENDAR_ID].busy;
    const isBusy = busySlots.some(slot => 
      new Date(slot.start) <= now && new Date(slot.end) > now
    );

    console.log(`Busy status: ${isBusy}`);
    return isBusy;
  } catch (error) {
    console.error('Error checking busy status:', error);
    console.error('Error details:', error.response?.data);
    return null;
  }
}