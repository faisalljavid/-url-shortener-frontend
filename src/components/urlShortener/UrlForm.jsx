import { useState } from 'react';
import axios from 'axios';
import { URL_ENDPOINTS } from '../../utils/config';
import '../../styles/UrlForm.css';

const UrlForm = ({ onUrlCreated }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!originalUrl) {
            setError('Please enter a URL');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(URL_ENDPOINTS.CREATE, {
                originalURL: originalUrl,
                customAlias: customAlias || undefined
            });

            const { success, message, redirectURL } = response.data;
            if (success) {
                // Create a URL object that matches what the backend returns
                const newUrl = {
                    _id: Date.now(), // Temporary ID
                    originalUrl: originalUrl,
                    keyId: redirectURL.split('/').pop(), // Extract keyId from redirectURL
                    createdAt: new Date().getTime(), // Use timestamp like backend
                    clickedCount: 0
                };
                onUrlCreated(newUrl);
                setOriginalUrl('');
                setCustomAlias('');
            } else {
                setError(message || 'Failed to shorten URL');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to shorten URL');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="url-form-container">
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="url-form">
                <div className="form-group">
                    <label htmlFor="originalUrl">URL to shorten</label>
                    <input
                        id="originalUrl"
                        type="url"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        placeholder="https://example.com/long-url"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="customAlias">Custom alias (optional)</label>
                    <input
                        id="customAlias"
                        type="text"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                        placeholder="my-custom-url"
                    />
                </div>

                <button
                    type="submit"
                    className="shorten-button"
                    disabled={loading}
                >
                    {loading ? 'Shortening...' : 'Shorten URL'}
                </button>
            </form>
        </div>
    );
};

export default UrlForm;