import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './Full-Logo.svg';

function NavBar() {
    return (
        <Navbar id='home-navigation' bg='light' fixed='top' expand='lg'>
            <Container>
                <Navbar.Brand><img src={logo} alt='logo'/></Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavBar;