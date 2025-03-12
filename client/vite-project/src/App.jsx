import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Logout from './Logout';
import UserList from './UserList';
import AuthPage from './AuthPage';

function App() {
  const ProtectedRoute = ({ children  }) => {
    const token = localStorage.getItem('token');  // Checks if a token exists in localStorage
  
    if (!token) { // Not exists
      return <Navigate to="/login" />;
    }
    return children ; // Displays the protected element
  };

  const navigate = useNavigate();
  const handleLoginSuccess = (user) => { // Save user information in localStorage
    localStorage.setItem('user', JSON.stringify(user)); // setItem- key and value- add the value to the correct key. [JavaScript stringify- string for localStorage]
    navigate('/user-list');
  };

  return (
    <div>
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        היי דניס, ברוך הבא
      </h2> <br />
      <Routes>
        <Route path="/" element={<button onClick={() => navigate('/login')}
          className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          התחבר
        </button>
        }
        />
        <Route path="/login" element={<AuthPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user-list" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
