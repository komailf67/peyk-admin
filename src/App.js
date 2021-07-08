import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, withRouter } from 'react-router-dom';
import Routing from './pages/Routing/index';
import { store } from './redux/store';
import history from './utils/history';
import Notification from './components/notification';

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Notification />
        <Routing />
      </Router>
    </Provider>
  );
};

export default App;
