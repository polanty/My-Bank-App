import { createSlice } from "@reduxjs/toolkit";

export interface initialstateInterface {
  readonly currentUser: { email: string; password: string } | null;
  readonly testselector: { email: string; password: string } | null;
}

const initialState: initialstateInterface = {
  currentUser: null,
  testselector: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    calltestselector: (state, action) => {
      state.testselector = action.payload;
    },
  },
});

export const { login, logout, calltestselector } = userSlice.actions;
export default userSlice.reducer;
