import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import Blob from './components/Blob';
import Navbar from './components/Navbar';
import { MdAddCircle } from 'react-icons/md';
import AddCard from './components/AddCard';
function App() {
  const[editable, setEditable] = useState(false);
  const [theme, setTheme] = useState("dark");
  const toogleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }
  const [movieList, setList] = useState([]);
  const [currPage, setPage] = useState("All");

  const fetchList = async function () {
    try{
      console.log("currPage", currPage);
      if(currPage==="All"){
        const response= await fetch('/all');
        setList(await response.json());
      }
      else if(currPage==="Movies"){
        const response= await fetch('/movies');
        setList(await response.json());
      }
      else if(currPage==="Webseries"){
        const response= await fetch('/webseries');
        setList(await response.json());
      }
      else if(currPage==="Anime"){
        const response= await fetch('/anime');
        setList(await response.json());
      }
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=> {
    fetchList();
  }, [currPage]);
  
  return (
    <div className="App" id={theme}>
      <div className='mainWrap'>
        <Navbar toogleTheme={toogleTheme} setPage={setPage}/>
        <div className="hide-on-mobile">
          <Blob/>
        </div>
        <div className='cardWrap'>
          <div className='headingWrap'>
            <h2 className='heading'>{currPage}</h2>
            <button onClick={()=>setEditable(true)}>
              <MdAddCircle className="card_btn" />
            </button>
          </div>
          {editable ? <AddCard fetchList={fetchList} setEditable={setEditable}/> : null}
          {movieList.map((movie) => (
            <Card key={movie._id} currPage={currPage} _id={movie._id} title={movie.title} watchedDate={movie.watchedDate} category={movie.category} fetchList={fetchList}/>
          ))}
          <Card title="1. aot" category="M"/>
          <Card title="aot" category="AM"/>
          <Card title="aot" category="M"/>
          <Card title="1. batman"/>
          <Card title="1. aot"/>
          <Card title="aot"/>
          <Card title="aot"/>
          <Card title="aot"/>
          <Card title="1. aot"/>
          <Card title="aot"/>
          <Card title="aot"/>
          <Card title="aot"/>
        </div>
      </div>
    </div>
  );
}

export default App;
