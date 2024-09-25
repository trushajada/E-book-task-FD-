import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, Container, Row ,Col } from 'react-bootstrap';


const BookList = ({ searchTerm }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            if (searchTerm) {
                setLoading(true);
                try {
                    const response = await fetch(`https://openlibrary.org/search.json?title=${searchTerm}`);
                    const data = await response.json();
                    setBooks(data.docs || []);
                } catch (error) {
                    console.error("Error fetching books:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBooks();
    }, [searchTerm]);

    if (loading) return <div>Loading...</div>;
    if (!books.length) return <div>No books found.</div>;

    const handleBookClick = (book) => {
        const bookId = book.key.split('/').pop();
        navigate(`/book/${bookId}`);
    };

    return (
        <section className="booklist">
        <h3 className='text-center mb-5'>Book List</h3>
        <div className="booklist-content">
            <Row>
                {books.slice(0, 30).map((book, index) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4">
                        <div className="book" onClick={() => handleBookClick(book)}>
                            {book.cover_i ? (
                                <img
                                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                    alt={book.title}
                                    className="book-cover"
                                />
                            ) : (
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="No cover available"
                                    className="book-cover"
                                />
                            )}
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-author">{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
                            <p className="book-edition">Edition: {book.edition_count || 'N/A'}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    </section>
    );
};

export default BookList;
