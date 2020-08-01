import React from 'react';
import {
  Form,
} from '@react-md/form';
import { useSelector } from 'react-redux';
import { selectUserData } from '../store/authenticationReducer';


export default function () {
  const userData = useSelector(selectUserData);
  return (
    <Form>
      <h1>Hello {userData.firstName} {userData.lastName}!</h1>
    </Form>
  );
}
