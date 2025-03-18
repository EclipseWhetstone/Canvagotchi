const CALENDAR_API = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getCalendarEvents') {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      fetch(`${CALENDAR_API}?timeMin=${new Date().toISOString()}&singleEvents=true`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(r => {
        if (!r.ok) throw new Error('Calendar API failed');
        return r.json();
      })
      .then(data => sendResponse({
        events: data.items.filter(e => e.summary?.match(/assignment|homework/i))
      }))
      .catch(error => {
        console.error('Calendar error:', error);
        sendResponse({ error: 'Calendar unavailable' });
      });
    });
    return true;
  }
});
