import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import CheckPhone from '../Auth/checkPhone';
import CheckSmsCode from '../Auth/checkSmsCode';
import NewService from '../newService';
import Country from '../Country';
import Direction from '../Directions';
import Cargo from '../Cargo';
import PublicRoute from '../../components/Routes/PublicRoute';
import PrivateRoute from '../../components/Routes/PrivateRoute';
import Users from '../Users';
import States from '../States';

const Index = () => {
  const history = useHistory();

  useEffect(() => {
    // if (true) {
    //   history.push('/auth/check-phone');
    // }
  }, []);
  return (
    <Layout>
      {/* <nav>
        <ul>
          <li>
            <Link to="/new-service">New Service</Link>
          </li>
        </ul>
      </nav> */}
      <Switch>
        <PublicRoute component={CheckPhone} restricted path="/auth/check-phone" exact />
        <PublicRoute component={CheckSmsCode} restricted path="/auth/login" exact />
        <PrivateRoute component={Cargo} restricted path="/" exact />
        <PrivateRoute component={Users} restricted path="/users" exact />
        <PrivateRoute component={Country} restricted path="/countries" exact />
        <PrivateRoute component={States} restricted path="/states" exact />
        <PrivateRoute component={Cargo} restricted path="/cargoes" exact />
        <PrivateRoute component={Direction} restricted path="/directions" exact />
      </Switch>
    </Layout>
  );
};

export default Index;
