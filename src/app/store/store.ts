import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "../reduxSlices/userslice";
import { api } from "../RTK_Query/rtkApi";
import { authApi } from "../RTK_Query/authApi";
import { transactionApi } from "../RTK_Query/transferApi";
import { currencyApi } from "../RTK_Query/Converter";

export const store = configureStore({
  reducer: {
    //user reducer
    user: userReducer,
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      api.middleware,
      authApi.middleware,
      transactionApi.middleware,
      currencyApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
