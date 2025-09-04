import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="home">
            <div className="hero">
                <h1>SHORTEE THE URL SHORTENER</h1>
                <p>Shorten your URLs in seconds and track clicks with our powerful tools.</p>

                {isAuthenticated ? (
                    <Link to="/dashboard" className="cta-button">Go to Dashboard</Link>
                ) : (
                    <div className="cta-buttons">
                        <Link to="/signin" className="cta-button">Sign In</Link>
                        <Link to="/signup" className="cta-button secondary">Sign Up</Link>
                    </div>
                )}
            </div>

            <div className="features">
                <div className="feature">
                    <h2>Simple & Fast</h2>
                    <p>Create shortened URLs with just a few clicks.</p>
                </div>
                <div className="feature">
                    <h2>Track Performance</h2>
                    <p>See how your links are performing over time.</p>
                </div>
                <div className="feature">
                    <h2>Secure</h2>
                    <p>Your data is always safe with us.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;