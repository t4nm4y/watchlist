import React from 'react'
import './Menu.css'
const Menu = () => {
  return (
    <div className='MenuWrap'>
        <div className='Menu'>
            <button className='menuBtn'>All</button>
            <button className='menuBtn'>Movies</button>
            <button className='menuBtn'>Webseries</button>
            <button className='menuBtn'>Anime</button>
        </div>
    </div>
  )
}

export default Menu