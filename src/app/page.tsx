"use client";

import ControlledCarousel from "./components/Courasels/Courasels";
import PhoneSection from "./Sections/HomePage/Phone.Section";
import ScrollBanner from "./Sections/HomePage/ScrollBanner";

export default function Home() {
  return (
    <div>
      <main className="overflow-hidden">
        <ControlledCarousel />
        <PhoneSection />
        <ScrollBanner />
      </main>
    </div>
  );
}

// "use client";

// //import useAuthListener from "./hooks/Authchange";
// import Link from "next/link";
// import { useGetUsersQuery } from "./RTK_Query/rtkApi";
// import {
//   createNewUserWithData,
//   signInUserUsingEmailandPassword,
//   signUserOut,
// } from "./Firebase/Firebase";
// import { useSelector } from "react-redux";
// import { initialstateInterface } from "./reduxSlices/userslice";
// import { RootState } from "./store/store";
// import UserPDFLib from "./components/UserPDF/UserPDF";

// export default function Home() {
//   //useAuthListener();

//   const { data: users, error, isLoading } = useGetUsersQuery();

//   const { currentUser } = useSelector(
//     (state: RootState): initialstateInterface => state.user
//   );

//   console.log(currentUser);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching users</p>;

//   const creatNewUserhandleclick = async () => {
//     try {
//       await createNewUserWithData(
//         "testingsome@gmail.com",
//         "Alice Smith",
//         "ghjkas"
//       );
//       console.log("A new User have been created");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // const testObj = { email: "abiola@example.email", password: "123456" };

//   const handleclickSignOut = async () => {
//     try {
//       await signUserOut();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleclickSignIn = async () => {
//     try {
//       const user = await signInUserUsingEmailandPassword(
//         "test2@gmail.com",
//         "Godisgood1995!"
//       );

//       return user;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const mockUser = {
//     displayName: "Tom",
//     email: "testing3@gmail.com",
//     accountNumber: "1000000005",
//     Balance: 188800,
//     Transactions: [
//       {
//         amount: 20000,
//         type: "credit",
//         description: "Salary",
//         date: new Date().toISOString(),
//       },
//       {
//         amount: 12000,
//         type: "debit",
//         description: "Airtime purchase",
//         date: new Date().toISOString(),
//       },
//     ],
//   };

//   return (
//     <div className="flex flex-row justify-center">
//       <main className="flex flex-row ">
//         <div className="p-4">
//           <h1 className="text-xl font-bold">Users</h1>
//           <ul className="mt-4">
//             {users?.map((user) => (
//               <li key={user.id} className="mb-2">
//                 {user.name} - {user.id}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           {currentUser ? (
//             <>
//               <h1>{currentUser.email}</h1>
//               <h1>{currentUser.displayName}</h1>
//               {/* <h1>{</h1> */}
//             </>
//           ) : (
//             <h1 className="text-xl font-bold">No Test seselctor</h1>
//           )}
//         </div>
//         <Link
//           href={"/signUp"}
//           className="flex h-[48px] bg-amber-600 grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
//         >
//           <p className="hidden md:block">Link here to form</p>
//         </Link>

//         <Link
//           href={"/signInpage"}
//           className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
//         >
//           <p className="hidden md:block">Link here to Sign up</p>
//         </Link>

//         {currentUser ? (
//           <button
//             type="button"
//             className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//             onClick={handleclickSignOut}
//           >
//             Sign Out
//           </button>
//         ) : (
//           <button
//             type="button"
//             className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//             onClick={handleclickSignIn}
//           >
//             Sign In
//           </button>
//         )}

//         <button
//           type="button"
//           className="text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//           onClick={creatNewUserhandleclick}
//         >
//           Sign Up
//         </button>
//         <UserPDFLib user={mockUser} />
//       </main>
//     </div>
//   );
// }
