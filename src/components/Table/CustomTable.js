import React, { useEffect, useState } from "react";
import "./CustomTable.scss";
import TableHead from "./TableHead";
import { COLUMNS } from "../../config";
import Tbody from "./Tbody";
import { data } from "../../data";

const CustomTable = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(data);
  });
  const columns = [
    { field: "id", header: "ID" },
    { field: "first_name", header: "First Name", sort: true },
    { field: "last_name", header: "Last Name" },
    { field: "email", header: "Email" },
    { field: "gender", header: "Gender" },
    { field: "address", header: "Address" },
    { field: "phone", header: "Phone No" },
    { field: "age", header: "Age" },
    { field: "date_of_birth", header: "DOB" },
    { field: "delete", header: "" },
  ];
  return (
    <>
      <table>
        <TableHead columns={columns} />
        <Tbody tableData={tableData ? tableData : []} columns={columns} />
      </table>
    </>
  );
};

export default CustomTable;
