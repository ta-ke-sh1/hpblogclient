import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavigationBar() {
    return (
        <Navbar
            className="custom-nav"
            collapseOnSelect
            expand="xxl"
            bg="white"
            variant="light"
            fixed="top">
            <Container fluid>
                <Navbar.Brand href="#home" className="custom-padding">
                    Ha Phuong Blog
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    style={{
                        marginRight: "54px",
                    }}
                />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features" className="custom-padding">
                            Articles
                        </Nav.Link>
                        <Nav.Link href="#pricing" className="custom-padding">
                            {" "}
                            Photos
                        </Nav.Link>
                        <Nav.Link href="#features" className="custom-padding">
                            About Me
                        </Nav.Link>
                        <Nav.Link href="#pricing" className="custom-padding">
                            Write Something
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link
                            style={{
                                marginRight: "54px",
                            }}
                            eventKey={2}
                            href="#memes"
                            className="custom-padding">
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
