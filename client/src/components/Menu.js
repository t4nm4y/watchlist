import React from 'react'
import './Menu.css'
import {isAuthenticated} from '../Auth'

const Menu = ({setPage, setMenu}) => {
  
  return (
    <div className='MenuWrap'>
        <div className='Menu'>
            <button className='menuBtn' onClick={()=>{setPage("All"); setMenu(false)}}>All</button>
            <button className='menuBtn' onClick={()=>{setPage("Movies"); setMenu(false)}}>Movies</button>
            <button className='menuBtn' onClick={()=>{setPage("Webseries"); setMenu(false)}}>Webseries</button>
            <button className='menuBtn' onClick={()=>{setPage("Anime"); setMenu(false)}}>Anime</button>
            {isAuthenticated()? <button className='menuBtn' onClick={()=>(localStorage.removeItem('token'), window.location.reload())}>Logout</button> : null}

        </div>
    </div>
  )
}

export default Menu