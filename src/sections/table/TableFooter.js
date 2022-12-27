import React from "react";
import FooterColumn from "./FooterColumn";

const TableFooter = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns?.map((column, index) => {
          return <FooterColumn key={index} column={column.header} />;
        })}
      </tr>
    </thead>
  );
};

export default TableFooter;
