import * as React from 'react';
import * as R from 'ramda';
import { Table, CheckBox } from '../components';
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

let getDefaultState = () => ({
  tableSize: DEFAULT_TABLE_SIZE,
  cards: getRandomCards(DEFAULT_TABLE_SIZE),
  userCanPlay: true,
  wantHints: false,
  tries: 0,
  gameOver: false,
});

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
    let { tableSize, cards, gameOver, tries, wantHints } = this.state;
    let tableData = R.splitEvery(tableSize, cards);
    let gameOverMsg = gameOver ? 'Game Over Buddy :)' : '';

    return (
      <div
          className="app-container"
          style={{ margin: 0, padding: 0 }}>

        <Table
          onCardClick={this.handleCardClick}
          size={tableSize}
          data={tableData}
          showHints={wantHints}
        />

        <p>tries: { tries }</p>

        <CheckBox
          id="hints"
          onClick={this.handleHintsClick}
          label="need some hint"
          checked={wantHints}
        />

        <p>{ gameOverMsg }</p>

        <button onClick={this.handleResetClick}>Reset</button>
      </div>
    );
  },

  getInitialState() {
    return getDefaultState();
  },

  handleCardClick(cardId) {
    let { cards, userCanPlay } = this.state;

    // card id is same as the index so it is safe to use it to get the given card
    let card = cards[cardId];
    if (userCanPlay && canFlipCard(card)) {
      this.flipCard(card);
    }
  },

  flipCard(card) {
    let { cards } = this.state;
    cards = R.adjust(flipCard, card.id, cards);

    let twoCardsFlipped = areTwoCardsFlipped(cards);
    let userCanPlay = !twoCardsFlipped;

    let cb = twoCardsFlipped ?
      () => this.waitAndEvaluate() :
      () => {};

    this.setState({ cards, userCanPlay }, cb);
  },

  waitAndEvaluate() {
    setTimeout(() => this.evaluate(), EVALUATE_DELAY);
  },

  evaluate() {
    let { cards, tries } = this.state;
    let [card1, card2] = R.filter(isFlippedNotMatched, cards);

    let mapCard = areCardsSame(card1, card2) ? matchCard : flipCard;
    cards = R.adjust(mapCard, card1.id, cards);
    cards = R.adjust(mapCard, card2.id, cards);

    tries++;
    let gameOver = R.all(isFlipped, cards);

    this.setState({
      cards,
      gameOver,
      tries,
      userCanPlay: !gameOver
    });
  },

  handleResetClick() {
    this.setState(getDefaultState());
  },

  handleHintsClick() {
    let { wantHints } = this.state;
    this.setState({ wantHints: !wantHints });
  },

});
