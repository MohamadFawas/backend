import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 3; // Number of users to display per page

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:9090/library/getAll");
    setUsers(result.data.result.books);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(0); // Reset to the first page when searching
  };

  const filteredUsers = users.filter(user =>
    user.indexNumber.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Pagination logic
  const offset = currentPage * usersPerPage;
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className='container' style={{ textAlign: 'center' }}>
      <h1 style={{ color: 'red' }}>Home Page</h1>
      <div className='py-4'>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Index Number"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Index Number</th>
              <th scope="col">Name</th>
              <th scope="col">Title</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers
              .slice(offset, offset + usersPerPage)
              .map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{offset + index + 1}</th>
                  <td>{user.indexNumber}</td>
                  <td>{user.name}</td>
                  <td>{user.title}</td>
                  <td>
                    <Link to={`/viewUser/${user.id}`}>
                      <button className='btn btn-primary mx-2'>View</button>
                    </Link>
                    <Link to={`/editUser/${user.id}`}>
                      <button className="btn btn-outline-primary mx-2">Edit</button>
                    </Link>
                    <Link to={`/delete/${user.id}`}>
                      <button className="btn btn-danger mx-2">Delete</button>
                    </Link>
                    <Link to={`/allDetails/${user.id}`}>
                      <button className="btn btn-danger mx-2">Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              
                <td colSpan="5">
                  <ReactPaginate
                    previousLabel={<span style={{ margin: '0 10px' }}>Previous</span>}
                    nextLabel={<span style={{ margin: '0 10px' }}>Next</span>}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    activeClassName={'active'}
                  />
                </td>


              
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Home;
