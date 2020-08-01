import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
    userData: {},
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = !!action.payload;
      state.userData = action.payload || {};
    },
  },
});

export const { login } = authenticationSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(loginAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loginAsync = (username, password) => async dispatch => {
  const response = await fetch('http://localhost:4000/users/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const userData = await response.json();
  if (response.ok) {
    dispatch(login(userData));
    return userData;
  } else {
    dispatch(login(null));
    throw userData;
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectIsAuthenticated = state => state.authentication.isAuthenticated;
export const selectUserData = state => state.authentication.userData;

export default authenticationSlice.reducer;
