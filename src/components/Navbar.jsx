// components/Navbar.jsx
import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

// Custom hook for menu management
const useMenu = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = useCallback(() => {
        setShowMenu(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setShowMenu(false);
    }, []);

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        };

        if (showMenu) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [showMenu, closeMenu]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (showMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showMenu]);

    return { showMenu, toggleMenu, closeMenu };
};

const Navbar = () => {
    const { showMenu, toggleMenu, closeMenu } = useMenu();

    return (
        <header className="header">
            <nav className="nav container" role="navigation">
                <NavLink to="/" className="nav__logo" onClick={closeMenu}>
                    Jokes 4 All
                </NavLink>
                
                <div 
                    className={`nav__menu ${showMenu ? "show-menu" : ""}`} 
                    id="nav-menu"
                    aria-expanded={showMenu}
                >
                    <ul className="nav__list">
                        <li className="nav__item">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink 
                                to="/about" 
                                className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                About
                            </NavLink>
                        </li>
                    </ul>
                    
                    <button 
                        className="nav__close" 
                        onClick={closeMenu}
                        aria-label="Close Menu"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <button 
                    className="nav__toggle" 
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                    aria-expanded={showMenu}
                >
                    <span aria-hidden="true">&#9776;</span>
                </button>
            </nav>
        </header>
    );
};

export default Navbar;
