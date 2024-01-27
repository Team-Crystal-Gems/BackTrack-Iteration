import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
  },
  // user: {
  //   user_name: '',
  //   user_id: ''
  // }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleAuthStage: state => {
      state.authStage = state.authStage === 'signup' ? 'login' : 'signup';
    }
  },
  // extraReducers: builder => {
  //   builder.addCase(saveUserData.fulfilled, (state, action) => {
  //     const { user_name, user_id } = action.payload;
  //     state.user.user_name = user_name;
  //     state.user.user_id = user_id;
  //   })
  // }
});

// const saveUserData = createAsyncThunk(
//   'auth/saveUserData',
//   async (formData, authStage) => {
//     const response = await fetch(
//       `/users/${authStage}`,
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       }
//     );
//     const data = await response.json();
//     return data;
//   }
// );

export const { toggleAuthStage } = authSlice.actions;
// export { saveUserData };
export default authSlice.reducer;