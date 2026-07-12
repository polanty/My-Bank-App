import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    title: "Banking",
    links: [
      ["Current accounts", "/Pages/Personal"],
      ["Business accounts", "/Pages/Business"],
      ["Savings spaces", "/Pages/Personal"],
      ["Cards and payments", "/userprofile/Card"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Help centre", "/Pages/About"],
      ["Security advice", "/signInpage"],
      ["Statements", "/userprofile/Statements"],
      ["Payments help", "/userprofile/Transfers"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About EGO Bank", "/Pages/About"],
      ["Accessibility", "/Pages/About"],
      ["Careers", "/Pages/About"],
      ["Contact", "/Pages/About"],
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-stone-200 bg-[#fbfaf7] text-stone-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-10 lg:grid-cols-[1.1fr_1.6fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 no-underline">
            <Image
              src="/logo.png"
              alt="EGO Bank logo"
              width={58}
              height={58}
            />
            <span className="text-2xl font-semibold text-stone-950">
              EGO Bank
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-stone-600">
            A fictional online banking experience for managing accounts,
            transfers, card controls and downloadable statements in one secure
            workspace.
          </p>

          <div className="mt-6 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#d95600]">
              Secure banking access
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Always check the browser address before entering sign-in details.
              EGO Bank will never ask for your password by email.
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[#213f29]">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-stone-600 no-underline transition hover:text-[#d95600]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-stone-500 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            Copyright {new Date().getFullYear()} EGO Bank. Fictional banking
            project.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/Pages/About"
              className="text-stone-500 no-underline transition hover:text-[#d95600]"
            >
              Privacy
            </Link>
            <Link
              href="/Pages/About"
              className="text-stone-500 no-underline transition hover:text-[#d95600]"
            >
              Terms
            </Link>
            <Link
              href="/Pages/About"
              className="text-stone-500 no-underline transition hover:text-[#d95600]"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
