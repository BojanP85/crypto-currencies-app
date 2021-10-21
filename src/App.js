import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import { AuthProvider, AuthContext } from './contexts/auth';
import Header from './components/Header';
import Home from './pages/Home';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import { useWebsocket } from './util/hooks';

const App = () => {
  const { channels, setPairs } = useWebsocket({}, []);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;

    axios.get('/symbols')
      .then(res => {
        const response = res.data.filter((_, index) => index < 5);
        if (isMounted) setPairs(response);
      })
      .catch(error => {
        console.log(error)
      });

      return () => { isMounted = false };
  }, [setPairs]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Route
          exact
          path='/'
          render={props => (
            <Home {...props} channels={channels} />
          )}
        />
        <Route exact path='/details/:id' component={Details} />
        <Route exact path='/favorites' component={Favorites} />
        {!user && <Redirect from="/favorites" to="/" exact />}
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
