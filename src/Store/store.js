// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    usertype: '',
  },
    clearUserData: (state) => {
      state.email = '';
      state.usertype = '';
    },
  reducers: {
    setUserData: (state, action) => {
      state.email = action.payload.email;
      state.usertype = action.payload.usertype;
    },
  },
});


export const { setUserData ,clearUserData } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    
  },
});

export default store;
