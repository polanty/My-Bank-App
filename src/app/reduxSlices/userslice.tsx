import { createSlice } from "@reduxjs/toolkit";

export interface initialstateInterface {
  readonly currentUser: {
    email: string;
    password: string;
    displayName: string;
  } | null;
  readonly testselector: { email: string; password: string } | null;
  readonly loading: boolean;
}

const initialState: initialstateInterface = {
  currentUser: null,
  loading: true,
  testselector: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
    },
    calltestselector: (state, action) => {
      state.testselector = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, calltestselector, setLoading } =
  userSlice.actions;
export default userSlice.reducer;
