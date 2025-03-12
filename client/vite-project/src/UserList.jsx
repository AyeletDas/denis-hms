import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from './Logout';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError(' Token not found');
          return;
        }

        const response = await axios.get('http://localhost:4000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Sends a GET request to the server with the token
          },
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Error in get users:', err);
        setError('Error in get users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-center text-xl font-bold">רשימת משתמשים</h2>
      <Logout />
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      <ul> {/* Returns a new array */}
        {users.map((user) => ( 
          <li key={user._id} className="border-b py-2">
            {user.email} - {user.firstname} {user.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default UserList;
