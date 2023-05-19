import React, { useState, useEffect } from 'react';
//import { getUsers, getMonthlyWorkHours } from './db';

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
function Dobby() {
  // const [users, setUsers] = useState([]);
  // const [monthlyWorkHours, setMonthlyWorkHours] = useState([]);
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
    <div>
      <h1>현재 출근중인 멤버</h1>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h1>상위 랭커 3</h1>
      <ol>
        {topThreeUsersByWorkHours.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ol>
    </div>
  );
}

export default Dobby;
