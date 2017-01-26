import * as React from 'react';
import * as R from 'ramda';
import { Table } from '../components';
import { randomizeArr } from '../common';

const MIN_TABLE_SIZE = 6;
const MAX_TABLE_SIZE = 20;
const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const DEFAULT_FLIPPED = false;
const DEFAULT_MATCHED = false;
const DEFAULT_TABLE_SIZE = MIN_TABLE_SIZE;

let getRandomCards = size => {
  let length = size * size;
  let halfLength = Math.floor(length / 2);
  let symbols = createSymbols(halfLength);
  let pairs = symbols.concat(symbols);

  return R.compose(
    R.zipWith(
      (id, symbol) => ({
        id,
        symbol,
        flipped: DEFAULT_FLIPPED,
        matched: DEFAULT_MATCHED,
      }),
      R.range(0, length),
    ),
    randomizeArr,
  )(pairs);
};

// TODO to FP style
let createSymbols = length => {
  let symbols = [];
  let num = 0;
  let i = 0;

  while (i < SYMBOLS.length) {
    let first = SYMBOLS[i];
    let j = 0;
    while (num < length && j < SYMBOLS.length) {
      let second = SYMBOLS[j];
      symbols.push(`${first}${second}`);
      num++;
      j++;
    }
    i++;
  }

  return symbols;
};

let flipCard = R.evolve({ flipped: R.not });
let matchCard = R.assoc('matched', true);
let isFlipped = R.propEq('flipped', true);
let isMatched = R.propEq('matched', true);
let isNotMatched = R.complement(isMatched);
let isFlippedNotMatched = R.both(isFlipped, isNotMatched);

export let App = React.createClass({
  render() {
    let { tableSize, cards } = this.state;
    let tableData = R.splitEvery(tableSize, cards);

    return (
      <div
          className="app-container"
          style={{ margin: 0, padding: 0 }}>

        <Table
          size={tableSize}
          data={tableData}
          onCardClick={this.handleCardClick}
        />
      </div>
    );
  },

  getInitialState() {
    let tableSize = DEFAULT_TABLE_SIZE;

    return {
      tableSize,
      cards: getRandomCards(tableSize),
    };
  },

  handleCardClick(cardId) {
    let { cards } = this.state;

    // card id is same as the index so it is safe to use it for modification of
    //  the given card
    cards = R.adjust(flipCard, cardId, cards);

    // TODO refact a bit
    let flippedCards = R.filter(isFlippedNotMatched, cards);
    if (flippedCards.length == 2) {
      let card1 = R.head(flippedCards);
      let card2 = R.last(flippedCards);

      if (card1.symbol === card2.symbol) {
        cards = R.compose(
          R.reduce(
            (cards, cardId) => R.adjust(matchCard, cardId, cards),
            cards
          ),
          R.pluck('id'),
        )(flippedCards);
      } else {
        cards = R.compose(
          R.reduce(
            (cards, cardId) => R.adjust(flipCard, cardId, cards),
            cards
          ),
          R.pluck('id'),
        )(flippedCards);
      }
    }

    this.setState({ cards });
  },
});
