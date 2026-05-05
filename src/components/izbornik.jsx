import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IME_APLIKACIJE, RouteNames } from "../constants";
import useAuth from "../hooks/useAuth";

export default function Izbornik() {
    const navigate = useNavigate();
    const { isLoggedIn, logout, authUser } = useAuth();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand 
                    className="ruka" 
                    onClick={() => navigate(RouteNames.HOME)}
                >
                    {IME_APLIKACIJE}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link 
                            onClick={() => navigate(RouteNames.HOME)}
                        >
                            Početna
                        </Nav.Link>

                        {/* Prikazuj izbornike samo ako je korisnik prijavljen */}
                        {isLoggedIn && (
                            <>
                                <Nav.Link 
                                    onClick={() => navigate(RouteNames.NADZORNA_PLOCA)}
                                >
                                    Nadzorna ploča
                                </Nav.Link>

                                <NavDropdown title="Izbornik" id="basic-nav-dropdown">
                                    <NavDropdown.Item
                                        onClick={() => navigate(RouteNames.ZANROVI)}
                                    >
                                        Žanrovi
                                    </NavDropdown.Item>

                                    <NavDropdown.Item 
                                        onClick={() => navigate(RouteNames.IZVODACI)}
                                    >
                                        Izvođači
                                    </NavDropdown.Item>

                                    <NavDropdown.Item
                                        onClick={() => navigate(RouteNames.ALBUMI)}
                                    >
                                        Albumi
                                    </NavDropdown.Item>
                                    
                                    <NavDropdown.Item
                                        onClick={() => navigate(RouteNames.PJESME)}
                                    >
                                        Pjesme
                                    </NavDropdown.Item>

                                    {/* Opcije vidljive samo administratorima */}
                                    {authUser && authUser.uloga === 'admin' && (
                                        <>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                onClick={() => navigate(RouteNames.OPERATERI)}
                                            >
                                                Operateri
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                onClick={() => navigate(RouteNames.GENERIRANJE_GLAZBE)}
                                            >
                                                Generiranje glazbe
                                            </NavDropdown.Item>
                                        </>
                                    )}
                                </NavDropdown>
                            </>
                        )}
                    </Nav>

                    {/* Desna strana izbornika: Login/Logout */}
                    <Nav className="ms-auto">
                        {isLoggedIn ? (
                            <Button
                                variant="outline-danger"
                                onClick={() => logout()}
                            >
                                Odjava ({authUser.email})
                            </Button>
                        ) : (
                            <>
                                <Nav.Link 
                                    onClick={() => navigate(RouteNames.REGISTRACIJA)}
                                >
                                    Registracija
                                </Nav.Link>
                                <Button
                                    variant="outline-primary"
                                    onClick={() => navigate(RouteNames.LOGIN)}
                                >
                                    Prijava
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}