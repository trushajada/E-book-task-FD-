import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './Componets/SearchForm/SearchForm'; 
import BookList from './Componets/BookList/BookList';
import BookDetail from './Componets/BookDetail/BookDetail'; 
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
      setSearchTerm(term);
  };

  return (
      <>
          <Routes>
              <Route path='/' element={<SearchForm onSearch={handleSearch} />} />
              <Route 
                  path="/list" 
                  element={<BookList searchTerm={searchTerm} />} 
              />
              <Route 
                  path="/book/:id" 
                  element={<BookDetail />} 
              />
              <Route 
                  path="*" 
                  element={<h2>Page not found. Please check the URL.</h2>} 
              />
          </Routes>
      </>
  );
};


export default App;
