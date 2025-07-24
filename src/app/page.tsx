"use client";

//import useAuthListener from "./hooks/Authchange";
import Link from "next/link";
import { useGetUsersQuery } from "./RTK_Query/rtkApi";
import {
  createNewUserWithData,
  signInUserUsingEmailandPassword,
  signUserOut,
} from "./Firebase/Firebase";
import { useSelector } from "react-redux";
import { initialstateInterface } from "./reduxSlices/userslice";
import { RootState } from "./store/store";

import ControlledCarousel from "./components/Courasels/Courasels";
import PhoneSection from "./Sections/HomePage/Phone.Section";

export default function Home() {
  //useAuthListener();

  // const { data: users, error, isLoading } = useGetUsersQuery();

  // const { currentUser } = useSelector(
  //   (state: RootState): initialstateInterface => state.user
  // );

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error fetching users</p>;

  //   displayName: "Tom",
  //   email: "testing3@gmail.com",
  //   accountNumber: "1000000005",
  //   Balance: 188800,
  //   Transactions: [
  //     {
  //       amount: 20000,
  //       type: "credit",
  //       description: "Salary",
  //       date: new Date().toISOString(),
  //     },
  //     {
  //       amount: 12000,
  //       type: "debit",
  //       description: "Airtime purchase",
  //       date: new Date().toISOString(),
  //     },
  //   ],
  // };

  // className="bg-red-700"
  return (
    <div>
      <main className="overflow-hidden">
        {/* className="flex flex-row "  flex flex-row justify-center*/}
        <ControlledCarousel />
        <PhoneSection />
      </main>
    </div>
  );
}
