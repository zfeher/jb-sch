import * as React from 'react';
import * as R from 'ramda';
import { Card } from './card';

let createCardNode = R.curry(
  (onCardClick, cardData) => {
    let { card } = cardData;

    return (
      <Card
        key={card.id}
        id={card.id}
        symbol={card.symbol}
        flipped={card.flipped}
        onClick={onCardClick}
      />
    );
  }
);

let createCardNodes = (rowSize, cards, onCardClick) => (
  R.compose(
    R.map(createCardNode(onCardClick)),
    R.map(card => ({ rowSize, card }))
  )(cards)
);

export function Row(props) {
  let { size, cards, onCardClick } = props;

  return (
    <div
        className="row-container"
        style={{
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
          border: 'none',
        }}>
      {createCardNodes(size, cards, onCardClick)}
    </div>
  );
}

Row.propTypes = {
  size: React.PropTypes.number.isRequired,
  cards: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      symbol: React.PropTypes.string.isRequired,
      flipped: React.PropTypes.bool.isRequired,
    })
  ),
  onCardClick: React.PropTypes.func,
};

Row.defaultProps = {
  onCardClick: () => {},
};
