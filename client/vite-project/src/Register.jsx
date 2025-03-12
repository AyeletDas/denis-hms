// https://readymadeui.com/tailwind-blocks/registration-form
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!email || !password || !firstName || !lastName) {
            setError('All fields required');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:4000/api/users/register', {
                email,
                password,
                firstname: firstName,
                lastname: lastName
            }, {
                headers: { 'Content-Type': 'application/json'}
            });

            navigate('/login');

        } catch (err) {
            setError('err');
        }
    };
    return (
        <div className="max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif] p-6">
            <div className=" mb-12 sm:mb-16 ">
                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto text-center"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    הרשמה
                </h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6 ">
                    <div>
                        <label className="text-gray-600 text-sm mb-2 block text-right">שם פרטי</label>
                        <input
                            name="firstName"
                            type="text"
                            className="text-right bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="הכנס שם פרטי"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm mb-2 block text-right">שם משפחה</label>
                        <input
                            name="lastName"
                            type="text"
                            className="text-right bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="הכנס שם משפחה"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm mb-2 block text-right">דוא"ל</label>
                        <input
                            name="email"
                            type="email"
                            className="text-right bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="הכנס מייל"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm mb-2 block text-right">סיסמא</label>
                        <input
                            name="password"
                            type="password"
                            className="text-right bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="הכנס סיסמא"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <button type="submit" className="mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none">
                        הירשם
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
