import React from 'react'
import { useState, useEffect } from 'react';
import './Navbar.css';
import Menu from './Menu';

function useScrollDirection() {

  const [scrollDirection, setScrollDirection] = useState(null);
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;
};

const Navbar = ({ toogleTheme }) => {

  const [showMenu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!showMenu);
    document.body.classList.toggle('menu-open'); // Apply the class to body
  };

  const scrollDirection = useScrollDirection();
  return (
    <div className={`navbar ${scrollDirection === "down" ? "hide" : ""}`}>
      <div className='navInnerWrap'>
        <h2> My Watchlist</h2>
        <div className='hide_on_smallScreen ButtonsWrap'>
            <button>all</button>
            <button>Movies</button>
            <button>Webseries</button>
            <button>anime</button>
        </div>

        <div className='rightBtn'>
        {/* theme toggle */}
        <label className="switch">
          <input type="checkbox" onChange={toogleTheme} />
          <span className="slider"></span>
        </label>
        {/* menu toggle */}
        <input id="checkbox" type="checkbox" onChange={toggleMenu}/>
            {showMenu && <Menu/>}
        <label className={`hide_on_bigScreen toggle ${showMenu? "checked" : ""}`} for="checkbox">
              <div id="bar1" className="bars"></div>
              <div id="bar2" className="bars"></div>
              <div id="bar3" className="bars"></div>
            </label>
        </div>
      </div>
    </div>
  )
}

export default Navbar