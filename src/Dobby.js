import React from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';

function showWorkingMembers(users) {
    return users.filter(user => user.attendance === true);
}

function showKingThreeDobby(users) {
    // monthlyWorkHours를 기준으로 내림차순으로 정렬
    const sortedUsers = users.sort((a, b) => b.monthlyWorkHours - a.monthlyWorkHours);
    // 상위 세 명 추출
    const topThree = sortedUsers.slice(0, 3);

    return topThree;
}
function Kudobby() {
    // const [users, setUsers] = useState([]);
    // const [monthlyWorkHours, setMonthlyWorkHours] = useState([]);

    const movePage = useNavigate();

    function goMain() {
        movePage('/Attendance');
    }

    // function goHome() {
    //     movePage('/');
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

    const users = [
        {
            name: "민수",
            attendance: false,
            monthlyWorkHours: 38
        },
        {
            name: "나경",
            attendance: true,
            monthlyWorkHours: 30
        },
        {
            name: "혜주",
            attendance: true,
            monthlyWorkHours: 37
        },
        {
            name: "민성",
            attendance: true,
            monthlyWorkHours: 31
        },
        {
            name: "준형",
            attendance: true,
            monthlyWorkHours: 39
        }
    ];

    const filteredUsers = showWorkingMembers(users);
    const topThreeUsersByWorkHours = showKingThreeDobby(users);

    return (
        <div className="Kudobby">
            <now>
            <h2>현재 출근중인 멤버</h2>
            <ul>
                {filteredUsers.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            </now>
            <ranker>
            <h2>상위 랭커 3</h2>
            <ol>
                {topThreeUsersByWorkHours.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ol>
            </ranker>
        </div>
    );
}

export default Kudobby;