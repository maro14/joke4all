import {useState, useEffect} from 'react'
import axios from 'axios'

const [jokes, setjokes] = useState("")

useEffect(() => {
    fetchJokes()
})

const fetchJokes = async() => {
    try {
        const response = await axios.get("")
        setjokes(response.data.jokes)
    } catch (err) {
        console.error(err);
    }
}

const Jokes = () => {
    return (
        <div>
            <h1>Joke 4 All</h1>
            <p>{jokes}</p>
            <div onSubmit={fetchJokes}>Get Jokes</div>
        </div>
    )
}

export default Jokes