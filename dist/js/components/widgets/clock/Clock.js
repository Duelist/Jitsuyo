import React from 'react';
import moment from 'moment-timezone';

class Clock extends React.Component {
  constructor() {
    super();
  }

  render() {
    let current_time = moment().format('h:mm A');
    return (
      <div>
        { current_time }
      </div>
    );
  }
}

export default Clock;
