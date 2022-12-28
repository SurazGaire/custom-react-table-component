import React from "react";
import TableData from "./TableData";

const Tbody = ({
  tableData,
  columns,
  handleSelectRow,
  showCopyIcon,
  displayCopy,
  copyText,
  handleDelete,
  rowsToDisplay,
}) => {
  return (
    <tbody>
      {rowsToDisplay?.map((data, index) => {
        return (
          <TableData
            key={index}
            data={data}
            columns={columns}
            handleSelectRow={handleSelectRow}
            showCopyIcon={showCopyIcon}
            displayCopy={displayCopy}
            copyText={copyText}
            handleDelete={handleDelete}
          />
        );
      })}
    </tbody>
  );
};

export default Tbody;
