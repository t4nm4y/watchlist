import { React, useState, useRef } from 'react'
import './AddCard.css'
import { MdCheckCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const AddCard = (props) => {
    const Navigate=useNavigate();
  function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if a token is present
  }
    const token = localStorage.getItem('token');
    const [title, setTitle] = useState(props.title);
    const [category, setCategory] = useState(props.category || (props.currPage==="Movies" ? "M" : props.currPage==="Webseries" ? "S" : props.currPage==="Anime" ? "A" : "Category"));
    const originalTitle = props.title;
    const cardRef = useRef(null);
    const handleEdit = async () => {
        if (!title) return;
        if(!isAuthenticated()) {
            Navigate('/login');
            return;
          }
        if (title === originalTitle && category === props.category) {
            props.setEditable(false);
            return;
        }
        try {
            // props.setEditable(false);  //remove this later
            if (!props._id) {
                console.log("adding");
                const response = await fetch('/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        title: title,
                        category: category,
                    }),
                });
                if (response.ok) {
                    console.log("added");
                    await props.fetchList();
                }
            }
            else {
                console.log("updating");
                const response = await fetch('/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        _id: props._id,
                        title: title,
                        category: category,
                    }),
                });
                if (response.ok) {
                    console.log("updated");
                    await props.fetchList();
                }
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
                        required autoFocus />
                </div>
                <div class="dropdown-container">
                    <span style={{fontWeight:'400', fontSize:'1.2em', marginBottom:'0.3em'}}>{category}</span>
                    <span style={{fontSize:'0.8em', margin:'0 0.5em 0 0.2em' }}>&nbsp;&#9660;</span>
                    <div class="radio-container">
                        <div class="radio-option">
                            <input type="radio" id="M" name="category" value="M" 
                            onChange={(e)=>setCategory(e.target.value)}
                            checked={category === 'M'}/>
                                <label for="M">M: Movie</label>
                        </div>
                        <div class="radio-option">
                            <input type="radio" id="S" name="category" value="S" 
                            onChange={(e)=>setCategory(e.target.value)}
                            checked={category === 'S'}/>
                                <label for="S">S: Series</label>
                        </div>
                        <div class="radio-option">
                            <input type="radio" id="A" name="category" value="A" onChange={(e)=>setCategory(e.target.value)}
                            checked={category === 'A'}/>
                                <label for="A">A: Anime</label>
                        </div>
                        <div class="radio-option">
                            <input type="radio" id="AM" name="category" value="AM" onChange={(e)=>setCategory(e.target.value)}
                            checked={category === 'AM'}/>
                                <label for="AM">AM: Anime Movie</label>
                        </div>
                        <div class="radio-option">
                            <input type="radio" id="AS" name="category" value="AS" onChange={(e)=>setCategory(e.target.value)}
                            checked={category === 'AS'}/>
                                <label for="AS">AS: Anime Series</label>
                        </div>
                    </div>
                </div>
                <button onClick={() => handleEdit()}>
                    <MdCheckCircle className="card_btn" />
                </button>
            </form>
        </div>
    )
}

export default AddCard