import {React, useState} from 'react'
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import AddCard from './AddCard';
import './Card.css';

const Card = (props) => {

  const[editable, setEditable] = useState(false);

  const handleDelete = async () => {
    console.log("delete");
    try {
      await fetch('/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: props._id,
        }),
      });
      props.fetchList();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div className='card'>
      {editable ? <AddCard _id={props._id} fetchList={props.fetchList} title={props.title} setEditable={setEditable} category={props.category}/> : null}
      <div className='Title'>{props.title}</div>
      <div className='card_btn_wrap'>
      <span>[{props.category}]</span>
        <button onClick={()=>setEditable(true)}>
          <RiEdit2Fill className="card_btn" />
        </button>
        <button onClick={()=>handleDelete()}>
          <MdDelete className="card_btn" />
        </button>
      </div>
    </div>
  )
}

export default Card