import {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';

function NavBar(props) {
    const [state, setState] = useState({currentScrollHeight: 0, opacity: 1});

    useEffect(() => {      
        window.onscroll =()=>{
            const newScrollHeight = Math.ceil(window.scrollY / 1000) *1000;
            if(window.scrollY === 0){
                setState({opacity: 1});
            }
            else if (state.currentScrollHeight !== newScrollHeight){
                setState({currentScrollHeight: newScrollHeight});
                setState({opacity: 0});
            }
       }
    });

    return (
        <Navbar style={{'opacity': state.opacity}} id='home-navigation' bg='light' fixed='top' expand='lg'>
            <Container>
                <Navbar.Brand><a href={'https://' + props.language + '.wikipedia.org/wiki/'}><img className='small-logo' src='https://adigaskell.org/wp-content/uploads/2014/08/wikipedia-logo.jpg' alt='Wikipedia Articles'/></a><strong>Wikipedia Trending Articles</strong></Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavBar;