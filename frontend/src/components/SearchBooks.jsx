import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBooks = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage

        if (!accessToken) {
            setError('No access token. Please log in.');
            return;
        }

        try {
        console.log(accessToken)
            const response = await axios.get(`http://127.0.0.1:8000/api/books/?search=${query}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Send the token in the Authorization header
                },
            });

            setResults(response.data);
            setError(null);
        } catch (error) {
            console.log('Error response:', error.response); // Log the full error response
            if (error.response && error.response.status === 401) {
                setError("Unauthorized: Please log in.");
            } else {
                setError("Error fetching data. Please try again.");
            }
            setResults([]);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchData();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div>
            <h1>Search Books</h1>
            <input
                type="text"
                placeholder="Search for books..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map((book, index) => (
                            <li key={index}>{book.title}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchBooks;
