import * as React from 'react';

export function Card(props) {
  const { id, symbol, length } = props;

  return (
    <div
        id={`card-${id}`}
        className="card-container"
        style={{
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
          display: 'inline-block',
          width: length,
          height: length,
          backgroundColor: '#fff',
          border: '1px solid #555',
          verticalAlign: 'middle',
          lineHeight: length,
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: length,
        }}>
      {symbol}
    </div>
  );
}

Card.propTypes = {
  id: React.PropTypes.number.isRequired,
  symbol: React.PropTypes.string.isRequired,
  length: React.PropTypes.string.isRequired,
};

Card.defaultProps = {
};
