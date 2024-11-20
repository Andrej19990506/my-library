import React from 'react';
import './RegisterModal.css';

const RegisterModal = ({ username, password, error, onChange, onRegister, isOpen, onClose }) => {
    if (!isOpen) return null; // Если модальное окно не открыто, ничего не рендерить

    return (
        <div className="author-modal-overlay">
            <div className="author-modal">
                <span className="close-auth-modal" onClick={onClose}>&times;</span>
                <h2>Регистрация</h2>
                {error && <div className="error">{error}</div>}

                <form onSubmit={onRegister}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Имя пользователя"
                        value={username}
                        onChange={onChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={onChange}
                        required
                    />
                    <button type="submit" className="login__btn">Зарегистрироваться</button>
                </form>
                <button className="auth__regestr-btn" onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default RegisterModal;
