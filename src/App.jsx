// import React, { useState } from 'react';
// import './app.scss';
// import someData from './components/someData.json';
// import ReactPaginate from 'react-paginate';

// function App() {
//   const [users,setUsers] = useState(someData);
//   const [pageNumber,setPageNumber] = useState(0); // current page number

//   const usersPerPage = 4 ; // mostly taken 10
//   const pagesVisited = pageNumber * usersPerPage;

//   const displayUsers = users
//     .slice(pagesVisited,pagesVisited + usersPerPage)
//     .map(item => {
//       return (
//           <div className='user'>
//             <h3>{item.name}</h3>
//             <h3>{item.username}</h3>
//             <h3>{item.email}</h3>
//           </div>
        
//       )
//     })

//   const pageCount = Math.ceil(users.length / usersPerPage);

//   const handlePageChange = ({selected}) => {
//     setPageNumber(selected)
//   }

//   return (
//     <div className='App_main'>
//       <div className='usersDiv'>
//         {displayUsers}
//       </div>
      
//       <ReactPaginate 
//         previousLabel={'prev'}
//         nextLabel={'next'}
//         pageCount={pageCount}
//         onPageChange={handlePageChange}
//         containerClassName={'paginationButtonsDiv'}
//         previousLinkClassName={'previousButton'}
//         nextLinkClassName={'nextButton'}
//         disabledClassName={'disabledPagination'}
//         activeClassName={'paginationActive'}
//       />
//     </div>
//   )
// }

// export default App


import React from 'react';
import Fetcher from './components/Fetcher';
import './app.scss';

function App() {
  return (
    <div className='App_Fetcher'>
      <Fetcher />
    </div>
  )
}

export default App
