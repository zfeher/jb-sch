import * as React from 'react';
import { Card } from '../components';

export default React.createClass({
  render() {
    return (
      <div
          className="app-container"
          style={{ margin: 0, padding: 0 }}>

          <Card
            key={123} // card id
            id={123} // card id
            length={`calc(40vw / ${6})`} // deck size
            symbol={'A'} // [A..T]uvwxyz
          />

      </div>
    );
  },

  getInitialState() {
    return {};
  },
});
