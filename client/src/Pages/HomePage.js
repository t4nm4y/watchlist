import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Blob from '../components/Blob';
import Navbar from '../components/Navbar';
import { MdAddCircle, MdSearch, MdClose } from 'react-icons/md';
import AddCard from '../components/AddCard';
import './HomePage.css'
import Footer from '../components/Footer';


const HomePage = ({ theme, toggleTheme }) => {
  const [editable, setEditable] = useState(false);
  const [searching, setSearching] = useState(false);
  const [movieList, setList] = useState([]);
  const [currPage, setPage] = useState("All");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const searchList = async function (searchTerm) {
    try {
      const response = await fetch(`${BACKEND_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchTerm: searchTerm,
        }),
      });
      // console.log("the resp of search",response);
      if (response.ok) {
        setList(await response.json());
      }
      if (response.status === 404) {
        setList([]);
        // alert("No results found");
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const fetchList = async function () {
    try {
      if (currPage === "All") {
        const response = await fetch(`${BACKEND_URL}/all`);
        setList(await response.json());
      }
      else if (currPage === "Movies") {
        const response = await fetch(`${BACKEND_URL}/movies`);
        setList(await response.json());
      }
      else if (currPage === "Webseries") {
        const response = await fetch(`${BACKEND_URL}/webseries`);
        setList(await response.json());
      }
      else if (currPage === "Anime") {
        const response = await fetch(`${BACKEND_URL}/anime`);
        setList(await response.json());
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchList();
  }, [currPage]);

  return (
      <div className='mainWrap' id={theme}>
        {editable ? <AddCard fetchList={fetchList} setEditable={setEditable} currPage={currPage} /> : null}
        <Navbar toggleTheme={toggleTheme} setPage={setPage} />
        <div className="hide-on-mobile">
          <Blob />
        </div>
        < div className='cardWrap'>
          <div className='headingWrap'>
            {searching ? (
              <div className='SearchWrap'>
                <input className='search_input' type="text" placeholder='SEARCH'
                  onInput={(e) => searchList(e.target.value)}
                  // onKeyUp={(e) => searchList(e.target.value)}
                  required autoFocus />
                <button onClick={() => {
                  setSearching(false);
                  fetchList();
                }}>
                  <MdClose className="card_btn" />
                </button>
              </div>
            ) : <>
              <h2 className='heading'>{currPage}</h2>
              <button onClick={() => setSearching(true)}>
                <MdSearch className="card_btn" />
              </button>
            </>
            }

            {/* </div> */}
            <button onClick={() => setEditable(true)}>
              <MdAddCircle className="card_btn" />
            </button>
          </div>
          {movieList.map((movie, index) => (
            <Card index={index + 1} key={movie._id} currPage={currPage} _id={movie._id} title={movie.title} watchedDate={movie.watchedDate} category={movie.category} fetchList={fetchList} />
          ))}
          {/* dummy data */}
           {/* <Card title="1. aot" category="M" />
          <Card title="2. batman dark knight rises batman" category="AM" />
          <Card title="aot" category="M" />
          <Card title="1. batman" />
          <Card title="1. aot" />
          <Card title="aot" />
          <Card title="aot" category="M" />
          <Card title="1. batman" />
          <Card title="1. aot" />
          <Card title="aot" />
          <Card title="aot" category="M" />
          <Card title="1. batman" />
          <Card title="1. aot" />
          <Card title="aot" />
          <Card title="aot" category="M" />
          <Card title="1. batman" />
          <Card title="1. aot" />
          <Card title="aot" /> */}

        </div>
          <Footer />
      </div>
  )
}

export default HomePage