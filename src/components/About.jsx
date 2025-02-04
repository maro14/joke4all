// components/About.jsx
const About = () => {
    return (
        <div className="about-container">
            <h1>About Jokes 4 All</h1>
            <p>
                Welcome to <strong>Jokes 4 All</strong>, your go-to source for daily doses of laughter. 
                This web application brings you a collection of the funniest dad jokes, directly sourced 
                from the icanhazdadjoke API. Whether you&apos;re looking for a quick smile or want to share 
                some humor with friends, we&apos;ve got you covered.
            </p>
            <h2>Features</h2>
            <ul>
                <li>Fetch a random joke every time you visit or click the button.</li>
                <li>Simple, clean, and user-friendly interface.</li>
                <li>Responsive design for use on both desktop and mobile devices.</li>
            </ul>
            <h2>Credits</h2>
            <p>
                This app uses the <a href="https://icanhazdadjoke.com/" target="_blank" rel="noopener noreferrer">icanhazdadjoke API</a> 
                for fetching jokes. Special thanks to the team behind this amazing API for keeping the world smiling!
            </p>
            <h2>Contact</h2>
            <p>
                Have suggestions or feedback? Feel free to reach out to us on our <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">GitHub page</a>.
            </p>
        </div>
    );
};

export default About;
