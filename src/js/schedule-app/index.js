import { CALENDAR_CONFIG } from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import { BrowserRouter as Router, Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Schedule from './components/Schedule';
import Tabs from './components/Tabs';
import Now from './components/Now';

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

  handleUpdate() {
    window.scrollTo(0, 0);
  }

  constructor() {
    this.getSchedule().then(data => {
      ReactDOM.render(
          <Store data={data}>
            {store => (
              <Router onUpdate={this.handleUpdate}>
                <React.Fragment>
                  <Switch>
                    <Route exact path="/" render={() => <Now store={store} />} />
                    <Route exact path="/index.html" render={() => <Now store={store} />} />
                    <Route exact path="/schedule" render={() => <Schedule key={1} store={store} />} />
                    <Route exact path="/my-schedule" render={() => {
                      const days = store.actions.filterDays(store.days, true);
                      return <Schedule key={2} store={{ ...store, days }} />
                    }}/>
                    <Route render={() => <Redirect to="/"/>} />
                  </Switch>
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
