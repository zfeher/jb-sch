import * as React from 'react';
import * as R from 'ramda';
import { Card } from './card';

let createCardNode = R.curry(
  (onCardClick, showHints, cardData) => {
    let { card } = cardData;
    let opacity = card.flipped ? 1 : (showHints ? 0.2 : 0);

    return (
      <Card
        key={card.id}
        id={card.id}
        symbol={card.symbol}
        onClick={onCardClick}
        opacity={opacity}
      />
    );
  }
);

let createCardNodes = (rowSize, cards, onCardClick, showHints) => (
  R.compose(
    R.map(createCardNode(onCardClick, showHints)),
    R.map(card => ({ rowSize, card }))
  )(cards)
);

export let Row = props => {
  let { size, cards, onCardClick, showHints } = props;

  return (
    <div
        className="row-container"
        style={{
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
          border: 'none',
        }}>
      {createCardNodes(size, cards, onCardClick, showHints)}
    </div>
  );
};

Row.propTypes = {
  size: React.PropTypes.number.isRequired,
  showHints: React.PropTypes.bool,
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
  showHints: false,
};
