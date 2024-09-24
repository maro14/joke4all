//components/Jokes.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const Jokes = () => {
    const [jokes, setJokes] = useState('');
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        fetchJokes();
    }, []);

    const fetchJokes = async () => {
        setLoading(true); // Set loading state to true before fetching data
        try {
            const response = await axios.get('https://icanhazdadjoke.com/slack');
            const jokeText = response.data?.attachments?.[0]?.text || 'No joke found.';
            setJokes(jokeText);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error(err);
            setError('Failed to load jokes. Please try again.');
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    return (
        <div className='joke-box'>
            <h1>Jokes 4 All</h1>
            {loading ? (
                <p>Loading jokes...</p> // Display loading text or spinner
            ) : error ? (
                <p>{error}</p> // Display error message
            ) : (
                <p>{jokes}</p> // Display the fetched joke
            )}
            <button onClick={fetchJokes} aria-label="Get Another Joke">Get Another Joke</button>
        </div>
    );
};

export default Jokes;
