"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "../Firebase/Firebase";
import { login, logout, setLoading } from "../reduxSlices/userslice";

const useAuthListener = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            isactive: true,
          })
        );

        if (pathname === "/signInpage" || pathname === "/signUp") {
          router.replace("/userprofile");
        }
      } else {
        dispatch(logout());

        if (pathname.startsWith("/userprofile")) {
          router.replace("/signInpage");
        }
      }

      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch, pathname, router]);
};

export default useAuthListener;
