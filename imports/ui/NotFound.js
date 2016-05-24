import React from 'react';

export const NotFound = () => (

  <div className="not-found">
    <strong>Error [404]</strong>: { window.location.pathname } does not exist.
    <div className="not-found-pic"></div>
  </div>


);