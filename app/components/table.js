import * as React from 'react';
import * as R from 'ramda';
import { Row } from './row';

let createRowNodes = (tableSize, tableData) => (
  R.compose(
    R.map(
      rowData => <Row key={rowData.id} size={rowData.tableSize} cards={rowData.cards} />
    ),
    R.zipWith(
      (id, cards) => ({ id, cards, tableSize }),
      R.range(0, tableSize)
    )
  )(tableData)
);

export function Table(props) {
  let { size, data } = props;

  return (
    <div
        className="table-container"
        style={{
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
          border: '1px solid #555',
          display: 'inline-block',
          backgroundColor: '#f00',
        }}>
      {createRowNodes(size, data)}
    </div>
  );
}

Table.propTypes = {
  size: React.PropTypes.number.isRequired,
  data: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        symbol: React.PropTypes.string.isRequired,
      })
    )
  ),
};
