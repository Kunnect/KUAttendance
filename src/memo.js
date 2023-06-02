import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';


let memoScripts;
let save_memo;
let isSave=false;

function Note() {
    const movePage = useNavigate();

    function goMain() {
        movePage('/Attendance');
    }

    function goHome() {
        if(isSave===true) {
            movePage('/');
            isSave=false;
        }
    }



    const [memos, setMemos] = useState([]);
    const [memo, setMemo] = useState("");

    function addMemo() {
        setMemos([...memos, memo]);
        setMemo("");
        save_memo = memoScripts;
        isSave=true;
        // goHome();
    }

    const handleChange = (event) => {
        if(memo.length<=300) {
                setMemo(event.target.value);
        }
        if(memo.length===301){
            setMemo(memo.slice(0, -1));
        }

    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            setMemo(memo + '\n');
        }

    };
    return (
        <div className="Memo">
            <p>메모장 페이지입니다</p>
            <ul>
                {memos.map((memo, index) => (
                    <li key={index}>{memo}</li>
                ))}
            </ul>

      <textarea
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={memo}
      />
            <p style={{left: '100%', transform:  'translate(270px)'}}>
                {memo.length}/300
            </p>

            <p><p1><button onClick={addMemo}>저장</button></p1></p>
            <p><p1><button onClick={goHome}>나가기</button></p1></p>
            {/*<button onClick={goMain}>*/}
            {/*        출근부*/}
            {/*       </button>*/}
            {/*   <button onClick={goHome}>*/}
            {/*    로그인*/}
            {/*   </button>*/}
        </div>
    );
}

export default Note;