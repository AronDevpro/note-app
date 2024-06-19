import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Dropdown, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSession} from "../context/auth.jsx";

function TopNavbar() {
    const { user,logout} = useSession();
    const handleLogout = () => {
        logout();
    };
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="px-0 py-3" data-bs-theme="dark">
                <Container>
                    {/* Logo */}
                    <Navbar.Brand as={Link} to="/dashboard" className="flex-fill">Note App</Navbar.Brand>
                    {/* Navbar toggle */}
                    <Navbar.Toggle aria-controls="navbarCollapse" />
                    {/* Collapse */}
                    <Navbar.Collapse id="navbarCollapse">
                        {user &&
                        <Nav className="my-2 mx-auto">
                                <Dropdown className="text-end">
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic" className="col-12 col-md-3 col-lg-12">
                                        Account
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                        </Nav>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default TopNavbar;
