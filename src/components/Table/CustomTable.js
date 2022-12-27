import React, { useEffect, useState } from "react";
import "./CustomTable.scss";
import { TableFooter, TableHead, TBody } from "../../sections/table";

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
  const [displayCopy, setDisplayCopy] = useState({ row: null, col: null });
  const [sort, setSort] = useState({ column: "", order: "" });
  const [isAllChecked, setIsAllChecked] = useState(false);
  useEffect(() => {
    setTableData(data);
    setColumns(columnData);
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const showCopyIcon = (hoverData) => {
    setDisplayCopy(hoverData);
  };

  const sortTable = (sortObj) => {
    const { column, order } = sortObj;
    console.log(sortObj.order);
    const sortedData =
      order === "asc"
        ? tableData.sort((a, b) => (a[column] > b[column] ? 1 : -1))
        : order === "desc"
        ? tableData.sort((a, b) => (a[column] < b[column] ? 1 : -1))
        : tableData;
    setSort(sortObj);
    setTableData(sortedData);
  };

  const handleSelectRow = (e) => {
    const { name, checked } = e.target;
    if (name === "selectAll") {
      let checkedData = tableData.map((data) => {
        return { ...data, isChecked: checked };
      });
      setTableData(checkedData);
      setIsAllChecked(!isAllChecked);
    } else {
      let checkedData = tableData.map((data) =>
        data.id === Number(name) ? { ...data, isChecked: checked } : data
      );
      setTableData(checkedData);
      if (checked === false) {
        setIsAllChecked(false);
      }
    }
  };

  return (
    <>
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
        />
        <TableFooter columns={columns ? columns : []} />
      </table>
    </>
  );
};

export default CustomTable;
