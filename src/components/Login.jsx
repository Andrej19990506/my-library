import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginModal from './LoginModal';
import './LoginModal.css'; // Импортируем стили

const Login = ({ isOpen, onClose, onRegisterClick, onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setError(''); // Сбрасываем ошибку при открытии модального окна
        }
    }, [isOpen]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы

        if (!credentials.username || !credentials.password) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }

        console.log("Отправка данных на сервер:", credentials);
        axios.post('http://localhost:5000/api/login', credentials)
            .then(response => {
                console.log("Вход успешен", response.data);
                localStorage.setItem('token', response.data.token);
                onLoginSuccess({ username: credentials.username }); // Уведомить родительский компонент о успешном входе
                onClose(); // Закрыть модальное окно
            })
            .catch(error => {
                console.error("Ошибка входа:", error);
                setError("Неверное имя пользователя или пароль.");
            });
    };

    if (!isOpen) return null; // Не рендерить, если модальное окно не открыто

    return (
        <div className="author-modal-overlay">
            <div className="author-modal">
                <span className="close-auth-modal" onClick={onClose}>&times;</span>

                <LoginModal
                    username={credentials.username}
                    password={credentials.password}
                    error={error}
                    onChange={handleChange}
                    onRegisterClick={onRegisterClick}
                    isOpen={isOpen}
                    onClose={onClose}
                    onSub={handleSubmit} // Передаем обработчик
                />
            </div>
        </div>
    );
};

export default Login;
