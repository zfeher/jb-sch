import * as React from 'react';
import * as R from 'ramda';
import { Card } from './card';

let createCardNode = cardData => {
  let { rowSize, card } = cardData;

  return (
    <Card
      key={card.id}
      id={card.id}
      length={`calc(40vw / ${rowSize})`}
      symbol={card.symbol}
    />
  );
};

let createCardNodes = (rowSize, cards) => (
  R.compose(
    R.map(createCardNode),
    R.map(card => ({ rowSize, card }))
  )(cards)
);

export function Row(props) {
  let { size, cards } = props;

  return (
    <div
        className="row-container"
        style={{
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
          border: 'none',
        }}>
      {createCardNodes(size, cards)}
    </div>
  );
}

Row.propTypes = {
  size: React.PropTypes.number.isRequired,
  cards: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      symbol: React.PropTypes.string.isRequired,
    })
  ),
};
