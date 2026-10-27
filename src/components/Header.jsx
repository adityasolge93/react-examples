import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function Header() {
    const user = useContext(AuthContext);

    return (
        <div>
            <p>
                <Link to='/'>Home</Link>
                {" "}
                <Link to='/practice-5'>Login</Link>
                {" "}
                {" "}
                {" "}
                {user ? user.name : 'Guest'}
            </p>
        </div>
    );
}

export default Header;