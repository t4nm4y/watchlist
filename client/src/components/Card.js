import {React, useState} from 'react'
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import AddCard from './AddCard';
import './Card.css';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const Card = (props) => {
  const[editable, setEditable] = useState(false);
  
  const Navigate=useNavigate();
  function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if a token is present
  }
  const token = localStorage.getItem('token');
  const handleDelete = async () => {
    console.log("deleting");
    try {
      if(!isAuthenticated()) {
        Navigate('/login');
        return;
      }
      await fetch(`${BACKEND_URL}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
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
      {editable ? <AddCard _id={props._id} title={props.title} category={props.category} setEditable={setEditable} fetchList={props.fetchList} /> : null}
      <div className='Title'>{props.index}.&nbsp;{props.title}</div>
      <div className='card_btn_wrap'>
      <span style={{fontWeight:'600', fontSize:'1.2em'}}>[{props.category}]</span>
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