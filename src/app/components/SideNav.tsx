"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const links = [
  { href: "/userprofile", label: "Overview" },
  { href: "/userprofile/Transfers", label: "Payments" },
  { href: "/userprofile/DirectDebit", label: "Direct Debits" },
  { href: "/userprofile/Card", label: "Card" },
  { href: "/userprofile/Statements", label: "Statements" },
  { href: "/userprofile/Converter", label: "Currency" },
];

export default function SideNav() {
  const pathname = usePathname();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <aside className="shrink-0 rounded-lg border border-stone-200 bg-white p-4 shadow-sm lg:sticky lg:top-6 lg:w-72 lg:self-start">
      <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
        <Image src="/logo.png" alt="EGO Bank" width={38} height={38} />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d95600]">
            Online Bank
          </p>
          <h2 className="text-xl font-semibold text-stone-950">
            {currentUser?.displayName || "Account holder"}
          </h2>
        </div>
      </div>

      <nav className="mt-4 grid gap-1">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/userprofile" && pathname.startsWith(link.href));

          return (
            <Link
              href={link.href}
              key={link.href}
              className={`rounded-md px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-[#213f29] text-white"
                  : "text-stone-700 hover:bg-stone-100 hover:text-stone-950"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-md bg-[#f6f3ef] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
          Secure session
        </p>
        <p className="mt-2 text-sm text-stone-700">
          Keep your details private and sign out when using a shared device.
        </p>
      </div>
    </aside>
  );
}
