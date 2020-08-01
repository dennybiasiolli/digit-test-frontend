import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
    userToken: '',
    userData: null,
  },
  reducers: {
    login: (state, action) => {
      const { token } = action.payload;
      state.isAuthenticated = !!action.payload;
      state.userToken = token;
    },

    logout: state => {
      state.isAuthenticated = false;
      state.userToken = '';
      state.userData = null;
    },

    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, setUserData } = authenticationSlice.actions;

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
    dispatch(getUserInfoAsync());
    return userData;
  } else {
    dispatch(logout());
    throw userData;
  }
};

export const getUserInfoAsync = () => async (dispatch, getState) => {
  const { userToken } = getState().authentication;
  const response = await fetch('http://localhost:4000/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    },
  });
  const userData = await response.json();
  if (response.ok) {
    dispatch(setUserData(userData));
    return userData;
  } else {
    throw userData;
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectIsAuthenticated = state => state.authentication.isAuthenticated;
export const selectUserData = state => state.authentication.userData;

export default authenticationSlice.reducer;
