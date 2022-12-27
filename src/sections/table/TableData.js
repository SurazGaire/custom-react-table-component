import React from "react";
import { FaCopy, FaTrashAlt } from "react-icons/fa";

const TableData = ({
  data,
  columns,
  handleSelectRow,
  showCopyIcon,
  displayCopy,
  copyText,
}) => {
  return (
    <>
      <tr>
        {columns?.map((column, index) => (
          <td
            key={index}
            onMouseOver={() => {
              showCopyIcon({ row: data.id, col: column.id });
            }}
            onMouseLeave={() => {
              showCopyIcon({ row: data.id, col: column.id });
            }}
          >
            <div className="d-flex justify-content-space-between">
              {column.field === "id" ? (
                <input
                  type="checkbox"
                  onChange={handleSelectRow}
                  name={data[column?.field]}
                  checked={data?.isChecked || false}
                ></input>
              ) : null}
              <div>{data[column?.field]}</div>
              <div>
                {column.field === "delete" ? (
                  <FaTrashAlt />
                ) : column.field !== "id" &&
                  displayCopy.row === data.id &&
                  displayCopy.col === column.id ? (
                  <div>
                    <FaCopy
                      onClick={() => {
                        copyText(data[column?.field]);
                      }}
                      className={
                        displayCopy.display === "none" ? "d-none" : "d-block"
                      }
                    />
                  </div>
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
