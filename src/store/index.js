import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authenticationReducer';
import counterReducer from '../features/counter/counterSlice';

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    counter: counterReducer,
  },
});
