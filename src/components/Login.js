import React from 'react';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import {
  Button,
} from '@react-md/button';
import {
  Form,
  TextField,
  Password,
} from '@react-md/form';
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
    <Form>
      <TextField
        id="username-field"
        label="Username"
        placeholder="Username"
      />
      <Password
        id="password-field"
        label="Password"
        placeholder="Super secret password"
      />
      <Button id="login-button" theme="clear" themeType="contained" onClick={login}>Login</Button>
    </Form>
  );
};
