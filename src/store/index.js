import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authenticationReducer';
import counterReducer from '../features/counter/counterSlice';


let persistedState;
try {
  const serializedState = localStorage.getItem('digit-store-state');
  if (serializedState === null) {
    persistedState = undefined;
  }
  persistedState = JSON.parse(serializedState) || undefined;
} catch (err) {
  persistedState = undefined;
}

const store = configureStore({
  preloadedState: persistedState,
  reducer: {
    authentication: authenticationReducer,
    counter: counterReducer,
  },
});

store.subscribe(() => {
  try {
    const serializedState = JSON.stringify(store.getState());
    localStorage.setItem('digit-store-state', serializedState);
  } catch {
    // ignore write errors
  }
});

export default store;
