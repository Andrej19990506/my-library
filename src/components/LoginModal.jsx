import React from 'react';
import './LoginModal.css'; // Импортируем стили

const LoginModal = ({ username, password, error, onChange, onRegisterClick, isOpen, onClose, onSub }) => {
    if (!isOpen) return null; // Если isOpen ложное, ничего не рендерим

    return (
            <div className="author-modal">
                <span className="close-auth-modal" onClick={onClose}>&times;</span>
                <h2>Авторизация</h2>
                {error && <div className="error">{error}</div>}

                <form onSubmit={onSub}> {/* Используем onSubmit, переданный из Login */}
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        placeholder="Имя пользователя"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Пароль"
                        required
                    />
                    <button type="submit" className="login__btn">Войти</button> {/* Кнопка для отправки формы */}
                    <button type="button" className="auth__regestr-btn" onClick={onRegisterClick}>
                        Регистрация
                    </button>
                </form>
            </div>
    );
};

export default LoginModal;
