import type { Metadata } from "next";
import SideNav from "../components/SideNav";
import NextBreadcrumb from "../components/NextBreadcrumb/NextBreadcrumb";

export const metadata: Metadata = {
  title: "Payments and Transactions",
  description: "User Transactions and payments",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextBreadcrumb
        homeElement={"Home"}
        separator={<span> | </span>}
        activeClasses="text-white "
        containerClasses="flex py-5  bg-red-700"
        listClasses="hover:underline mx-2 font-bold"
        capitalizeLinks
      />
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full h-full bg-red-400 flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </>
  );
}
