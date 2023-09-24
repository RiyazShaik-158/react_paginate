
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { config } from '../../envReplacementConfig';
import './fetcher.scss';

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
        const fetchedData = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}&page=${pageNumber}&type=`);
        const resp = await fetchedData.json()
        console.log(resp)
        console.log("This is for page no: ",pageNumber);
        console.log("page count :",pageCount)
        setMoviesList(resp.Search)
        setNumberOfMoviesResult(resp?.totalResults)
    }

    // let pageCount ;
    
    // if(numberOfMoviesResult){
      const pageCount = Math.ceil(numberOfMoviesResult / moviesListPerPage);
    // }

    const handlePageChange = ({selected}) => {
        // console.log('selectedPage :',selected)
        const nextPage = selected + 1;
        setPageNumber(nextPage)
    }

    // useEffect(() => {
    //     movieName && 
    //     fetchingFunction();
    // },[movieName,pageNumber,type,moviesList])

    useEffect(()=>{
        // const getData = setTimeout(()=>{
        //     fetchingFunction();
        //     console.count("showing movies")
            
        // },1000)

        // return ()=>clearTimeout(getData)
        if(movieName.length > 2) fetchingFunction()
        console.count('rendering')

    },[movieName,pageNumber])
    // removed movieList here because it is not updating correctly, hence useEffect renders infinite times

    // const displayData = () => 

return (
    <div className='fetcher_head'>
        <div className='input_select_div'>

            <input type='text' autoFocus onChange={handleMovieName} value={movieName}/>
            <select name="type" id="type" onChange={handleTypeSelect}>
                <option disabled>Select</option>
                <option>movie</option>
                <option>series</option>
                <option>game</option>
            </select>
        </div>
     
      {
        movieName && moviesList?.length !== 0 && 
        <ReactPaginate 
            previousLabel = 'prev'
            nextLabel = 'next'
            pageCount={pageCount}
            onPageChange={handlePageChange}
            breakLabel = '...'
            containerClassName={'paginationButtonsDiv'}
            previousLinkClassName={'previousButton'}
            nextLinkClassName={'nextButton'}
            disabledClassName={'disabledPagination'}
            activeClassName={'paginationActive'}
        />
      }
      <div className='movies_list_shower'>
        {
            moviesList?.map(item => {
                return(
                    // <h4>{item.Title}</h4>
                    <>
                    {
                        item.Poster ?
                        <img key={item.imdbID} src={item.Poster !== "" ? item.Poster :  'Image_not_available.png'} alt="img" style={{aspectRatio:'4:3',objectFit:'contain',width:'300px',height:''}}/>
                        :
                        <img key={item.imdbID} src='Image_not_available.png' />

                    }
                    </>
                    
                )
            })
        }
      </div>
      
      
    </div>
  )
}

export default Fetcher;
