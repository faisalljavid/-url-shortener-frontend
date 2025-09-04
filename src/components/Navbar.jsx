import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">URL Shortener</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <span className="user-greeting">Hello, {user?.name}</span>
                        </li>
                        <li>
                            <button className="logout-btn" onClick={logout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/signin">Sign In</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;