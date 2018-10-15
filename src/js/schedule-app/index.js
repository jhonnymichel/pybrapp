import { CALENDAR_CONFIG } from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import Schedule from './components/Schedule';

class ScheduleManager {
  getSchedule() {
    const { apiKey, calendarId } = CALENDAR_CONFIG;
    const url =  encodeURI(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`);

    return new Promise((resolve) => {
      fetch(url).then((r) => r.json())
        .then(r => {
          localStorage.setItem('cachedSchedule', JSON.stringify(r));
          resolve(r);
        })
        .catch(e => {
          const cachedScheduled = localStorage.getItem('cachedSchedule');
          if (cachedScheduled) {
            resolve(JSON.parse(cachedScheduled));
          }
          resolve({isError: true})
        });
    });
  }

  constructor() {
    this.getSchedule().then(data => {
      ReactDOM.render(
        <Store data={data}>
          {store => <Schedule store={store} />}
        </Store>,
        document.querySelector('#schedule')
      );
    });
  }
}

export default ScheduleManager;
