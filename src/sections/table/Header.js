import React from "react";
import { FaSearch } from "react-icons/fa";

const Header = ({ changeSearchValue, searchValue }) => {
  return (
    <>
      <div className="table-top d-flex justify-content-space-between">
        <div>List of data</div>
        <div>
          <FaSearch className="fasearch" />
          <input type="text" name="search" onChange={changeSearchValue}></input>
        </div>
      </div>
    </>
  );
};

export default Header;
