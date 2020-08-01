import React from 'react';
import { useSelector } from 'react-redux';
import {
  Redirect,
  Route,
} from 'react-router-dom';
import { selectIsAuthenticated } from '../store/authenticationReducer';


// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
