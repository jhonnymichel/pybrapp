import React from 'react';
import Loading from 'img/loading.svg';

const EmptyList = ({ message }) => (
  <div className="empty-list">
    <img src={Loading} alt="Lista vazia" width="75px" height="auto"/>
    <p className="empty-message--small">
      { message }
    </p>
  </div>
);

export default EmptyList;
