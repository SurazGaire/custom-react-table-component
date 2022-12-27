import React from "react";

const FooterColumn = ({ column }) => {
  return (
    <th>
      <div className="d-flex justify-content-space-between">
        <div>{column}</div>
      </div>
    </th>
  );
};

export default FooterColumn;
