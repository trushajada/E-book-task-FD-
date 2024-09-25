import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Navbar, Nav} from 'react-bootstrap';
import logo from "../../assets/images/logo.png";

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`https://openlibrary.org/works/${id}.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error('Failed to fetch book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!book) return <div>Loading...</div>;

    // Get cover image URL
    const coverId = book.covers ? book.covers[0] : null;
    const coverImageUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : "https://via.placeholder.com/150";

    return (
        <>
         <Navbar bg="light" expand="lg" className='shadow'>
            <div className="container d-flex">
                <Navbar.Brand href="/" className="mx-2">
                    <img src={logo} alt="Logo" style={{ height: '70px' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="/" className='me-3 fw-bold'>Home</Nav.Link>
                        <Nav.Link href="/list" className='me-3 fw-bold'>Book List</Nav.Link>
                        <Nav.Link href="#" className='me-3 fw-bold'>Blog Book</Nav.Link>
                        <Nav.Link href="#" className='me-3 fw-bold'>New Book</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
         <h3 className='mb-4 mt-4 text-center'>Book Detail</h3>

<div className="d-flex justify-content-center">
<Card className="text-center" style={{ width: '18rem' }}>
    <Card.Body className='border border-dark rounded'>
        <h4>{book.title || 'No Title Available'}</h4>
        {coverId && (
            <Card.Img
                variant="top"
                src={coverImageUrl}
                alt={book.title}
                style={{ width: '150px', height: 'auto', margin: '0 auto' }} 
            />
        )}
        <p className="mt-3">Published Date: {book.created ? new Date(book.created.value).getFullYear() : 'N/A'}</p>
        <p>Genre: {book.subjects ? book.subjects.join(', ') : 'N/A'}</p>
    </Card.Body>
</Card>
</div>
        </>
       
    );
};

export default BookDetail;
