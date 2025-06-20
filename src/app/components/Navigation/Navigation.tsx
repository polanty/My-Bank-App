"use client"; //

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { signUserOut } from "@/app/Firebase/Firebase";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { initialstateInterface } from "@/app/reduxSlices/userslice";
import { RootState } from "@/app/store/store";
import Link from "next/link";

const Navigation = () => {
  const { currentUser } = useSelector(
    (state: RootState): initialstateInterface => state.user
  );

  const router = useRouter();

  const handleclickSignOut = async () => {
    try {
      await signUserOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Ego Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

            <div className="ml-auto">
              {currentUser ? (
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={handleclickSignOut}
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/signInpage"
                  className="inline-block border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition"
                >
                  Sign In
                </Link>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
