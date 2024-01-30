import './App.css';
import LoginPage from './Components/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem('jlabs-exam-authenticated') === 'true';
    setIsAuthenticated(isLogin);
  }, []);

  return (
    <Routes>
      <Route
        path='/'
        element={
          isAuthenticated ? (
            <Home setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to='/login' />
          )
        }
      />
      <Route
        path='/login'
        element={
          isAuthenticated ? (
            <Navigate to='/' />
          ) : (
            <LoginPage setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />
    </Routes>
  );
}

export default App;
