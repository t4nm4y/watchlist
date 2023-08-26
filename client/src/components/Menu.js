import React from 'react'
import './Menu.css'
import {isAuthenticated} from '../Auth'

const Menu = ({setPage, toggleMenu}) => {
  
  return (
    <div className='MenuWrap'>
        <div className='Menu'>
            <button className='menuBtn' onClick={()=>{setPage("All"); toggleMenu()}}>All</button>
            <button className='menuBtn' onClick={()=>{setPage("Movies"); toggleMenu()}}>Movies</button>
            <button className='menuBtn' onClick={()=>{setPage("Webseries"); toggleMenu()}}>Webseries</button>
            <button className='menuBtn' onClick={()=>{setPage("Anime"); toggleMenu()}}>Anime</button>
            {isAuthenticated()? <button className='menuBtn' onClick={()=>(localStorage.removeItem('token'), window.location.reload())}>Logout</button> : null}

        </div>
    </div>
  )
}

export default Menu