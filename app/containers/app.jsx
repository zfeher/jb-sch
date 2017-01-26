import * as React from 'react';
import * as R from 'ramda';
import { Table } from '../components';
import { randomizeArr } from '../common';

const MIN_TABLE_SIZE = 6;
const MAX_TABLE_SIZE = 20;
const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const EVALUATE_DELAY = 500;
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

let canFlipCard = R.both(
  R.propEq('flipped', false),
  R.propEq('matched', false)
);

let areTwoCardsFlipped = R.compose(
  R.propEq('length', 2),
  R.filter(isFlippedNotMatched),
);

let areCardsSame = R.eqProps('symbol');

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

    // card id is same as the index so it is safe to use it to get the given card
    let card = cards[cardId];

    if (canFlipCard(card)) {
      cards = R.adjust(flipCard, card.id, cards);

      let cb = areTwoCardsFlipped(cards) ?
        () => this.waitAndEvaluate() :
        () => {};

      this.setState({ cards }, cb);
    }
  },

  waitAndEvaluate() {
    setTimeout(() => this.evaluate(), EVALUATE_DELAY);
  },

  evaluate() {
    // TODO
    //  update game status

    let { cards } = this.state;
    let [card1, card2] = R.filter(isFlippedNotMatched, cards);

    let mapCard = areCardsSame(card1, card2) ? matchCard : flipCard;
    cards = R.adjust(mapCard, card1.id, cards);
    cards = R.adjust(mapCard, card2.id, cards);

    this.setState({ cards });
  },
});
