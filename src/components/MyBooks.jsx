import React from 'react';
import BookCard from './BookCard'; // Импортируем BookCard
import './MyBooks.css';

function MyBooks({ myBooks, onRemoveBook }) {
    return (
        <div className="mybook-container">
            {myBooks.length === 0 ? (
                <p>У вас пока нет добавленных книг.</p>
            ) : (

                myBooks.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onRemoveBook={() => onRemoveBook(book.id)} // Передаем функцию удаления книги
                    />
                ))
            )}
        </div>
    );
}

export default MyBooks;
