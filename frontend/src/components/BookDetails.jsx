import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            const accessToken = localStorage.getItem('access');
            if (!accessToken) {
                setError('No access token. Please log in.');
                return;
            }

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setBook(response.data);
                setError(null);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('Book not found.');
                } else {
                    setError('Error fetching book details.');
                }
            }
        };

        fetchBookDetails();
    }, [id]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div>
          <img
            src={book.coverImg}
            alt={`${book.title} cover`}
          // style={{ maxWidth: '500px', marginBottom: '100px' }} // Пример стилей
        />
            <h1>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Pages:</strong> {book.pages}</p>
            <p><strong>Rating:</strong> {book.rating}</p>
        </div>
    );
};

export default BookDetails;
