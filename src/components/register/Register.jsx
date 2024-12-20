import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import s from './Register.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://67659526410f849996558ecf.mockapi.io/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Registration successful');
                navigate('/login'); 
            } else {
                alert('Registration failed, please try again');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className={s.cont1}>
            <form onSubmit={handleSubmit} className={s.register}>
                <h2>Register</h2>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
