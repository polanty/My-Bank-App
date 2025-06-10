import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-row justify-center">
      <main className="flex flex-row ">
        <Link
          href={"/formroute"}
          className="flex h-[48px] bg-amber-600 grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <p className="hidden md:block">Link here to form</p>
        </Link>

        <Link
          href={"/signIn"}
          className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <p className="hidden md:block">Link here to Sign up</p>
        </Link>
      </main>
    </div>
  );
}
