
import './App.css';

import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Login from "./login";
import Note from "./memo";
import UserDataPage from "./userpage";
import UserPage from "./userpage";
import WorkingReport from "./report";
import WorkInOut    from "./WorkingKu";
import Kudobby from "./Dobby";




function App() {
    const movePage = useNavigate();

    function goMain() {
        movePage('/Attendance');
    }
    function goMemo() {
        movePage('/memo');
    }

    // 하단 페이지
    function goMypage() {
        movePage('/mypage');
    }
    function goCommunity() {
        movePage('/dobby');
    }
    function goReport() {
        movePage('/report');
    }

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
    if(isLoggedIn===true)
    {
        return (<div className='App'>
            <div className="bottom-buttons">
                <button  onClick={goReport} >
                    보고서
                </button>
                <button onClick={goCommunity} >
                    커뮤니티
                </button>
                <button onClick={goMain} >
                    근로
                </button>
                <button onClick={goMypage} >
                    마이페이지
                </button>
            </div>
            <Routes>
                <Route path="/dobby" element={<Kudobby/>} />
                <Route path="/report" element={<WorkingReport/>} />
                <Route path="/Attendance" element={<WorkInOut/>} />
                <Route path="/" element={<WorkInOut/>} />
                <Route path="/memo" element={<Note/>} />
                <Route path="mypage/" element={<UserDataPage/>} />
            </Routes>
        </div>
        );
    }
    else {
        return (
            <div className="page">
                        <h1>Kunnect Attendance Login</h1>
                        <div id="input-container">
                            ID <input className="login_div" type="text" value={id}
                                      onChange={(e) => setId(e.target.value)} placeholder="아이디"/>
                            PW <input className="login_div" type="password" value={password}
                                      onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호"/>
                        </div>
                        <button onClick={handleLogin}>로그인</button>
                    </div>
        );
    }
}

export default App;