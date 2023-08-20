import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import DATA_JSON from "./MemoTable/WORKING_DATA.json"; // 데이터 파일 경로를 맞게 수정해주세요
import { CaretLeftOutlined } from "@ant-design/icons";
import "./MemoList.css";
import axios from "axios";

function WorkingTime() {
  //studentInfo에 변경이 있을 때만 업데이트
  //accessor와 받아오는 data keyname이 같아야함
  const columnData = [
    {
      Header: "Date", // "Date"는 헤더 이름입니다.
      accessor: "data", // "data"는 해당 열에 표시할 데이터의 키입니다.
    },
    {
      Header: "WorkingTime", // "Time" 컬럼 추가
      accessor: "time", // "time" 데이터 가져오기
    },
  ];
  const columns = useMemo(() => columnData, []);
  //나중에 DATA_JSON을 tabletxt로 바꾸기
  const data = useMemo(() => DATA_JSON, []); // 데이터를 DATA_JSON에서 가져옴
  const tableInstance = useTable({ columns, data });
  const movePage = useNavigate();

  function goMain() {
    movePage("/mypage");
  }

  const [value, setValue] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const fullNameHeaderClass = "fullNameHeader";

  const [studentInfo, setstudentInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageSize, setPageSize] = useState(5); //한페이지에 보여줄 페이지개수

  // 현재 페이지에 해당하는 데이터를 가져오는 함수
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // 이전 페이지로 이동하는 함수
  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // 현재 페이지에 해당하는 데이터를 가져옵니다.
  const currentPageData = useMemo(
    () => getCurrentPageData(),
    [data, currentPage]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    state: { pageIndex, pageCount },
  } = useTable(
    {
      columns,
      data: currentPageData,
      initialState: { pageIndex: 0, pageSize },
    },
    usePagination
  );
  const [tableTxt, setTableTxt] = useState([]);

  // useEffect(() => {
  //   axios.get("/api/workingtime").then((res) => {
  //     if (Array.isArray(res.data) && res.data.length > 0) {
  //       //map 사용시 새로운 배열 생성해서
  //       // const resultObj = res.data.map((item) => item);
  //       // setTeacherInfo(resultObj);
  //       const contents = res.data;
  //       setTableTxt(contents);
  //       console.log("contents:" + contents);
  //     } else {
  //       console.log("데이터가 배열이 아닙니다.");
  //     }
  //   });
  // });
  return (
    <div className="container">
      <div id="title" onClick={goMain}>
        <span id="prevBtn">
          <CaretLeftOutlined />
        </span>
        근무 시간
      </div>

      <div>
        <div className="tableContainer">
          <table {...getTableProps()} className="tableWithBorders">
            <tbody {...getTableBodyProps()}>
              {rows.map((row, rowIndex) => {
                prepareRow(row);
                const isRowSelected = rowIndex === selectedRow;
                return (
                  <tr key={rowIndex} id="rowFont" {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* prev와 next 버튼 */}
        <div id="btnContainer">
          <button
            onClick={goToPrevPage}
            id="tableLeftBtn"
            disabled={currentPage === 1}
          >
            {" << "}prev
          </button>
          <button
            id="tableRightBtn"
            onClick={goToNextPage}
            disabled={currentPage === Math.ceil(data.length / pageSize)}
          >
            next{" >> "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkingTime;
