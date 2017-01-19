import * as React from 'react';

const DEFAULT_LENGTH = 30;
const DEFAULT_CARD_SIZE = DEFAULT_LENGTH * 1.5;
const DEFAULT_FONT_SIZE = DEFAULT_LENGTH - 4;

export function Card(props) {
  let { id, symbol, flipped, onClick } = props;
  let opacity = flipped ? 1 : 0;

  return (
    <div
        id={`card-${id}`}
        onClick={() => onClick(id)}
        className="card-container"
        style={{
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
          display: 'inline-block',
          width: `${DEFAULT_CARD_SIZE}px`,
          height: `${DEFAULT_CARD_SIZE}px`,
          backgroundColor: '#fff',
          border: '1px solid #555',
          verticalAlign: 'middle',
          lineHeight: `${DEFAULT_LENGTH}px`,
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: `${DEFAULT_FONT_SIZE}px`,
          opacity,
        }}>
      {symbol}
    </div>
  );
}

Card.propTypes = {
  id: React.PropTypes.number.isRequired,
  symbol: React.PropTypes.string.isRequired,
  flipped: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func,
};

Card.defaultProps = {
  onClick: () => {},
};
