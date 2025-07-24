import Link from "next/link";
import Stack from "react-bootstrap/Stack";

export default function SideNav() {
  return (
    <Stack gap={3}>
      <h1>Side Navigation</h1>

      <Link href="/userprofile/Card" className="bg-black text-white px-3 py-2 ">
        Card
      </Link>
      <Link
        href="/userprofile/DirectDebit"
        className="bg-black text-white px-3 py-2 "
      >
        DirectDebit
      </Link>
      <Link
        href="/userprofile/Converter"
        className="bg-black text-white px-3 py-2 "
      >
        Converter
      </Link>
      <Link
        href="/userprofile/Statements"
        className="bg-black text-white px-3 py-2 "
      >
        Statements
      </Link>
      <Link
        href="/userprofile/Transfers"
        className="bg-black text-white px-3 py-2 "
      >
        Transfer
      </Link>
    </Stack>
  );
}
