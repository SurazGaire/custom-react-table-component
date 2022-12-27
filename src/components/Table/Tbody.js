import React from "react";
import TableData from "./TableData";

const Tbody = ({ tableData, columns }) => {
  return (
    <tbody>
      {tableData?.map((data, index) => {
        return <TableData key={index} data={data} columns={columns} />;
      })}
    </tbody>
  );
};

export default Tbody;
