import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, Container, Row } from 'react-bootstrap';
import logo from "../../assets/images/logo.png";

const SearchForm = ({ onSearch }) => {
    const [term, setTerm] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.trim() === "") {
            alert("Please enter a search term.");
            return;
        }
        onSearch(term);
        navigate("/list");
    };

    return (

        <div>
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

        <div className="search-section">
            <div className="search-overlay" /> {/* Overlay div for black background */}
            <div className="search-form">
                <Form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center">
                    <FormControl
                        type="text"
                        placeholder="Search for books..."
                        value={term}
                        onChange={handleChange}
                        className="me-2" // Margin for spacing between input and button
                    />
                    <Button type="submit" variant="primary" className="p-2">Search</Button>
                </Form>
            </div>
        </div>
    </div>
    );
};

export default SearchForm;
