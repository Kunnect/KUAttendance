//src/login.js
import React from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';

function UserDataPage() {
    const movePage = useNavigate();

    function goMemo() {
        movePage('/memo');
    }


    return (
        <div className="mypage">
            <p>마이 페이지입니다</p>

            <button onClick={goMemo}>
                메모장
            </button>
        </div>
    );
}
export default UserDataPage;