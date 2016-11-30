import React, { PropTypes as T } from 'react';
import styles from './styles.module.css';

import Train from './Train';

export class Admin extends React.Component {

  render() {
    const { trains, authStatus, updateTrains } = this.props;

    return (
      <div id="wrapper">
        <h2>Manage Trains:</h2>
        <div className={styles.flexContainer}>
          {trains.map(train =>
            <Train
              key={train.id}
              {...train}
              canEdit={true}
              token={authStatus.token}
              updateTrains={updateTrains}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Admin;
