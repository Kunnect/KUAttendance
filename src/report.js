//src/login.js
import React from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';

function WorkingReport() {
    const movePage = useNavigate();

    function goMain() {
        movePage('/Attendance');
    }
    function goMemo() {
        movePage('/memo');
    }


    return (
        <div className="report">
            <p>보고서 페이지입니다</p>
            <button onClick={goMain} >
                출근부
            </button>
            <button onClick={goMemo}>
                메모장
            </button>
        </div>
    );
}
export default WorkingReport;