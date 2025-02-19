// components/Jokes.jsx
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const JOKES_API = import.meta.env.VITE_JOKES_API;
const CACHE_SIZE = 5;

const Jokes = () => {
    const [jokes, setJokes] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cachedJokes, setCachedJokes] = useState([]);

    const fetchJokes = useCallback(async () => {
        setLoading(true);
        
        // If we have cached jokes, use one of them
        if (cachedJokes.length > 0) {
            const joke = cachedJokes[0];
            setJokes(joke);
            setCachedJokes(prev => prev.slice(1));
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(JOKES_API, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Jokes 4 All'
                }
            });
            
            const jokeText = Array.isArray(response.data?.attachments) && response.data.attachments[0]?.text 
                ? response.data.attachments[0].text 
                : 'No joke found.';
                
            setJokes(jokeText);
            setError(null);

            // Fetch additional jokes for cache
            try {
                const cacheResponses = await Promise.all(
                    Array(CACHE_SIZE).fill().map(() => 
                        axios.get(JOKES_API, {
                            headers: {
                                'Accept': 'application/json',
                                'User-Agent': 'Jokes 4 All'
                            }
                        })
                    )
                );
                const newCachedJokes = cacheResponses
                    .map(res => res.data?.attachments?.[0]?.text)
                    .filter(Boolean);
                setCachedJokes(newCachedJokes);
            } catch (cacheError) {
                console.warn('Failed to cache jokes:', cacheError);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to load jokes. Please check your internet connection and try again.');
        } finally {
            setLoading(false);
        }
    }, [cachedJokes]);

    useEffect(() => {
        fetchJokes();
    }, [fetchJokes]);

    return (
        <div className='joke-box' role="region" aria-live="polite">
            <h1>Jokes 4 All</h1>
            {loading ? (
                <div className="loading-spinner" aria-label="Loading">
                    <div className="spinner"></div>
                    <span className="sr-only">Loading joke...</span>
                </div>
            ) : error ? (
                <div className="error-message">
                    <p>{error}</p>
                    <button 
                        onClick={fetchJokes}
                        className="retry-button"
                        aria-label="Retry loading joke"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="joke-content">
                    <p>{jokes}</p>
                    <button 
                        onClick={fetchJokes} 
                        className="next-joke-button"
                        aria-label="Get Another Joke" 
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Get Another Joke'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Jokes;