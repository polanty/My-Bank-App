import { useEffect, useRef } from "react";
import { signUserOut } from "@/app/Firebase/Firebase"; // your sign-out function
import { useDispatch } from "react-redux";
import { logout } from "@/app/reduxSlices/userslice"; // your logout action
import { useRouter } from "next/navigation";
const AUTO_LOGOUT_MINUTES = 10; // or any number of minutes

export default function useAutoSignOut() {
  const dispatch = useDispatch();
  const router = useRouter();

  const timer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      await signUserOut(); // Firebase sign out
      dispatch(logout()); // Redux state cleanup
      router.push("/");
    }, AUTO_LOGOUT_MINUTES * 60 * 1000);
  };

  useEffect(() => {
    const activityEvents = [
      "click",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
    ];
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // initialize timer on mount

    return () => {
      if (timer.current) clearTimeout(timer.current);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, []);
}
