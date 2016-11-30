import React, { PropTypes as T } from 'react';
import styles from './styles.module.css';

import Train from './Train';

export class Home extends React.Component {
  render() {
    const { trains } = this.props;

    return (
      <div id="wrapper">
        <h2>Current Status of All Train Lines:</h2>
        <div className={styles.flexContainer}>
          {trains.map(train =>
            <Train
              key={train.id}
              {...train}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Home;
