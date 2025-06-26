"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";

import useAuthListener from "../hooks/Authchange";
import useAutoSignOut from "../Utils/Components/SignOutAuto";

// 👇 Separate wrapper that uses the hook inside Redux Provider
function AuthListenerWrapper({ children }: { children: React.ReactNode }) {
  useAuthListener();
  useAutoSignOut();
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthListenerWrapper>{children}</AuthListenerWrapper>
    </Provider>
  );
}
