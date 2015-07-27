import React from 'react';
import _ from 'lodash';

import GridConstants from '../constants/GridConstants';
import GridComponent from './GridComponent';
import Clock from './widgets/clock/Clock';

/*

Widget Format

{
  widget: something here,
  x: 1,
  y: 2,
  width: 1,
  height: 1
}

*/

class GridPage extends React.Component {
  constructor() {
    super();
    this.state = {
      widgets: [{
        component: <Clock />,
        x: 2,
        y: 0
      }],
      width: GridConstants.GRID_WIDTH,
      height: GridConstants.GRID_HEIGHT
    }
  }

  get_widget_at_position(x, y) {
    let widgets = _.filter(this.state.widgets, function (widget) {
      return widget.x === x && widget.y === y;
    });

    if (_.isEmpty(widgets)) {
      return null;
    }

    return widgets[0];
  }

  create_grid() {
    let i = 0,
        j = 0,
        grid_html = [];

    for (i = 0; i < this.state.height; i++) {
      let row_cols = [];

      for (j = 0; j < this.state.width; j++) {
        let grid_column = <div className='grid-column'></div>,
            widget = this.get_widget_at_position(j, i);

        if (widget) {
          console.log(widget.component);
          grid_column = <div className='grid-column'>{ widget.component }</div>;
        }
        row_cols.push(grid_column);
      }

      grid_html.push(
        <div className='grid-row'>
          { row_cols }
        </div>
      );
    }

    return grid_html;
  }

  render() {
    let rendered_divs = this.create_grid();

    return (
      <div className='grid-container'>
        { rendered_divs }
      </div>
    );
  }

}

export default GridPage;
