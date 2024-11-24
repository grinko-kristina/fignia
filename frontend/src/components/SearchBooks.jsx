import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SearchBooks = () => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation(); // Получаем параметры URL
    const query = new URLSearchParams(location.search).get('query'); // Получаем query из параметров URL

    const fetchData = async () => {
        if (!query || query.trim() === '') {
            setResults([]);
            return;
        }

        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
            setError('No access token. Please log in.');
            return;
        }

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/books/?search=${query}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setResults(response.data);
            setError(null);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Unauthorized: Please log in.');
            } else {
                setError('Error fetching data. Please try again.');
            }
            setResults([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);

    return (
        <div>
            <h2>Search Results for "{query}"</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                {results.length > 0 ? (
                    <div className="book-list">
                        {results.map((book) => (
                            <div key={book.id} className="book-item">
                                <Link to={`/books/${book.bookId}`}>
                                    <img
            src={book.coverImg}
            alt={`${book.title} cover`}
          // style={{ maxWidth: '500px', marginBottom: '100px' }} // Пример стилей
        />
                                    <h3>{book.title}</h3>
                                    <p>{book.author}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchBooks;
