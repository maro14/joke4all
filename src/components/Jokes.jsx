import { useState, useEffect } from 'react';
import axios from 'axios';

const Jokes = () => {
    const [jokes, setjokes] = useState('');

    useEffect(() => {
        fetchJokes();
    }, []);

    const fetchJokes = async () => {
        try {
            const response = await axios.get("https://icanhazdadjoke.com/slack");
            setjokes(response.data.attachments[0].text);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='joke-box'>
            <h1> Jokes 4 All </h1>
            <p> {jokes || 'Loading jokes'} </p>
            <button onClick={fetchJokes}> Get Another Jokes </button>
        </div>
    );
};

export default Jokes;
