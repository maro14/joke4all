// components/Jokes.jsx
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const JOKES_API = import.meta.env.VITE_JOKES_API;

const Jokes = () => {
    const [jokes, setJokes] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJokes = useCallback(async () => {
        setLoading(true);
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
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to load jokes. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJokes();
    }, [fetchJokes]);

    return (
        <div className='joke-box' role="region" aria-live="polite">
            <h1>Jokes 4 All</h1>
            {loading ? (
                <p>Loading jokes...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>{jokes}</p>
            )}
            <button 
                onClick={fetchJokes} 
                aria-label="Get Another Joke" 
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Get Another Joke'}
            </button>
        </div>
    );
};

export default Jokes;