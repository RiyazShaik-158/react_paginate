
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { config } from '../../envReplacementConfig';

function Fetcher() {

    const [movieName,setMovieName] = useState("");
    const [moviesList,setMoviesList] = useState([]);
    const [numberOfMoviesResult,setNumberOfMoviesResult] = useState();
    const [pageNumber,setPageNumber] = useState(1);
    const moviesListPerPage = 10;
    const [type,setType] = useState("");
    const pagesVisited = pageNumber * moviesListPerPage;
 

    const handleTypeSelect = (e) => {
        if(movieName === ""){
            setType("")
        }
        alert('setting type to :',e.target.value)
        setType(e.target.value)
    }

    


    const handleMovieName = (e) => {
        setMovieName(e.target.value)
        
    }

    // const apiKey = import.meta.env.REACT_APP_API_KEY;
    const apiKey = config.REACT_APP_API_KEY


    const fetchingFunction = async () => {
        // const apiKey = import.meta.env.REACT_APP_API_KEY;
        // console.log("apiKey :",apiKey)
        const fetchedData = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}&page=${pageNumber}&type=${type}`);
        const resp = await fetchedData.json()
        console.log(resp)
        setMoviesList(resp.Search)
        setNumberOfMoviesResult(resp?.totalResults)
    }

    const pageCount = Math.ceil(numberOfMoviesResult / moviesListPerPage);

    const handlePageChange = ({selected}) => {
        alert('selectedPage :',selected)
        setPageNumber(selected)
    }

    useEffect(() => {
        movieName && 
        fetchingFunction();
    },[movieName,pageNumber,type,moviesList])


    // const displayData = () => 

return (
    <div>
      <input type='text' autoFocus onChange={handleMovieName} value={movieName}/>
      <select name="type" id="type" onChange={handleTypeSelect}>
        <option></option>
        <option>movie</option>
        <option>series</option>
        <option>game</option>
      </select>
      <div style={{display:'flex',flexWrap:'wrap',gap:'10px',width:'80%'}}>
        {/* {displayData} */}
        {
            moviesList?.map(item => {
                return(
                    // <h4>{item.Title}</h4>
                        <img key={item.imdbID} src={item.Poster} alt='img' style={{aspectRatio:'4:3',objectFit:'contain',width:'300px',height:''}}/>
                    
                )
            })
        }
      </div>
      {
        movieName && moviesList?.length !== 0 && 
        <ReactPaginate 
            previousLabel = 'prev'
            nextLabel = 'next'
            pageCount={pageCount}
            onPageChange={handlePageChange}
            breakLabel = '...'
        />
      }
      
    </div>
  )
}

export default Fetcher
