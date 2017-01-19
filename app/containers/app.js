import * as React from 'react';
import { Row } from '../components';

export default React.createClass({
  render() {
    return (
      <div
          className="app-container"
          style={{ margin: 0, padding: 0 }}>

        <Row size={6} cards={[{id: 0, symbol: 'AB'}, {id: 1, symbol: 'AC'}]}
        />

      </div>
    );
  },

  getInitialState() {
    return {};
  },
});
