"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
//import useAuthListener from "../hooks/Authchange";

export function Providers({ children }: { children: React.ReactNode }) {
  //useAuthListener(); //  Listen to firebase auth state change
  return <Provider store={store}>{children}</Provider>;
}
