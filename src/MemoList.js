import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import DATA_JSON from "./MemoTable/MEMO_DATA.json"; // 데이터 파일 경로를 맞게 수정해주세요
import { IconName } from "react-icons/ai";
import "./MemoList.css";

function MemoList() {
  //studentInfo에 변경이 있을 때만 업데이트
  //accessor와 받아오는 data keyname이 같아야함
  const columnData = [
    {
      Header: "Date", // "Date"는 헤더 이름입니다.
      accessor: "data", // "data"는 해당 열에 표시할 데이터의 키입니다.
    },
    {
      Header: "Memo",
      accessor: "memo",
    },
  ];
  const columns = useMemo(() => columnData, []);
  const data = useMemo(() => DATA_JSON, []); // 데이터를 DATA_JSON에서 가져옴
  const tableInstance = useTable({ columns, data });
  const movePage = useNavigate();

  function goMain() {
    movePage("/Attendance");
  }

  const [value, setValue] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const fullNameHeaderClass = "fullNameHeader";

  // 체크박스가 체크되었는지 여부를 관리하는 상태
  const [checkedRows, setCheckedRows] = useState([]);

  // 체크박스를 클릭할 때마다 해당 행의 인덱스를 상태에 추가 또는 제거하는 함수
  const handleCheckboxChange = (rowIndex) => {
    if (checkedRows.includes(rowIndex)) {
      setCheckedRows((prev) => prev.filter((index) => index !== rowIndex));
    } else {
      setCheckedRows((prev) => [...prev, rowIndex]);
    }
  };
  //radio를 클릭하면 인덱스 받아오기
  const handleRadioChange = (rowIndex) => {
    setSelectedRow(rowIndex);
  };

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

  return (
    <div>
      <div></div>
      <div>
        <div>
          <table {...getTableProps()} className="tableWithBorders">
            {" "}
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
        <div>
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

export default MemoList;
