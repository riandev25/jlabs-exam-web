import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

interface ILoginResponse {
  success: boolean;
  message: string;
}

interface ILoginPage {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage = ({ setIsAuthenticated }: ILoginPage) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = 'http://localhost:3001/api/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: ILoginResponse = await response.json();
    if (data.success) {
      setIsAuthenticated(true);
      localStorage.setItem('jlabs-exam-authenticated', String(data.success));
    }
  };

  return (
    <div className='App'>
      <div className='container-fluid w-25 vh-100 d-flex align-items-center justify-content-center'>
        <div className='card w-100'>
          <div className='card-header'>
            <h4>Login</h4>
          </div>
          <div className='card-body'>
            <form onSubmit={handleLogin}>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Username
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
