import React from "react";
import { FaCopy, FaTrashAlt } from "react-icons/fa";

const TableData = ({ data, columns }) => {
  return (
    <>
      <tr>
        {columns?.map((column, index) => (
          <td key={index}>
            <div className="d-flex justify-content-space-between">
              {column.field === "id" ? <input type="checkbox"></input> : null}
              <div>{data[column?.field]}</div>
              <div>
                {column.field === "delete" ? (
                  <FaTrashAlt />
                ) : column.field === "id" ? (
                  <FaCopy />
                ) : null}
              </div>
            </div>
          </td>
        ))}
      </tr>
    </>
  );
};

export default TableData;
