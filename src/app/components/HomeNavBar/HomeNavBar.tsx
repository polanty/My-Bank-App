"use client";

import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-white">
      <Container>
        <Navbar.Brand href="/" className="flex items-center gap-2 p-2">
          <Image
            src="/Logo_white.png"
            alt="Ego Bank Logo"
            width={60}
            height={60}
            priority
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/Pages/Personal">
              Personal
            </Nav.Link>
            <Nav.Link as={Link} href="/Pages/Business">
              Business
            </Nav.Link>
            <Nav.Link as={Link} href="/Pages/About">
              About Us
            </Nav.Link>
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
            <Link href="/signInpage" className={`btn button-primary`}>
              Log on
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
