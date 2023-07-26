

import './App.css';

import React from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Login from "./login";
import Note from "./memo";
import UserDataPage from "./userpage";
import WorkingReport from "./report";
import WorkInOut    from "./WorkingKu";
import Kudobby from "./Dobby";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/dobby" element={<Kudobby/>} />
                <Route path="/report" element={<WorkingReport/>} />
                <Route path="/Attendance" element={<WorkInOut/>} />
                <Route path="/" element={<Login/>} />
                <Route path="/memo" element={<Note/>} />
                <Route path="mypage/" element={<UserDataPage/>} />
                <Route path="/MemoList" element={<MemoList/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;
