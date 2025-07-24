"use client"; //

import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Form,
} from "react-bootstrap";
import { signUserOut } from "@/app/Firebase/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
// import { initialstateInterface } from "@/app/reduxSlices/userslice";
import { RootState } from "@/app/store/store";
import { setLoading } from "@/app/reduxSlices/userslice";
import Link from "next/link";
import Image from "next/image";

const Navigation = () => {
  //   const currentUser = useSelector((state: RootState) => state.user.currentUser);

  //   const router = useRouter();
  //   const dispatch = useDispatch();

  //   const handleclickSignOut = async () => {
  //     try {
  //       await signUserOut();
  //       router.push("/");

  //       dispatch(setLoading(false));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <Navbar expand="lg" className="bg-white">
      <Container>
        <Navbar.Brand href="/" className="flex items-center gap-2">
          <Image
            src="/Logo_white.png"
            alt="Ego Bank Logo"
            width={50}
            height={50}
            priority
          />
          Ego Bank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Personal</Nav.Link>
            <Nav.Link href="#pricing">Business</Nav.Link>
            <Nav.Link href="#pricing">About Us</Nav.Link>
          </Nav>
          <Nav>
            <Form className="d-flex mr-6">
              <Form.Control
                type="search"
                placeholder="Search"
                className="Search_form"
                aria-label="Search"
                name="Search"
              />
              <Button className="button-secondary">Search</Button>
            </Form>
            <Nav.Link href="/signInpage" className="btn button-primary">
              Log on
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
