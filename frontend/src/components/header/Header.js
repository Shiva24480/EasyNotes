import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';


function Header() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);

    async function fetchUser() {
        if (localStorage.getItem('notes-app-user')) {
            setCurrentUser(JSON.parse(await localStorage.getItem('notes-app-user')));
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('notes-app-user');
        navigate('/');
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Navbar bg="dark" variant="dark">
            <Container >
                <Navbar.Brand >
                    <Link to='/'>
                        Easy Notes
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className='m-auto'>
                        <Form className="d-flex">
                            {
                                currentUser ? (
                                    // <Form.Control
                                    //     type="search"
                                    //     placeholder="Search"
                                    //     className="me-2"
                                    //     aria-label="Search"
                                    // />
                                    ''
                                ) : ('')
                            }
                        </Form>
                    </Nav>
                    <Nav
                        className=" my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >

                        <Nav.Link>
                            <Link to='/mynotes'>
                                My Notes
                            </Link>
                        </Nav.Link>

                        <NavDropdown title={currentUser?.name} id="navbarScrollingDropdown">
                            {/* <NavDropdown.Item href="#action3">Profile</NavDropdown.Item> */}
                            {/* <NavDropdown.Divider /> */}
                            <NavDropdown.Item
                                onClick={handleLogout}
                            >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header