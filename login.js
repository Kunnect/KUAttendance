//src/login.js
import React, {useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import './App.css';
import './styles.css';
import {set_login} from "./App";
import WorkInOut from "./WorkingKu";


function Login() {
    const movePage = useNavigate();

    function goMain() {
        movePage('/Attendance');
    }
    // function goMemo() {
    //     movePage('/memo');
    // }

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
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    // 로그인이 완료되면 isLoggedIn 상태를 변경하는 함수
    const handleLogin = () => {
        if (id === 'admin' && password === 'admin123') {
            set_login();
            goMain();
        } else {
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };

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
export default Login;