import { createSlice } from '@reduxjs/toolkit';

const mockedUserData = {
  id: 1,
  username: 'admin',
  firstName: 'Administrator',
  lastName: 'Generic',
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
    userData: {},
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    logout: state => {
      state.isAuthenticated = true;
      state.userData = {};
    }
  },
});

export const { login } = authenticationSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(loginAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loginAsync = () => dispatch => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      dispatch(login(mockedUserData));
      resolve(mockedUserData);
    }, 1000);
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectIsAuthenticated = state => state.authentication.isAuthenticated;
export const selectUserData = state => state.authentication.userData;

export default authenticationSlice.reducer;
