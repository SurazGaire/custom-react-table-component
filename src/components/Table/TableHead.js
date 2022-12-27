import React from "react";
import Column from "./Column";

const TableHead = ({ columns }) => {
  console.log(columns);
  return (
    <thead>
      <tr>
        {columns?.map((column, index) => {
          return <Column key={index} column={column.header} />;
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
