import React from 'react';
import Events from './Events';
import moment from 'moment-timezone';
import logo from 'img/logo_horizontal.svg';
import { Link } from 'react-router-dom';

function getNow(days) {
  const today = moment().tz('America/Fortaleza').date();
  const day = days[today];
  if (day) {
    const currentDate = moment().tz('America/Fortaleza').toDate().getTime();
    for (let eventKey = 0; eventKey < day.length; eventKey++) {
      const { date } = day[eventKey];
      let nextDate;
      if (day[eventKey+1]) {
        nextDate = day[eventKey+1].date;
      } else {
        nextDate = { getTime: () => date.getTime() + 30 * 60 * 1000 };
      }

      if (currentDate >= date.getTime() && currentDate < nextDate.getTime()) {
        return day[eventKey];
      }
    }
  }
}

function getNext(days) {
  const today = moment().tz('America/Fortaleza').date();
  const day = days[today];
  if (day) {
    const currentDate = moment().tz('America/Fortaleza').toDate().getTime();
    for (let eventKey = 0; eventKey < day.length; eventKey++) {
      if (eventKey+1 < day.length) {
        const { date } = day[eventKey];
        const { date: nextDate } = day[eventKey+1]

        if (currentDate >= date.getTime() && currentDate < nextDate.getTime()) {
          return day[eventKey+1];
        }
      }
    }
  }
}

function EventsOrEmpty(props) {
  if (props.scheduleInDate) {
    return <Events { ...props } />
  }

  return (
    <h3 className="empty-message--small">
      {props.emptyMessage}
    </h3>
  )
}

const Now = ({ store: { fullSchedule: days, favorites, actions: { toggleFavorite }} }) => (
  <div>
    <div className="app-bar">
      <h2>Python Brasil 14</h2>
    </div>
    <div className="app-bar-compensator" aria-hidden="true">
    </div>
    <img src={logo} width="70%" style={{maxWidth: 300, display: 'block', margin: '10px auto'}} height="auto" alt="Python Brasil 2018, edição 14 Logo"/>
    <h3 className="day-separator tab-link">
      Rolando agora
    </h3>
    <EventsOrEmpty emptyMessage="Nada rolando agora :(" scheduleInDate={getNow(days)} favorites={favorites} toggleFavorite={toggleFavorite}/>
    <h3 className="day-separator tab-link">
      Em seguida
    </h3>
    <EventsOrEmpty emptyMessage="Isso é tudo por hoje. Hora de curtir o happy hour!" scheduleInDate={getNext(days)} favorites={favorites} toggleFavorite={toggleFavorite} />
    <div className="intern-page-content event-button-area">
      <div className="sponsor-button snake-button">
        <Link to="/schedule" className="pybr-button">
          <span>Monte sua</span> programação
        </Link>
      </div>
    </div>
  </div>
);

export default Now;