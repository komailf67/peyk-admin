import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import baseInfoSaga from './baseInfoSaga';
import cargoSaga from './cargoSaga';
import countrySaga from './countrySaga';
import directionSaga from './directionSaga';

export default function* rootSaga() {
  yield all([authSaga(), baseInfoSaga(), cargoSaga(), countrySaga(), directionSaga()]);
}

/* eslint-disable no-console */
/* eslint-disable func-names */
// import { all, call, delay, spawn } from 'redux-saga/effects';
// import authSaga from './authSaga';

// const makeRestartable = (saga) =>
//   function* () {
//     yield spawn(function* () {
//       while (true) {
//         // console.log('x');
//         try {
//           // root saga treminated
//           yield call(saga);
//         } catch (e) {
//           // an saga ran into error and stop working restart it
//           console.error('Saga error, the saga will be restarted', e);
//         }
//         // prevent infinite loop
//         yield delay(1000);
//       }
//     });
//   };

// const rootSagas = [authSaga].map(makeRestartable);

// export function* rootSaga() {
//   yield all(rootSagas.map((saga) => call(saga)));
// }
