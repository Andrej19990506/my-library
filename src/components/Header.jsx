// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Searching';
import './Header.css';

const Header = ({ onLoginClick, username, onLogout, searchQuery, setSearchQuery, onSearch }) => {
    return (
        <header className="header">
            <Link to="/"><h1 className="header__title">Lybr@ry</h1></Link>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={onSearch} />
            {username ? (
                <div>
                    <Link to="/my-books">Мои книги</Link>
                    <span>Добро пожаловать, {username}!</span>
                    <button onClick={onLogout}>Выйти</button>
                </div>
            ) : (
                <button className="header__author-button" onClick={onLoginClick}>Войти</button>
            )}
        </header>
    );
}

export default Header;
