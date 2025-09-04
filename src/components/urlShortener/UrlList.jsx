import { useState } from 'react';
import { getShortenedUrl, URL_ENDPOINTS } from '../../utils/config';
import '../../styles/UrlList.css';

const UrlList = ({ urls, onDelete }) => {
    const [copied, setCopied] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const handleCopy = (shortCode) => {
        const fullUrl = getShortenedUrl(shortCode);
        navigator.clipboard.writeText(fullUrl);
        setCopied(shortCode);

        // Reset the "Copied" state after 2 seconds
        setTimeout(() => {
            setCopied(null);
        }, 2000);
    };

    if (urls.length === 0) {
        return <div className="no-urls">You haven't shortened any URLs yet.</div>;
    }

    return (
        <div className="url-list">
            <table>
                <thead>
                    <tr>
                        <th>Original URL</th>
                        <th>Short URL</th>
                        <th>Clicks</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map((url) => (
                        <tr key={url._id}>
                            <td className="original-url" title={url.originalUrl}>
                                {url.originalUrl.length > 50
                                    ? url.originalUrl.substring(0, 50) + '...'
                                    : url.originalUrl}
                            </td>
                            <td>
                                <a
                                    href={getShortenedUrl(url.shortCode)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="short-url"
                                >
                                    {url.shortCode}
                                </a>
                            </td>
                            <td>{url.clicks}</td>
                            <td>{formatDate(url.createdAt)}</td>
                            <td>
                                <div className="url-actions">
                                    <button
                                        className="copy-btn"
                                        onClick={() => handleCopy(url.shortCode)}
                                    >
                                        {copied === url.shortCode ? 'Copied!' : 'Copy'}
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => onDelete(url._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UrlList;