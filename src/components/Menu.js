import React from 'react'
import './Menu.css'
const Menu = () => {
  return (
    <div className='MenuWrap'>
        <div className='Menu'>
            <button className='menuBtn'>all</button>
            <button className='menuBtn'>Movies</button>
            <button className='menuBtn'>Webseries</button>
            <button className='menuBtn'>anime</button>
        </div>
    </div>
  )
}

export default Menu