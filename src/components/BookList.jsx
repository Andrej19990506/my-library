// src/components/BookList.js
import React from 'react';
import BookCard from './BookCard';
import './BookList.css';

function BookList({ books, addBookToMyBooks, isAuthenticated }) {
    return (
        <div className="book-container">
            {books.length === 0 ? (
                <p id="noBooksMessage">Нет доступных книг.</p>
            ) : (
                books.map(book => (
                    <BookCard key={book.id} book={book} isAuthenticated={isAuthenticated} addBookToMyBooks={addBookToMyBooks} />
                ))
            )}
        </div>
    );
}

export default BookList;
