import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function ManagerHeader() {
  const [menuActive, setMenuActive] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const toggleMenu = () => setMenuActive((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current?.contains(event.target) ||
        toggleRef.current?.contains(event.target)
      ) {
        return;
      }
      setMenuActive(false);
    };

    if (menuActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuActive]);

  const handleLinkClick = () => setMenuActive(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <h1>TaskTrack</h1>
        </div>

        <button
          type="button"
          ref={toggleRef}
          className={`hamburger ${menuActive ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={menuActive}
          aria-controls="primary-nav"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        <nav
          id="primary-nav"
          ref={menuRef}
          className={`nav-menu ${menuActive ? "active" : ""}`}
        >
          <ul>
           
            <li>
              <Link to="/" onClick={handleLinkClick}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
