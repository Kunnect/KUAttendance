import React, {useState, useReducer} from 'react'
//import VisualizeOfficeIn from "./ShowWorkData";
import { useNavigate } from "react-router-dom";
import './App.css';
import {set_logout} from './App'

let WorkInTime = "00:00:00"; // 출근 시간 기록
let WorkOutTime = "00:00:00"; // 퇴근 시간 기록
let WorkingHour; // 일한 시간 (퇴근 시간 - 출근 시간)
let WorkingMinitue; // 일한 분(퇴근 시간 - 출근 시간)
let WorkingSec; // 일한 초(퇴근 시간 - 출근 시간)
let IsWork = false; // 출근 여부 확인
let IsOut = false;
let curTime;


// let IsWorkIn = false;
const reducer = (state, action) =>{
    switch(action.type) {
        case 'diposit-in':
            IsWork=true;
            curTime = Date();
            WorkInTime = curTime.split(" ")
            WorkOutTime = curTime.split(" ")

            // const name = action.payload.name;
            const newDate = {
                date: Date(),
                // name,
                isHere: false,
            }

            return {
                count: state.count+1,
                dayData: [...state.dayData, newDate]
            }
        case 'diposit-out':
            IsWork = false;
            IsOut = true;
            curTime = Date();
            WorkOutTime = curTime.split(" ")
            return {
                count: state.count,
                dayData: state.dayData.filter(
                    (WorkData) =>WorkData.isHere = !WorkData.isHere,
                ),
            }
        default:
            return state;
    }


}
const initialState ={
    count: 0,
    dayData : [
    ],

};
function loadFiles(){

}

function saveFiles(nowDate,month){
    if(IsWork===true) {
        let jsonWorkIn = {
            year:nowDate[3],
            month:month,
            day:nowDate[2],
            Time:WorkInTime[4]
        };


        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/v1/workin");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(jsonWorkIn));
    }
    else{
        let inTime = WorkInTime[4].split(":");
        let outTime = WorkOutTime[4].split(":");
        WorkingHour = outTime[0]-inTime[0];
        WorkingMinitue = outTime[1]-inTime[1];
        WorkingSec = outTime[2]-inTime[2];
        if(WorkingHour<0)
        {
            WorkingHour = "17"-inTime[0];
            WorkingMinitue = "30"-inTime[1];
            WorkingSec = "00"-inTime[2];
        }
        if(WorkingSec<0)
        {
            WorkingMinitue-=1;
            WorkingSec+=60;
        }
        if(WorkingMinitue<0)
        {
            WorkingHour -=1;
            WorkingMinitue+=60;
        }
        let jsonTest = {
            year:nowDate[3],
            month:month,
            day:nowDate[2],
            Time:WorkOutTime[4],
            WorkHour: WorkingHour,
            WorkMin:WorkingMinitue,
            WorkSec:WorkingSec
        };

        const xhr2 = new XMLHttpRequest();
        xhr2.open("POST", "/api/v1/workin");
        xhr2.setRequestHeader("Content-Type", "application/json");
        xhr2.send(JSON.stringify(jsonTest));
    }
}
function WorkInOut() {

    const [workTimeInfo, dispatch]  = useReducer(reducer, initialState);
    const movePage = useNavigate();

    function gohome() {
        IsOut = false;
        IsWork = false;
        set_logout();
        movePage('/');
    }

    function goMain() {
        movePage('/Attendance');
    }
    function goMemo() {
        IsOut = false;
        movePage('/memo');
    }


    let curData = Date();
    let nowDate = curData.split(" ")
    let curHMS = nowDate[4].split(":")
    let month =0;
    let User_name = "박민수";

    switch (nowDate[1]){
        case 'Jan':
            month =1;
            break;
        case 'Feb':
            month =2;
            break;
        case 'Mar':
            month =3;
            break;
        case 'Apr':
            month =4;
            break;
        case 'May':
            month =5;
            break;
        case 'Jun':
            month =6;
            break;
        case 'Jul':
            month =7;
            break;
        case 'Aug':
            month =8;
            break;
        case 'Sept':
            month =9;
            break;
        case 'Oct':
            month =10;
            break;
        case 'Nov':
            month =11;
            break;
        case 'Dec':
            month =12;
            break;
        default :
            month =0;
            break;
    }

    if(IsWork===false&&IsOut === false) {

        return (
            <div className="WorkInOut">
                <div className="WorkSheet">
                    {/*<h4>출근부</h4>*/}
                    <p><p1>{nowDate[3]}/{month}/{nowDate[2]}</p1>
                        <p2>{curHMS[0]}:{curHMS[1]}:{curHMS[2]}</p2>
                        <br/><br/>
                        <p3>근로장학생 '{User_name}'</p3> <br/>
                        <p4>- 근무지 정보통신처</p4> <br/>
                        <p4>- 모시깽</p4> <br/></p>
                    <button
                        onClick={() => {
                            dispatch({type: 'diposit-in'})
                            //dispatch({type: 'diposit-in', payload: {name}})
                        }
                        } >
                        출근하기

                    </button>
                    {/*{workTimeInfo.dayData.map((WorkData) => {*/}
                    {/*    return (<VisualizeOfficeIn key={WorkData.id}*/}
                    {/*                               dispatch={dispatch} id={WorkData.id}*/}
                    {/*                               />)*/}
                    {/*})}*/}
                </div>
                <div className="WorkList">
                    <p><p1>{nowDate[2]}일 출/퇴근 기록</p1>
                        <p2>출근</p2>
                        <p3>퇴근</p3></p>
                </div>
                <div className="adminOrder">
                    <p><p1>관리자 요청사항</p1></p>
                </div>
            </div>
        );
    }
    else if(IsOut === false)
    {
        saveFiles(nowDate,month);
        return (
            <div className="WorkInOut">
                <div className="WorkSheet">
                    {/*<h1>출근부</h1>*/}
                    <p><p1>출근</p1><p2 style ={{left:"80%"}}>퇴근</p2><br/><br/>
                        <p5>{WorkInTime[4]}</p5>
                        ->
                        <p6>--:--</p6>   <br/><br/><br/></p>

                    <button
                        onClick={()=>{
                            dispatch({type: 'diposit-out'})}
                        }>
                        퇴근하기
                    </button>
                </div>

                <div className="WorkList">
                    <p><p1>{nowDate[2]}일 출/퇴근 기록</p1>
                        <p2>출근</p2>
                        <p3>퇴근</p3></p>
                </div>
                <div className="adminOrder">
                    <p><p1>관리자 요청사항</p1></p>
                </div>
            </div>
        );
    }
    else
    {
        saveFiles(nowDate,month);
        return (
            <div className="WorkInOut">
                <div className="WorkOutSheet">
                    <p><p11>출근 시간</p11><p21>{WorkInTime[4]}</p21></p><br/>
                    <p><p12>퇴근 시간</p12><p22>{WorkOutTime[4]}</p22></p><br/>
                    <p><p13>근무 시간</p13><p33>{WorkingHour}{"시간 "}{WorkingMinitue}{"분 "}{WorkingSec}{"초"}</p33></p><br/>
                    <div className="WorkOutsubButton">
                        <button onClick={gohome}>
                            로그아웃
                        </button>
                        <button onClick={goMemo}>
                            메모장
                        </button>
                    </div>
                </div>
                <div className="WorkList">
                    <p><p1>{nowDate[2]}일 출/퇴근 기록</p1>
                        <p2>출근</p2>
                        <p3>퇴근</p3></p>
                </div>
            </div>
        );
    }
}
export default WorkInOut;
