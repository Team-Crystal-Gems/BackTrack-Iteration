import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authStage: 'signup',
  signupProps: {
    header: 'Sign up to start listening',
    nameLabel: true,
    submitBtnLabel: 'Sign up',
  },
  loginProps: {
    header: 'Log in to BackTrack',
    nameLabel: false,
    submitBtnLabel: 'Log in',
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleAuthStage: state => {
      state.authStage = state.authStage === 'signup' ? 'login' : 'signup';
    }
  }
});

export const { toggleAuthStage } = authSlice.actions;
export default authSlice.reducer;