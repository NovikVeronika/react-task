import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css'

function ItemList() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get('http://universities.hipolabs.com/search?country=Belarus')
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);

        if (searchTerm === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };

    return (
        <div>
            <h1>List of Belarusian universities</h1>
            <br></br>
            <input
                type="text"
                placeholder="search university by name"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <ul>
                {currentItems.map(item => (
                    <li key={item.name}>
                        <Link style={{textDecoration: "none",
                                      color: "black",
                                      fontSize: "20px", margin: "20px"}} to={`/item/${item.name}`}>{item.name}</Link>
                    </li>
                ))}
            </ul>
            <ul className="pagination">
                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
                    <li key={index}>
                        <a href='#' onClick={() => paginate(index + 1)}> {index + 1} </a>
                    </li>

                ))}
            </ul>
        </div>
    );
}


export default ItemList;
