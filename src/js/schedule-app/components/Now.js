import React from 'react';
import Events from './Events';
import moment from 'moment-timezone';

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
    <h3 className="day-separator tab-link">
      Rolando agora
    </h3>
    <EventsOrEmpty emptyMessage="Nada rolando agora :(" scheduleInDate={getNow(days)} favorites={favorites} toggleFavorite={toggleFavorite}/>
    <h3 className="day-separator tab-link">
      Em seguida
    </h3>
    <EventsOrEmpty emptyMessage="Isso é tudo por hoje, pessoal! :)" scheduleInDate={getNext(days)} favorites={favorites} toggleFavorite={toggleFavorite} />
    <p className="empty-message">
      Confira nossa programação completa e crie seu roteiro na aba Programação!
    </p>
  </div>
);

export default Now;