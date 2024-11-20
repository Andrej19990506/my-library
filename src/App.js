import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register  from "./components/Register";
import Header from './components/Header';
import BookList from './components/BookList';
import MyBooks from './components/MyBooks';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  // Используйте pageTransition в вариантах
  const pageVariants = {
    initial: {
      opacity: 0,          // Полностью прозрачный
      x: 100,              // Начальная позиция справа
      y: 50,               // Начальная позиция немного ниже
      scale: 0.8,          // Немного сжатый
    },
    in: {
      opacity: 1,          // Полностью видимый
      x: 0,                // Исходная позиция
      y: 0,                // Исходная позиция
      scale: 1,            // Нормальный размер
      transition: {
        duration: 0.1,    // Длительность перехода
        ease: "easeOut",  // Применяем плавное ослабление
      }
    },
    out: {
      opacity: 0,          // Затухает до прозрачности
      x: -100,             // Выходит налево
      y: -50,              // Сдвигается вверх
      scale: 0.8,          // Сжимается
      transition: {
        duration: 0.1,    // Длительность перехода
        ease: "easeIn",   // Плавное ускорение выхода
      }
    },
  };





  const storageKey = username ? `myBooks_${username}` : 'myBooks_default'; // Уникальный ключ для LocalStorage

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (token) {
      setIsAuthenticated(true); // Токен существует, пользователь аутентифицирован
    } else {
      setIsAuthenticated(false); // Токен не найден, пользователь не аутентифицирован
    }

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    setUsername(null); // Сбросить никнейм
    localStorage.removeItem('token'); // Удалить токен
    localStorage.removeItem('username'); // Удалить имя пользователя
    setIsAuthenticated(false);
    navigate('/'); // Перенаправить на главную страницу
  };


  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const storedBooks = localStorage.getItem(storageKey);
    if (storedBooks) {
      setMyBooks(JSON.parse(storedBooks));
    }
  }, [storageKey]); // Добавили storageKey в зависимости

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(myBooks));
  }, [myBooks, storageKey]); // Добавили storageKey в зависимости


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error('Ошибка при получении книг:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchQuery) {
      setFilteredBooks(books); // Возвращаем все книги при пустом запросе
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(lowerCaseQuery) ||
        book.author.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, books]); // Добавляем searchQuery и books в зависимости

  useEffect(() => {
    handleSearch(); // Фильтруем книги при изменении searchQuery
  }, [searchQuery, handleSearch]);

  const addBookToMyBooks = (book) => {
    if (!myBooks.some(existingBook => existingBook.id === book.id && existingBook.title === book.title && existingBook.author === book.author)) {
      setMyBooks(prevBooks => [...prevBooks, book]);
      alert(`${book.title} добавлена в Мои книги`); // Пример уведомления
    } else {
      alert(`${book.title} уже есть в Моих книгах`); // Уведомление о дубликате
    }
  };

  const removeBookFromMyBooks = (bookId) => {
    setMyBooks(myBooks.filter((book) => book.id !== bookId));
  };

  const handleRegisterSuccess = () => {
    setRegisterModalOpen(false); // Закрыть модальное окно регистрации
    setLoginModalOpen(true); // Открыть модальное окно авторизации
  };

  const handleLoginSuccess = (user) => {
    console.log('Успешный вход', user);
    setUsername(user.username); // Сохраните никнейм в состоянии
    setIsAuthenticated(true); // Установите авторизацию в true
    localStorage.setItem('username', user.username);
    setLoginModalOpen(false); // Закрыть модальное окно входа
  };

  return (
      <div className="App">
        <Header 
          onLoginClick={() => setLoginModalOpen(true)}
          username={username} 
          onLogout={handleLogout}
          searchQuery={searchQuery}       
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
        <Login
          isOpen={isLoginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onRegisterClick={() => {
            console.log("Открытие модального окна регистрации"); // Логирование открытия
            setLoginModalOpen(false); // Закрыть модальное окно авторизации
            console.log("Закрыто модальное окно авторизации"); // Логирование закрытия авторизации
            setRegisterModalOpen(true); // Открыть модальное окно регистрации
            console.log("Открыто модальное окно регистрации"); // Логирование открытия регистрации
          }}
          onLoginSuccess={handleLoginSuccess}
        />

        <Register
          isOpen={isRegisterModalOpen} // Передаем состояние для открытия
          onClose={() => setRegisterModalOpen(false)} // Закрыть модальное окно
          onRegisterSuccess={handleRegisterSuccess} // Сообщить о успешной регистрации
        />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <BookList books={filteredBooks} isAuthenticated={isAuthenticated} addBookToMyBooks={addBookToMyBooks} />
              </motion.div>
            }
          />
          <Route
            path="/my-books"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <MyBooks myBooks={myBooks} onRemoveBook={removeBookFromMyBooks} />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;