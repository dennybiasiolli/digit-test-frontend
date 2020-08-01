import React from 'react';
import { useDispatch } from 'react-redux';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import { Button } from '@react-md/button';
import {
  Form,
  TextField,
  Password,
} from '@react-md/form';
import { loginAsync } from '../store/authenticationReducer';


export default function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { from } = location.state || { from: { pathname: '/' } };
  const handleLogin = () => {
    dispatch(loginAsync()).then(
      isLogged => isLogged && history.replace(from)
    );
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
      <Button
        id="login-button"
        theme="clear"
        themeType="contained"
        onClick={() => handleLogin()}
      >Login</Button>
    </Form>
  );
};
