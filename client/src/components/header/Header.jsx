import styled from '@emotion/styled';
import {AppBar,Toolbar, Typography} from '@mui/material';

import {Link} from 'react-router-dom';


const Component = styled(AppBar)`
    background: #FFFFFF;
    color: #000;

`;

const Container= styled(Toolbar)`
    justify-content:center;
    & > a{
        padding: 20px;
        color: #000;
        text-decoration: none;
        
    }

    & > a:hover::after{
        transform translate(0, 0)
    }
    & > a:hover{
        border :2px solid transparent;
        color :indigo;
        transform: scale(1.5);
         will-change :transform;
    }
`;

const Header =() =>{
    return(
   <Component>
        <Container>
            <Link to='/'>HOME</Link>
            <Link to='/about'>ABOUT</Link>
            <Link to='/contact'>CONTACT</Link>
            <Link to='/login'>LOGOUT</Link>
        </Container>
   </Component>
    )
}
export default Header;