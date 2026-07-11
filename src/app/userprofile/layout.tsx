import type { Metadata } from "next";
import AuthenticatedShell from "../components/AuthenticatedShell";

export const metadata: Metadata = {
  title: "EGO Bank Online Banking",
  description: "Secure account dashboard, payments and statements",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthenticatedShell>{children}</AuthenticatedShell>;
}
