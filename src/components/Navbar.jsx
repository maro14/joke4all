// components/Navbar.jsx
import{ useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <header className="header">
            <nav className="nav container">
                <NavLink to="/" className="nav__logo">Jokes 4 All</NavLink>
                <div className={`nav__menu ${showMenu ? "show-menu" : ""}`} id="nav-menu">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <NavLink to="/" className="nav__link" onClick={toggleMenu}>Home</NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/about" className="nav__link" onClick={toggleMenu}>About</NavLink>
                        </li>
                    </ul>
                    <div className="nav__close" id="nav-close" onClick={toggleMenu} aria-label="Close Menu">
                        <span>&times;</span>
                    </div>
                </div>
                <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                    <span>&#9776;</span>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
