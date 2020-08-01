import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import { Button } from '@react-md/button';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@react-md/dialog";
import {
  Form,
  TextField,
  Password,
} from '@react-md/form';
import { Text } from "@react-md/typography";
import { loginAsync } from '../store/authenticationReducer';
import { useToggle } from 'react-md';


export default function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { from } = location.state || { from: { pathname: '/' } };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visibleDialog, enableDialog, disableDialog] = useToggle(false);
  const [displayError, setDisplayError] = useState(null);
  const handleLogin = () => {
    dispatch(loginAsync(username, password)).then(
      isLogged => isLogged && history.replace(from),
      err => {
        setDisplayError(err);
        enableDialog();
      },
    );
  };

  return (
    <Form>
      <TextField
        id="username-field"
        label="Username"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <Password
        id="password-field"
        label="Password"
        placeholder="Super secret password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        id="login-button"
        theme="clear"
        themeType="contained"
        type="submit"
        onClick={() => handleLogin()}
      >Login</Button>

      <Dialog
        id="simple-dialog"
        visible={visibleDialog}
        onRequestClose={disableDialog}
        aria-labelledby="dialog-title"
      >
        <DialogHeader>
          <DialogTitle id="dialog-title">Login Error</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Text margin="none">{displayError && displayError.message}</Text>
        </DialogContent>
        <DialogFooter>
          <Button id="dialog-close" onClick={disableDialog}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </Form>
  );
};
