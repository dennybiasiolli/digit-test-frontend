import React from 'react';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import fakeAuth from '../utility/auth';


export default function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: '/' } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in</p>
      <button onClick={login}>Log in</button>
    </div>
  );
};
