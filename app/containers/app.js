import * as React from 'react';
import { Table } from '../components';

export let App = React.createClass({
  render() {
    let tableData = [
      [{id: 0, symbol: 'AB'}, {id: 1, symbol: 'AC'}],
      [{id: 2, symbol: 'AD'}, {id: 3, symbol: 'AE'}],
    ];

    return (
      <div
          className="app-container"
          style={{ margin: 0, padding: 0 }}>

        <Table size={6} data={tableData}
        />

      </div>
    );
  },

  getInitialState() {
    return {};
  },
});
