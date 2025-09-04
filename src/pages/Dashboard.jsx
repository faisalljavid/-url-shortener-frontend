import { useState, useEffect } from 'react';
import axios from 'axios';
import UrlForm from '../components/urlShortener/UrlForm';
import UrlList from '../components/urlShortener/UrlList';
import { URL_ENDPOINTS, getShortenedUrl } from '../utils/config';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [recentlyShortened, setRecentlyShortened] = useState(null);

    // Fetch user's URLs
    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const response = await axios.get(URL_ENDPOINTS.GET_ALL);
                setUrls(response.data);
                setError('');
            } catch (err) {
                setError('Failed to fetch your URLs');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUrls();
    }, []);

    const handleNewUrl = (newUrl) => {
        setUrls([newUrl, ...urls]);
        setRecentlyShortened(newUrl);
    };

    const handleDeleteUrl = async (id) => {
        try {
            await axios.delete(URL_ENDPOINTS.DELETE(id));
            setUrls(urls.filter(url => url._id !== id));
        } catch (err) {
            setError('Failed to delete URL');
            console.error(err);
        }
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>

            <section className="url-shortener-section">
                <h2>Shorten a URL</h2>
                <UrlForm onUrlCreated={handleNewUrl} />

                {recentlyShortened && (
                    <div className="recently-shortened">
                        <h3>Your shortened URL:</h3>
                        <div className="shortened-url-card">
                            <p className="original-url">{recentlyShortened.originalUrl}</p>
                            <div className="shortened-url-container">
                                <a
                                    href={getShortenedUrl(recentlyShortened.shortCode)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shortened-url"
                                >
                                    {getShortenedUrl(recentlyShortened.shortCode)}
                                </a>
                                <button
                                    className="copy-btn"
                                    onClick={() => {
                                        navigator.clipboard.writeText(getShortenedUrl(recentlyShortened.shortCode));
                                        alert('Copied to clipboard!');
                                    }}
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <section className="url-history-section">
                <h2>Your URLs</h2>
                {loading ? (
                    <div className="loading">Loading your URLs...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <UrlList urls={urls} onDelete={handleDeleteUrl} />
                )}
            </section>
        </div>
    );
};

export default Dashboard;