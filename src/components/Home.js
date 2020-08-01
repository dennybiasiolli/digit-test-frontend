import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@react-md/button';
import {
  Form,
} from '@react-md/form';
import {
  selectUserData,
  getUserInfoAsync,
  logout,
} from '../store/authenticationReducer';


export default function () {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  useEffect(() => {
    dispatch(getUserInfoAsync());
  }, [dispatch]);

  return (
    <Form>
      {
        userData && <h1>Hello {userData.firstName} {userData.lastName}!</h1>
      }
      {
        !userData && <h1>Loading user's data...</h1>
      }
      <Button
        id="login-button"
        theme="clear"
        themeType="contained"
        type="submit"
        onClick={() => dispatch(logout())}
      >Logout</Button>
    </Form>
  );
}
