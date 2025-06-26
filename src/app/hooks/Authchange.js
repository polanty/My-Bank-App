// hooks/useAuthListener.js
"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { auth } from "../Firebase/Firebase";
import { login, logout, setLoading } from "../reduxSlices/userslice";

const useAuthListener = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Auth state changed. User:", user);
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
        router.push("/userprofile");
        dispatch(setLoading(false));
      } else {
        dispatch(logout());
        router.push("/");
      }

      dispatch(setLoading(false)); // ✅ End loading here
    });

    return () => unsubscribe();
  }, [dispatch, router]);
};

export default useAuthListener;
