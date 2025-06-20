"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { initialstateInterface } from "../reduxSlices/userslice";

export default function UserProfile() {
  const { currentUser } = useSelector(
    (state: RootState): initialstateInterface => state.user
  );

  return (
    <div className="mx-auto max-w-9/10 p-4">
      <h1>Welcome to the User Profile</h1>
      <h1>{currentUser?.displayName}</h1>
    </div>
  );
}
