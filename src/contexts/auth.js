import React, { createContext, useReducer } from 'react';

const initialState = {
  user: localStorage.getItem('loggedUser')
};

const AuthContext = createContext({
  user: localStorage.getItem('loggedUser'),
  login: () => {}
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = () => {
    localStorage.setItem('loggedUser', true);
    dispatch({
      type: 'LOGIN',
      payload: true
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
