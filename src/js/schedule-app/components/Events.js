import React from 'react';
import classNames from 'classnames';
import { getFormattedTime } from 'app/schedule-app/utils';

const EventTypes = (event, date, favorites, toggleFavorite) => {
  const isFavorite = favorites.includes(event.id);
  const classes = classNames({
    'favorite': isFavorite
  })
  return {
    ['Eventos Fixos']: (
      <h2 onClick={() => toggleFavorite(event, date)} className={classNames('schedule_name w-100', {
        'favorite': isFavorite
      })}>{event.summary}</h2>
    ),
    ['Palestra']: (
      <div onClick={() => toggleFavorite(event, date)} className={classes}>
        <h2 className="schedule_name">
          {event.summary}
          {event.details.category &&
            <span className={`schedule_category ${event.details.category.toLowerCase().replace(/\s/g, '-')}`}>
              {event.details.category}
            </span>
          }
        </h2>
        <h3 className="schedule_speaker">
          {event.details.name}
        </h3>
        <h4 className="schedule_office">
          {event.details.title}
        </h4>
        <h4 className="schedule_location">
          <i className="material-icons">location_on</i>{event.location}
        </h4>
      </div>
    ),
    ['Tutorial']: (
      <div onClick={() => toggleFavorite(event, date)} className={classes}>
        <h2 className="schedule_name">
          {event.summary}
        </h2>
        <h3 className="schedule_speaker">
          Duração: {event.details.duration}
        </h3>
        <h3 className="schedule_speaker">
          {event.details.name}
        </h3>
        <h4 className="schedule_office">
          {event.details.title}
        </h4>
        <h4 className="schedule_location">
          <i className="material-icons">location_on</i>{event.location}
        </h4>
      </div>
    ),
    ['Keynote']: (
      <div onClick={() => toggleFavorite(event, date)} className={classes}>
        <h2 className="schedule_name">
          {event.summary}
          {event.details.category &&
            <span className={`schedule_category ${event.details.category.toLowerCase().replace(/\s/g, '-')}`}>
              {event.details.category}
            </span>
          }
        </h2>
        <h3 className="schedule_speaker">
          {event.details.name}
        </h3>
        <h4 className="schedule_office">
          {event.details.title}
        </h4>
        <h4 className="schedule_location">
          <i className="material-icons">location_on</i>{event.location}
        </h4>
      </div>
    ),
    ['Sprints']: (
      <div onClick={() => toggleFavorite(event, VarDate)} className={classes}>
        <h2 className="schedule_name">
          {event.summary}
        </h2>
        <h3 className="schedule_speaker">
          {event.details.description}
        </h3>
        <h4 className="schedule_location">
          <i className="material-icons">location_on</i>{event.location}
        </h4>
      </div>
    )
  }
};

const Events = ({ scheduleInDate, favorites, toggleFavorite }) => (
  <article className="schedule_article">
    <h5 className="schedule_time">{getFormattedTime(scheduleInDate.date)}</h5>
    <div className="picture-container">
      <div className="schedule_picture">
      </div>
    </div>
    <div className="row w-100">
    {scheduleInDate.events.map(event => (
      <div key={event.id} className={classNames('schedule_info col-xl-3 col-lg-6 col-sm-12', {
        'schedule-highlight': event.details.eventType !== 'Eventos Fixos'
      })}>
        {EventTypes(event, scheduleInDate.date, favorites, toggleFavorite)[event.details.eventType]}
      </div>
    ))}
    </div>
  </article>
);

export default Events;
