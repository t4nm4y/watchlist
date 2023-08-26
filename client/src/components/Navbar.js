import React from 'react'
import { useState, useEffect } from 'react';
import './Navbar.css';
import Menu from './Menu';
import {isAuthenticated} from '../Auth'

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

const Navbar = ({ toggleTheme, setPage }) => {
  const [showMenu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!showMenu);
    document.body.classList.toggle('menu-open'); // Apply the class to body
  };

  const scrollDirection = useScrollDirection();
  return (
    <div className={`navbar ${scrollDirection === "down" ? "hide" : ""}`}>
      <div className='navInnerWrap'>
        <h1 style={{fontWeight:50}}> Tk's Watchlist</h1>
        <div className='hide_on_smallScreen ButtonsWrap'>
            <button className='nav_btn hover-underline-animation' onClick={()=>setPage("All")}>All</button>
            <button className='nav_btn hover-underline-animation' onClick={()=>setPage("Movies")}>Movies</button>
            <button className='nav_btn hover-underline-animation' onClick={()=>setPage("Webseries")}>Webseries</button>
            <button className='nav_btn hover-underline-animation' onClick={()=>setPage("Anime")}>Anime</button>
            {isAuthenticated()? <button className='nav_btn hover-underline-animation' onClick={()=>(localStorage.removeItem('token'), window.location.reload())}>Logout</button> : null}
        </div>

        <div className='rightBtn'>
        {/* theme toggle */}
        <label className="switch">
          <input type="checkbox" onChange={toggleTheme} />
          <span className="slider"></span>
        </label>
        {/* menu toggle */}
        <input id="checkbox" type="checkbox" onChange={toggleMenu}/>
            {showMenu && <Menu setPage={setPage} toggleMenu={toggleMenu}/>}
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