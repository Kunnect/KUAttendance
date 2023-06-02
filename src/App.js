// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserPage from './Userpage';
import Dobby from './Dobby';
import Report from './Report';
import Working from './Working';
import './styles.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // 로그인이 완료되면 isLoggedIn 상태를 변경하는 함수
  const handleLogin = () => {
    if (id === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <Router>
    {isLoggedIn ? (
      <div>
        <div className="nav">
          <Link to="/userpage"><img src="homeIcon.svg" alt="" /></Link>
        </div>
        <div className="nav">
          <Link to="/dobby"><img src="navImg.svg" alt="" /></Link>
        </div>
        <div className="nav">
          <Link to="/report"><img src="navImg.svg" alt="" /></Link>
        </div>
        <div className="nav">
          <Link to="/working"><img src="navImg.svg" alt="" /></Link>
        </div>
      </div>
    ) : (
      <div className="page">
        <h1>Kunnect Attendance Login</h1>
        <div id="input-container">
            ID <input className="login_div" type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" />
            PW <input className="login_div" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
        </div>
        <button onClick={handleLogin}>로그인</button>
      </div>
    )}

    <Routes>
      <Route path="/userpage" element={<UserPage />} />
      <Route path="/dobby" element={<Dobby />} />
      <Route path="/report" element={<Report />} />
      <Route path="/working" element={<Working />} />
    </Routes>
  </Router>
  );
};


export default App;