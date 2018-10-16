import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const TabItem = ({ link, location, icon, children: text }) => (
  <Link
    to={link}
    className={classNames('tab-item', {'active': link === location.pathname})}
  >
    <i className="material-icons">{icon}</i>
    <label>{text}</label>
  </Link>
)

const Tabs = ({ location }) => (
  <menu className="tabs">
    <TabItem link="/" location={location} icon="calendar">
      Programação
    </TabItem>
    <TabItem link="/my-schedule" location={location} icon="calendar">
      Marcados
    </TabItem>
  </menu>
)

export default Tabs;