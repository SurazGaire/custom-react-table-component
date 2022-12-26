import React from "react";
import "./CustomTable.scss";

const CustomTable = () => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone.No</th>
            <th>Age</th>
            <th>Date Of Birth</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" className="mr-5"></input>1
            </td>
            <td>Suraj</td>
            <td>Gaire</td>
            <td>Tansen,Palpa</td>
            <td>9860365404</td>
            <td>45</td>
            <td>2072/23/2</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CustomTable;
