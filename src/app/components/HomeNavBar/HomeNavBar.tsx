"use client";

import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { signUserOut } from "@/app/Firebase/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { RootState } from "@/app/store/store";
import { setLoading } from "@/app/reduxSlices/userslice";
import Link from "next/link";
import Image from "next/image";

const publicLinks = [
  { href: "/Pages/Personal", label: "Personal" },
  { href: "/Pages/Business", label: "Business" },
  { href: "/Pages/About", label: "About Us" },
];

const authenticatedLinks = [
  { href: "/userprofile", label: "Overview" },
  { href: "/userprofile/Transfers", label: "Payments" },
  { href: "/userprofile/DirectDebit", label: "Direct Debits" },
  { href: "/userprofile/Card", label: "Card" },
  { href: "/userprofile/Statements", label: "Statements" },
  { href: "/userprofile/Converter", label: "Currency" },
];

const HomeNavBar = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const links = currentUser ? authenticatedLinks : publicLinks;

  const handleclickSignOut = async () => {
    try {
      await signUserOut();
      dispatch(setLoading(false));
      router.push("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <Navbar
      expand="lg"
      className="font-medium bg-white border-b border-stone-200"
    >
      <Container>
        <Navbar.Brand href="/" className="flex items-center gap-2 p-2">
          <Image
            src="/logo.png"
            alt="Ego Bank Logo"
            width={60}
            height={60}
            priority
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="home-navbar-nav" />
        <Navbar.Collapse id="home-navbar-nav">
          <Nav className="me-auto">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Nav.Link
                  as={Link}
                  href={link.href}
                  key={link.href}
                  className={isActive ? "text-[#d95600]" : undefined}
                >
                  {link.label}
                </Nav.Link>
              );
            })}
          </Nav>

          {currentUser ? (
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
              <span className="text-lg font-semibold text-stone-600">
                {currentUser.displayName || currentUser.email}
              </span>
              <button
                type="button"
                className="rounded-md bg-[#d95600] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ff5500]"
                onClick={handleclickSignOut}
              >
                Sign out
              </button>
            </div>
          ) : (
            <Nav className="gap-3">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="Search_form"
                  aria-label="Search"
                  name="Search"
                />
                <Button className="button-secondary">Search</Button>
              </Form>
              <Link href="/signInpage" className="btn button-primary">
                Log on
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomeNavBar;
