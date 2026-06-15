import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext'; // Ensure this path is correct
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import './Header.css';
import logoLight from '../../assets/logo-light.png'; // Logo for light theme
import logoDark from '../../assets/logo-dark.png';   // Logo for dark theme

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [panelWidth, setPanelWidth] = useState('0');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const openNav = () => {
    setPanelWidth('100%');
  };

  const closeNav = () => {
    setPanelWidth('0');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.className = theme; // Update the body class based on the current theme
  }, [theme]);

  const handleLogout = async () => {
    await doSignOut();
    navigate('/login');
  };

  return (
    <header className='header'>
      <div className='logo-container'>
        <NavLink to='/home' className={({ isActive }) => (isActive ? 'active' : '')}>
          <img
            src={theme === 'light' ? logoLight : logoDark}
            alt='Home'
            className='logo'
          />
        </NavLink>
      </div>
      {isMobile ? (
        <>
          <nav className='sidepanel' style={{ width: panelWidth }}>
            <button className='closebtn' onClick={closeNav}>
              &times;
            </button>
            <ul>
              <li>
                <NavLink to='/about' className={({ isActive }) => (isActive ? 'active' : '')}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to='/variety' className={({ isActive }) => (isActive ? 'active' : '')}>
                  Variety
                </NavLink>
              </li>
              <li>
                <NavLink to='/contact' className={({ isActive }) => (isActive ? 'active' : '')}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to='/search' className={({ isActive }) => (isActive ? 'active' : '')}>
                  Search
                </NavLink>
              </li>
              <li>
                <button onClick={toggleTheme} className='theme-toggle-btn'>
                  Toggle Theme
                </button>
              </li>
              {currentUser ? (
                <li>
                  <button onClick={handleLogout} className='profile-button'>
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <NavLink to='/login' className={({ isActive }) => (isActive ? 'active' : '')}>
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          <button className='openbtn' onClick={openNav}>
            ☰
          </button>
        </>
      ) : (
        <nav className='header-nav'>
          <ul>
            <li>
              <NavLink to='/about' className={({ isActive }) => (isActive ? 'active' : '')}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to='/variety' className={({ isActive }) => (isActive ? 'active' : '')}>
                Variety
              </NavLink>
            </li>
            <li>
              <NavLink to='/contact' className={({ isActive }) => (isActive ? 'active' : '')}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to='/search' className={({ isActive }) => (isActive ? 'active' : '')}>
                Search
              </NavLink>
            </li>
            <li>
              <button onClick={toggleTheme} className='theme-toggle-btn'>
                Toggle Theme
              </button>
            </li>
            {currentUser ? (
              <li>
                <button onClick={handleLogout} className='profile-button'>
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <NavLink to='/login' className={({ isActive }) => (isActive ? 'active' : '')}>
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
