import React from "react";
import { FaSort } from "react-icons/fa";

const Column = ({ column }) => {
  return (
    <th>
      <div className="d-flex justify-content-space-between">
        <div>{column}</div>
        <div>
          <FaSort className="fasort" />
        </div>
      </div>
    </th>
  );
};

export default Column;
