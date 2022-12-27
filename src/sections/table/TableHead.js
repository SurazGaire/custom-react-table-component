import React from "react";
import Column from "./Column";

const TableHead = ({
  columns,
  handleSelectRow,
  isAllChecked,
  sort,
  sortTable,
}) => {
  return (
    <thead>
      <tr>
        {columns?.map((column, index) => {
          return (
            <Column
              key={index}
              column={column.header}
              columnKey={column.field}
              handleSelectRow={handleSelectRow}
              isAllChecked={isAllChecked}
              sort={sort}
              sortTable={sortTable}
            />
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
