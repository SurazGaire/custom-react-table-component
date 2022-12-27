import React from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

const Column = ({
  column,
  handleSelectRow,
  isAllChecked,
  sort,
  columnKey,
  sortTable,
}) => {
  const isDescSort = sort?.column === columnKey && sort.order === "desc";
  const isAscSort = sort?.column === columnKey && sort.order === "asc";

  const sortingOrder = isDescSort ? "asc" : "desc";

  return (
    <th>
      <div className="d-flex justify-content-space-between">
        {columnKey === "id" ? (
          <input
            type="checkbox"
            onChange={handleSelectRow}
            name="selectAll"
            checked={isAllChecked}
          ></input>
        ) : null}
        <div>{column} </div>
        {isDescSort ? (
          <FaSortDown
            className="fasort"
            onClick={() => {
              sortTable({ column: columnKey, order: sortingOrder });
            }}
          />
        ) : isAscSort ? (
          <FaSortUp
            className="fasort"
            onClick={() => {
              sortTable({ column: columnKey, order: sortingOrder });
            }}
          />
        ) : (
          <FaSort
            className="faSort"
            onClick={() => {
              sortTable({ column: columnKey, order: sortingOrder });
            }}
          />
        )}
      </div>
    </th>
  );
};

export default Column;
