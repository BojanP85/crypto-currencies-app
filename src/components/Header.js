import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../contexts/auth';
import { StyledHeader } from '../styles/header';
import { Button } from '../styles/button';

const Header = () => {
  const { user, login } = useContext(AuthContext);

  const renderFavoritesLink = () => {
    return user && (
      <h1>
        <NavLink to='/favorites'>Favorites</NavLink>
      </h1>
    );
  };

  const renderLoginButton = () => {
    return !user && <Button onClick={login}>Login</Button>;
  };

  return (
    <StyledHeader>
      <div>
        <h1>
          <NavLink to='/' exact={true}>Home</NavLink>
        </h1>
        {renderFavoritesLink()}
      </div>
      {renderLoginButton()}
    </StyledHeader>
  );
};

export default Header;
