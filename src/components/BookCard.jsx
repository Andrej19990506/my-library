import React from 'react';
import './BookCard.css'; // Импортируйте CSS файл

const getImagePath = (title) => {
    switch (title) {
        case "Война и мир":
            return "/images/var.png";
        case "1984":
            return "/images/1984.png";
        case "Гарри Поттер и философский камень":
            return "/images/garry_poter.png";
        case "Сияние":
            return "/images/gloren.png";
        case "Думай и богатей":
            return "/images/think_money.png";
        case "Маленький принц":
            return "/images/small_princ.png";
        case "451 градус по Фаренгейту":
            return "/images/451_gradus_po_faringatu.png";
        default:
            return "/images/default_image.png";
    }
};

function BookCard({ book, isAuthenticated, addBookToMyBooks, onRemoveBook }) {
    const imagePath = getImagePath(book.title);

    // Функция добавления книги, которую нужно использовать только в разделе BookList
    const handleAddBook = () => {
        if (isAuthenticated) {
            addBookToMyBooks(book); // Если пользователь авторизован, добавляем книгу
        } else {
            alert("Пожалуйста, авторизуйтесь для добавления книг."); // Уведомление о необходимости авторизации
        }
    };

    return (
        <div className="book-item" style={{ backgroundImage: `url(${imagePath})` }}>
            <div className="book-item-content">
                <h3>{book.title}</h3>
                <p>Автор: {book.author}</p>
                <p>Год: {book.year}</p>
                <p>Жанр: {book.genre}</p>
                <div className="rating">
                    Рейтинг: <span>{book.rating}</span>
                </div>
                {onRemoveBook ? ( // Проверяем, передан ли onRemoveBook
                    <button
                        className="remove-from-my-books"
                        onClick={onRemoveBook} // Обработчик для удаления книги
                    >
                        Удалить из Моих книг
                    </button>
                ) : (
                    <button
                        className="add-to-my-books"
                        onClick={handleAddBook} // Добавляем книгу при клике
                    >
                        Добавить в Мои книги
                    </button>
                )}
            </div>
        </div>
    );
}

export default BookCard;
