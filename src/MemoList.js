// import React, {useMemo} from "react";
// import { useNavigate } from "react-router-dom";
// import {useTable} from "react-table";
// import MEMO_DATA from "./MemoTable/MEMO_DATA.json";
// import {COLUMNS} from "./MemoTable/columns"
// import './MemoList.css';

// function MemoList (){
//     const columns = useMemo(()=>COLUMNS, []);
//     const data = useMemo(()=>MEMO_DATA, []);
//     const tableInstance = useTable({columns,data});
//     const movePage = useNavigate();

//     function goMain() {
//         movePage('/Attendance');
//     }



//     return (
//       <table>
//         <thead>table
//           <tr>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr></tr>
//         </tbody>
//       </table>
//     );
// }
// export default MemoList;
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import DATA_JSON from "./MemoTable/MEMO_DATA.json"; // 데이터 파일 경로를 맞게 수정해주세요
import { COLUMNS } from "./MemoTable/columns";
import './MemoList.css';


function MemoList() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA_JSON, []); // 데이터를 DATA_JSON에서 가져옴
  const tableInstance = useTable({ columns, data });
  const movePage = useNavigate();

  function goMain() {
    movePage('/Attendance');
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div>
      <button onClick={goMain}>Go to Attendance</button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MemoList;
