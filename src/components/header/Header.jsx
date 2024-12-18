import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import s from './Header.module.css'

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.task}>
                <h1>Task Manager</h1>
            </div>
            <div className={s.input}>
                <input type="text" placeholder="Search entries" />
                <IoIosSearch color="#f3a5f3" />
            </div>
            <div className={s.btn}>
                <button className={s.link}>Register</button>
                <button className={s.link}>Login</button>
            </div>
        </header>
    );
};

export default Header;
