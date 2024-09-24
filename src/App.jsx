// App.js or relevant router file
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Jokes from './components/Jokes';
import About from './components/About'; 
import './index.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Jokes />} />
                <Route path="/about" element={<About />} /> {/* Add About route */}
            </Routes>
        </Router>
    );
}

export default App;
