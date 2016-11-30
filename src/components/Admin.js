import React, { PropTypes as T } from 'react';
import styles from './styles.module.css';

import Train from './Train';

export class Admin extends React.Component {

  render() {
    const { trains, updateTrains } = this.props;

    return (
      <div id="wrapper">
        <h2>Manage Trains:</h2>
        <div className={styles.flexContainer}>
          {trains.map(train =>
            <Train
              key={train.id}
              {...train}
              updateTrains={updateTrains}
              canEdit={true}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Admin;