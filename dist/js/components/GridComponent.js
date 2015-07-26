import React from 'react';

class GridComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      valid_sizes: [{
        width: 1,
        height: 1
      }]
    }
  }
}

export default GridComponent;
