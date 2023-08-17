import React from 'react'
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import './Card.css';

const Card = (props) => {
  return (
    <div className='card'>
      {props.title}
      <div className='card_btn_wrap'>
        <button onClick={() => console.log('Button clicked')}>
          <RiEdit2Fill className="card_btn" />
        </button>
        <button onClick={() => console.log('Button clicked')}>
          <MdDelete className="card_btn" />
        </button>
      </div>
    </div>
  )
}

export default Card