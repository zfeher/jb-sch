import * as R from 'ramda';

let randomNumbers = R.compose(
    R.map(() => Math.random()),
    R.range(0)
);

export let randomizeArr = arr => (
  R.compose(
    R.pluck('item'),
    R.sortBy(R.prop('num')),
    R.zipWith(
      (num, item) => ({ num, item }),
      randomNumbers(arr.length),
    )
  )(arr)
);
