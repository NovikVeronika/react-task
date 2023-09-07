import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './index.css'

function ItemDetail()  {
    const {name} = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://universities.hipolabs.com/search?country=Belarus')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const filteredData = data.filter((item) => item.name === name);
    const countries = filteredData.map(item => item.country);
    const domains = filteredData.map(item => item.domains);
    const webs = filteredData.map(item => item.web_pages);
    return (
        <div>
            <h2>The name of the university:</h2>
            <h1>{name}</h1>
            <h2>Сountry:</h2>
            {countries.map((country, index) => (
                <p key={index}>{country}</p>
            ))}
            <h2>Website:</h2>
            {domains.map((domain, index) => (
                <a href={webs} target="_blank" rel="noopener noreferrer">
                    <p key={index}>{domain}</p>
                </a>
            ))}
            <Link style={{textDecoration: "none",
                color: "black",
                fontSize: "20px", marginLeft: "60px", marginTop: "40px"}}to="/">Back to List of Belarusian universities</Link>
        </div>
    );
}

export default ItemDetail;
