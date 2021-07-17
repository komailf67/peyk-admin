import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import 'regenerator-runtime/runtime';
import rootReducer from './reducers/rootReducer';
import rootSaga from './saga';
import throttle from 'lodash.throttle';

function* exampleSaga() {
  console.log('Example saga reached');
}

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
// store.subscribe(
//   throttle(() => {
//     // just persist part of store
//     const { locale, auth } = store.getState();
//     const authModified = { ...auth };
//     delete authModified.authModalStatus; // prevent to save authModalStatus in localstorage
//     storage.persistState({
//       locale,
//       auth: authModified,
//     });
//   }, 1000)
// );
sagaMiddleware.run(rootSaga);
