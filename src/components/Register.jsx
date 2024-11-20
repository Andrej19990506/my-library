import React, { useState } from 'react';
import RegisterModal from './RegisterModal';
import axios from 'axios';
import './RegisterModal.css';

const Register = ({ isOpen, onClose, onRegisterSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы
        console.log("handleRegister был вызван");

        if (!username || !password) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }

        // Логика отправки данных на сервер
        axios.post('http://localhost:5000/api/register', { username, password })
            .then(response => {
                console.log('Регистрация успешна', response.data);
                onRegisterSuccess();
            })
            .catch(err => {
                console.error('Ошибка регистрации:', err);
                setError('Ошибка регистрации. Пожалуйста, попробуйте еще раз.');
            });
    };

    if (!isOpen) return null; // Если модальное окно не открыто, ничего не рендерить

    return (
        <RegisterModal
            username={username}
            password={password}
            error={error}
            onChange={handleChange}
            onRegister={handleRegister} // Убедитесь, что handleRegister передается сюда
            onClose={onClose}
            isOpen={isOpen} // Закрыть модальное окно
        />
    );
};

export default Register;
