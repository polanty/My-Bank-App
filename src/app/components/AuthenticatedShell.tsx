"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../store/store";
import SideNav from "./SideNav";

export default function AuthenticatedShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentUser, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace("/signInpage");
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser) {
    return (
      <main className="min-h-[70vh] bg-[#f6f3ef] px-6 py-16">
        <div className="mx-auto max-w-md rounded-lg border border-stone-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-[#d95600]" />
          <h1 className="text-2xl font-semibold text-stone-950">
            Checking your secure session
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Your account area will open as soon as authentication completes.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f3ef]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
        <SideNav />
        <section className="min-w-0 flex-1">{children}</section>
      </div>
    </main>
  );
}
