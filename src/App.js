
import './App.css';

import React from 'react';
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
    return (
                <div className='App'>
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
                        </Routes>
                </div>
    );
}

export default App;
