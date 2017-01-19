import * as React from 'react';
import * as R from 'ramda';
import { Table } from '../components';

const MIN_TABLE_SIZE = 6;
const MAX_TABLE_SIZE = 20;
const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
// TODO switch back to false
const DEFAULT_FLIPPED = true;
const DEFAULT_TABLE_SIZE = MIN_TABLE_SIZE;

let getRandomTableData = size => {
  let length = size * size;
  let halfLength = Math.floor(length / 2);
  let symbols = createSymbols(halfLength);
  let pairs = symbols.concat(symbols);

  return R.compose(
    R.splitEvery(size),
    R.zipWith(
      (id, symbol) => ({
        id,
        symbol,
        flipped: DEFAULT_FLIPPED,
      }),
      R.range(0, length),
    ),
    randomizeArr,
  )(pairs);
};

// TODO to common.js
let randomizeArr = arr => (
  R.compose(
    R.pluck('item'),
    R.sortBy(R.prop('num')),
    R.zipWith(
      (num, item) => ({ num, item }),
      randomNumbers(arr.length),
    )
  )(arr)
);

// TODO to common.js
let randomNumbers = R.compose(
    R.map(() => Math.random()),
    R.range(0)
);

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

export let App = React.createClass({
  render() {
    let { tableSize, tableData } = this.state;

    return (
      <div
          className="app-container"
          style={{ margin: 0, padding: 0 }}>

        <Table size={tableSize} data={tableData}
        />

      </div>
    );
  },

  getInitialState() {
    let tableSize = DEFAULT_TABLE_SIZE;

    return {
      tableSize,
      tableData: getRandomTableData(tableSize),
    };
  },
});
