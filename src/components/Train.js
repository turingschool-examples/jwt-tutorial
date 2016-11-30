import React, { PropTypes as T } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

const Train = ({ token, id, line, status, canEdit, updateTrains }) => {

  const updateStatus = (event) => {
    console.log("TOKEN: ", token);
    const value = event.target.value;
    const trainId = event.target.dataset.trainid;
    console.log("VALUE: ", value);

    fetch(`/api/v1/trains/${trainId}`, {
      method: 'PATCH',
      body: JSON.stringify({ 
        train: { status: value },
        token
      }),
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(updatedTrains => {
      updateTrains(updatedTrains);
    })
    .catch(error => console.log("ERROR: ", error));
  }

  return (
    <div className={`${styles[line]} ${styles.train}`}>
      <h3>{ line } line</h3>
      <p>{ status }</p>
      { canEdit &&
        <select data-trainid={id} onChange={e => updateStatus(e)}>
          <option value='running'>running</option>
          <option value='down'>down</option>
          <option value='delayed'>delayed</option>
          <option value='maintenance'>maintenance</option>
        </select>
      }
    </div>
  );
};

export default Train;