import * as React from 'react';
import * as R from 'ramda';
import { Row } from './row';

let createRowNodes = (tableSize, tableData, onCardClick) => (
  R.compose(
    R.map(
      rowData => <Row key={rowData.id} size={rowData.tableSize} cards={rowData.cards} onCardClick={onCardClick} />
    ),
    R.zipWith(
      (id, cards) => ({ id, cards, tableSize }),
      R.range(0, tableSize)
    )
  )(tableData)
);

export function Table(props) {
  let { size, data, onCardClick } = props;

  return (
    <div
        className="table-container"
        style={{
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
          border: '1px solid #555',
          display: 'inline-block',
          backgroundColor: '#fff',
        }}>
      {createRowNodes(size, data, onCardClick)}
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
        flipped: React.PropTypes.bool.isRequired,
      })
    )
  ),
  onCardClick: React.PropTypes.func,
};

Table.defaultProps = {
  onCardClick: () => {},
};
