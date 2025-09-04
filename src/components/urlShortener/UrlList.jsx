import { useState } from 'react';
import { getShortenedUrl } from '../../utils/config';
import '../../styles/UrlList.css';

const UrlList = ({ urls }) => {
    const [copied, setCopied] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const handleCopy = (keyId) => {
        const fullUrl = getShortenedUrl(keyId);
        navigator.clipboard.writeText(fullUrl);
        setCopied(keyId);

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
                                <div className="short-url-container">
                                    <a
                                        href={getShortenedUrl(url.keyId)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="short-url"
                                    >
                                        {url.keyId}
                                    </a>
                                    <button
                                        className="copy-btn"
                                        onClick={() => handleCopy(url.keyId)}
                                        title="Copy URL"
                                    >
                                        {copied === url.keyId ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                            </td>
                            <td>{url.clickedCount}</td>
                            <td>{formatDate(url.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UrlList;