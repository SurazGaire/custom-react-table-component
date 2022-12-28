import React, { useEffect, useState } from "react";
import "./CustomTable.scss";

import {
  Header,
  Pagination,
  TableFooter,
  TableHead,
  TBody,
} from "../../sections/table";

import { data } from "../../data";

const columnData = [
  { id: 1, field: "id", header: "ID" },
  { id: 2, field: "first_name", header: "First Name" },
  { id: 3, field: "last_name", header: "Last Name" },
  { id: 4, field: "email", header: "Email" },
  { id: 5, field: "gender", header: "Gender" },
  { id: 6, field: "address", header: "Address" },
  { id: 7, field: "phone", header: "Phone No" },
  { id: 9, field: "date_of_birth", header: "DOB" },
  { id: 10, field: "delete", header: "" },
];
const CustomTable = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [displayCopy, setDisplayCopy] = useState({
    row: null,
    col: null,
    show: true,
  });
  const [sort, setSort] = useState({ column: "", order: "" });
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, seTRowPerPage] = useState(8);
  const [disabled, setDisabled] = useState(false);
  const [rowsToDisplay, setRowsToDisplay] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const changeSearchValue = (e) => {
    e.preventDefault();
    let filteredData = rowsToDisplay.filter(
      (data) =>
        console.log(data.first_name.toLowerCase().includes(e.target.value)) ||
        data.last_name.toLowerCase().includes(e.target.value) ||
        data.email.toLowerCase().includes(e.target.value) ||
        data.gender.toLowerCase().includes(e.target.value) ||
        data.address.includes(e.target.value) ||
        data.phone.includes(e.target.value)
    );
    console.log(filteredData);
    const filterDisplay =
      filteredData.length >= 1 ? filteredData : rowsToDisplay;
    setRowsToDisplay(filterDisplay);
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setTableData(data);
    setColumns(columnData);
  }, []);

  useEffect(() => {
    const lastPostIndex = currentPage * rowPerPage;
    const firstPostIndex = lastPostIndex - rowPerPage;
    console.log(firstPostIndex);
    setRowsToDisplay(data.slice(firstPostIndex, lastPostIndex));
  }, [currentPage]);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleDelete = (id) => {
    const rowToDelete = rowsToDisplay.filter((data) => data.id === id);
    if (rowToDelete.length !== 0) {
      let confirmation = window.confirm(
        `Do you really want to delete ${rowToDelete[0].first_name}?`
      );
      if (confirmation) {
        const dataToDisplay = rowsToDisplay.filter((data) => data.id !== id);
        setRowsToDisplay(dataToDisplay);
      }
    }
  };

  const showCopyIcon = (hoverData) => {
    setDisplayCopy(hoverData);
  };

  const sortTable = (sortObj) => {
    const { column, order } = sortObj;
    const sortedData =
      order === "asc"
        ? rowsToDisplay.sort((a, b) => (a[column] > b[column] ? 1 : -1))
        : order === "desc"
        ? rowsToDisplay.sort((a, b) => (a[column] < b[column] ? 1 : -1))
        : rowsToDisplay;
    setSort(sortObj);
    setRowsToDisplay(sortedData);
  };

  const handleSelectRow = (e) => {
    const { name, checked } = e.target;
    if (name === "selectAll") {
      let checkedData = rowsToDisplay.map((data) => {
        return { ...data, isChecked: checked };
      });
      setRowsToDisplay(checkedData);
      setIsAllChecked(!isAllChecked);
    } else {
      let checkedData = rowsToDisplay.map((data) =>
        data.id === Number(name) ? { ...data, isChecked: checked } : data
      );
      setRowsToDisplay(checkedData);
      if (checked === false) {
        setIsAllChecked(false);
      }
    }
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Header changeSearchValue={changeSearchValue} searchValue={searchValue} />
      <table>
        <TableHead
          columns={columns ? columns : []}
          handleSelectRow={handleSelectRow}
          isAllChecked={isAllChecked}
          sort={sort}
          sortTable={sortTable}
        />
        <TBody
          tableData={tableData ? tableData : []}
          columns={columns}
          handleSelectRow={handleSelectRow}
          showCopyIcon={showCopyIcon}
          displayCopy={displayCopy}
          copyText={copyText}
          handleDelete={handleDelete}
          rowsToDisplay={rowsToDisplay}
        />
        {/* <TableFooter columns={columns ? columns : []} /> */}
      </table>
      <Pagination
        currentPage={currentPage}
        rowPerPage={rowPerPage}
        tableRows={tableData.length}
        setCurrentPage={setCurrentPage}
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick}
        disabled={disabled}
      />
    </>
  );
};

export default CustomTable;
