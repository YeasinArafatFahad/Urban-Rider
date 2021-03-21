import { Link } from 'react-router-dom';
import './Header.css';
// import header from '../../images/header.png';
// import logo from '../../images/icons/logo.png';

const Header = () => {
    return (
        <div className="header">
            <nav className="nav">
                <ul>
                    <li>
                        <img className="logo" alt=""/>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link  to="/book">Destination</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    
                </ul>
            </nav>
            

        </div>
    );
};

export default Header;