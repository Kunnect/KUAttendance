
import './App.css';

import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Login from "./login";
import Note from "./memo";
import UserDataPage from "./userpage";
import WorkingReport from "./report";
import WorkInOut    from "./WorkingKu";
import Kudobby from "./Dobby";
import MemoList from "./MemoList";
let isLoggedIn = false;
export function set_login(){
    isLoggedIn = true;
    return 0;
}
export function set_logout(){
    isLoggedIn = false;
    return 1;
}

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


    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    // 로그인이 완료되면 isLoggedIn 상태를 변경하는 함수
    const handleLogin = () => {
        if (id === 'admin' && password === 'admin123') {
            // setIsLoggedIn(true);
            goMain();
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
                <Route path="/" element={<Login/>} />
                <Route path="/memo" element={<Note/>} />
                <Route path="mypage/" element={<UserDataPage/>} />
                <Route path="/MemoList" element={<MemoList/>}/>
            </Routes>
        </div>
        );
    }
    else {
        return (
            <div>
                <Routes>
                    <Route path="/dobby" element={<Kudobby/>} />
                    <Route path="/report" element={<WorkingReport/>} />
                    <Route path="/Attendance" element={<WorkInOut/>} />
                    <Route path="/" element={<Login/>} />
                    <Route path="/memo" element={<Note/>} />
                    <Route path="mypage/" element={<UserDataPage/>} />
                    <Route path="/MemoList" element={<MemoList/>}/>
                </Routes>
                    </div>
        );
    }
}

export default App;
