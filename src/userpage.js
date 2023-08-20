//src/login.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./userpage.css";
import * as dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 가져오기

dayjs.locale("ko"); // 언어 등록

var username = "홍길동";
var userinfo = "정보통신장학생";
var workingTime = "1h 50m";
var date2 = dayjs("2023-07-24 12:00:00", "YYYY-MM-DD HH:mm:ss");
// var now = timeStamp.format();
var date1 = dayjs();
var diff = date1.diff(date2, "minute");
var hours = Math.floor(diff / 60);
var minutes = diff % 60;

// 결과를 "hh:mm" 형식으로 포맷팅
var diffString =
  hours.toString().padStart(2, "0") +
  "h " +
  minutes.toString().padStart(2, "0") +
  "m";

function UserDataPage() {
  const movePage = useNavigate();

  function goMemoList() {
    movePage("/MemoList");
  }
  function goWorkingTime() {
    movePage("/WorkingTime");
  }
  return (
    <div className="mypage">
      <h2>마이 페이지</h2>
      <div id="userInfo">
        <img
          id="userImg"
          src="/img/userImg.jpeg"
          height="100px"
          width="100px"
        ></img>

        <div id="userText">
          {username} <br></br> {userinfo}
        </div>
      </div>
      <div id="workTime">이번달 근로 시간 : {diffString}</div>
      {/* <div>timestamp test: {diff}</div> */}
      <div id="mymenu">
        <h2>마이메뉴</h2>
        <p onClick={goMemoList}>작성된 메모 보기</p>
        <p onClick={goWorkingTime}>저장된 근무 시간 확인하기</p>
      </div>
    </div>
  );
}
export default UserDataPage;
