import React, { useRef, useState } from 'react';
import './Searching.css';
import { gsap } from 'gsap';

function Search({ searchQuery, setSearchQuery, onSearch }) {
    const inputRef = useRef(null);
    const [isInputVisible, setIsInputVisible] = useState(false);

    const handleIconHover = () => {
        // Анимация появления поля ввода при наведении курсора
        gsap.to(inputRef.current, {
            opacity: 1,
            width: 200, // Сдвигаем на 0, чтобы показать
            duration: 0.5,
            onComplete: () => {
                setIsInputVisible(true);
            },
        });
    };

    const handleMouseLeave = () => {
        // Если поле ввода пустое, скрываем его
        if (!inputRef.current.value) {
            gsap.to(inputRef.current, {
                opacity: 0,
                width: 0, // Сдвигаем влево, чтобы скрыть
                duration: 0.5,
                onComplete: () => {
                    setIsInputVisible(false);
                },
            });
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        onSearch(); // Вызываем onSearch при изменениях в поле ввода
    };

    return (
        <div
            className="header__search"
            onMouseEnter={handleIconHover}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`header__search-icon ${isInputVisible ? 'active' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                    <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
                </svg>
            </div>
            <input
                type="text"
                placeholder="Поиск по названию или автору"
                value={searchQuery}
                onChange={handleInputChange}
                className="search-input"
                ref={inputRef}
                style={{
                    position: 'absolute',
                    opacity: 0, // Поле скрыто изначально
                    
                }}
            />
        </div>
    );
}

export default Search;
