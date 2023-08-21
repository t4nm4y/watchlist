import { React, useState, useRef } from 'react'
import './AddCard.css'
import { MdCheckCircle } from 'react-icons/md';


const AddCard = (props) => {
    const [title, setTitle] = useState(props.title);
    const [category, setCategory] = useState(props.category);
    const originalTitle = props.title;
    const cardRef = useRef(null);
    const handleEdit = async () => {
        if (!title) return;
        if(title===originalTitle) {
            props.setEditable(false);
            return;
        }
        try {
            props.setEditable(false);  //remove this later
            if (!props._id) {
                console.log("adding");
                const response = await fetch('/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title,
                        category: category,
                    }),
                });
            }
            else {
                console.log("updating");
                const response = await fetch('/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        _id: props._id,
                        title: title,
                        categofy: category,
                    }),
                });

                if (response.ok) await props.fetchList;
            }
            props.setEditable(false);
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEdit();
        }
    };
    const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
          console.log('Hello');
          props.setEditable(false);
        }
      };

    return (
        <div className='addCard_Wrap' onClick={handleClickOutside}>
            <form className='addCard card' ref={cardRef} onSubmit={(e) => e.preventDefault()}>
                <div className='inputWrap'>
                    <input className='input' type="text" placeholder='ENTER NAME' 
                    value={title} onInput={(e) => setTitle(e.target.value)} 
                    onKeyUp={handleKeyPress} 
                    required autoFocus/>
                </div>
                <button onClick={() => handleEdit()}>
                    <MdCheckCircle className="card_btn" />
                </button>
            </form>
        </div>
    )
}

export default AddCard