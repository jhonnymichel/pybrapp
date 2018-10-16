import { CALENDAR_CONFIG } from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import { BrowserRouter as Router, Route, withRouter, Switch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Schedule from './components/Schedule';
import Tabs from './components/Tabs';

const TabsWithRouter = withRouter(Tabs);
class ScheduleManager {
  getSchedule() {
    const { apiKey, calendarId } = CALENDAR_CONFIG;
    const url =  encodeURI(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`);

    return new Promise((resolve) => {
      fetch(url).then((r) => r.ok ? r.json() : Promise.reject())
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
            {store => (
              <Router>
                <React.Fragment>
                  <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                  >
                    <Route exact path="/" render={() => <Schedule store={store} />} />
                    <Route exact path="/index.html" render={() => <Schedule store={store} />} />
                    <Route exact path="/my-schedule" render={() => {
                      const days = store.actions.filterDays(store.days, true);
                      return <Schedule store={{ ...store, days }} />
                    }}/>
                    <Route exact path="/settings" render={() => 'oi'} />
                  </AnimatedSwitch>
                  <TabsWithRouter/>
                </React.Fragment>
              </Router>
            )}
          </Store>,
        document.querySelector('#schedule')
      );
    });
  }
}

export default ScheduleManager;
