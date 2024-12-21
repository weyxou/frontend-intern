import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.task}>
                <h1>Task Manager</h1>
            </div>
            <div className={s.btn}>
                <Link to="/register">
                    <button className={s.link}>Register</button>
                </Link>
                <Link to="/login">
                    <button className={s.link}>Login</button>
                </Link>
            </div>
        </header>
    );
};

export default Header;
