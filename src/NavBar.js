import {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';

function NavBar() {
    const [state, setState] = useState({currentScrollHeight: 0});

    useEffect(() => {      
        window.onscroll =()=>{
         const newScrollHeight = Math.ceil(window.scrollY / 50) *50;
         if (state.currentScrollHeight !== newScrollHeight){
             setState({currentScrollHeight: newScrollHeight})
         }
       }
    });

    const opacity = Math.min(100 / state.currentScrollHeight, 1)

    return (
        <Navbar style={{opacity}} id='home-navigation' bg='light' fixed='top' expand='lg'>
            <Container>
                <Navbar.Brand><img className='small-logo' src='http://adigaskell.org/wp-content/uploads/2014/08/wikipedia-logo.jpg' alt='Wikipedia Articles'/><strong>Wikipedia Trending Articles</strong></Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavBar;