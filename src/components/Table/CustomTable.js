import React, { useEffect, useMemo, useState } from "react";
import {
  FaSort,
  FaSortDown,
  FaSortUp,
  FaCopy,
  FaTrashAlt,
  FaSearch,
} from "react-icons/fa";
import "./CustomTable.scss";
import { data, columnData } from "../../data";

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

const Header = ({ changeSearchValue, searchValue }) => {
  return (
    <>
      <div className="table-top d-flex justify-content-space-between">
        <div className="table-title">Users</div>
        <div>
          <FaSearch className="fasearch" />
          <input
            type="text"
            name="search"
            onChange={changeSearchValue}
            value={searchValue}
            placeholder="Search"
          ></input>
        </div>
      </div>
    </>
  );
};

const FooterColumn = ({ column }) => {
  return (
    <th>
      <div className="d-flex justify-content-space-between">
        <div>{column}</div>
      </div>
    </th>
  );
};

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
        <div>{column}</div>
        {columnKey !== "delete" ? (
          <div className="d-flex justify-content-center">
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
        ) : null}
      </div>
    </th>
  );
};

const TableData = ({
  data,
  columns,
  handleSelectRow,
  showCopyIcon,
  displayCopy,
  copyText,
  handleDelete,
  isClicked,
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
            onMouseOut={() => {
              showCopyIcon({ row: null, col: null });
            }}
          >
            {column.field !== "delete" ? (
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
                    <FaTrashAlt onClick={() => handleDelete(data.id)} />
                  ) : column.field !== "id" &&
                    displayCopy.row === data.id &&
                    displayCopy.col === column.id ? (
                    <div>
                      <FaCopy
                        onClick={() => {
                          copyText(data[column?.field], {
                            row: data.id,
                            col: column.id,
                          });
                        }}
                        className={
                          displayCopy.display === "none"
                            ? "d-none"
                            : "d-block facopy"
                        }
                        id={
                          isClicked === true &&
                          displayCopy.row === data.id &&
                          displayCopy.col === column.id
                            ? "opacity-light"
                            : null
                        }
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
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
                    <FaTrashAlt onClick={() => handleDelete(data.id)} />
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
                        id={isClicked === true ? "opacity-light" : null}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </td>
        ))}
      </tr>
    </>
  );
};

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

const TBody = ({
  columns,
  handleSelectRow,
  showCopyIcon,
  displayCopy,
  copyText,
  handleDelete,
  rowsToDisplay,
  isClicked,
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
            isClicked={isClicked}
          />
        );
      })}
    </tbody>
  );
};

const PrimaryButton = ({ label, handleClick, disabled }) => {
  return (
    <div>
      <button
        onClick={handleClick}
        className="primary-button"
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};
const SecondaryButton = ({ page, setCurrentPage, currentPage }) => {
  return (
    <div>
      <button
        className={
          currentPage === page ? "secondary-button active" : "secondary-button"
        }
        onClick={() => {
          setCurrentPage(page);
        }}
      >
        {page}
      </button>
    </div>
  );
};

const Pagination = ({
  rowPerPage,
  tableRows,
  setCurrentPage,
  currentPage,
  handlePrevClick,
  handleNextClick,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(tableRows / rowPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <div className="pagination d-flex justify-content-flex-end">
        <PrimaryButton
          label="Previous"
          handleClick={handlePrevClick}
          disabled={currentPage <= 1}
        />

        {pages.map((page, index) => (
          <SecondaryButton
            key={index}
            page={page}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        ))}
        <PrimaryButton
          label="Next"
          handleClick={handleNextClick}
          disabled={currentPage >= Math.ceil(tableRows / rowPerPage)}
        />
      </div>
    </>
  );
};

const CustomTable = () => {
  const [tableData, setTableData] = useState(data);
  const [columns, setColumns] = useState([]);
  const [displayCopy, setDisplayCopy] = useState({
    row: null,
    col: null,
  });
  const [sort, setSort] = useState({ column: "", order: "" });
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, seTRowPerPage] = useState(8);
  const [disabled, setDisabled] = useState(false);
  const [rowsToDisplay, setRowsToDisplay] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isFooterNeeded, setIsFooterNeeded] = useState(false);

  const changeSearchValue = (e) => {
    const searchChar = e.target.value;
    setSearchValue(e.target.value);
    const filteredData = tableData.filter((data) => {
      for (let key in data) {
        if (
          key !== "id" &&
          data[key].toLowerCase().includes(searchChar.toLowerCase())
        ) {
          return true;
        }
      }
    });
    filteredData.length > rowPerPage
      ? setIsFooterNeeded(true)
      : setIsFooterNeeded(false);

    if (searchChar === "") {
      setTableData(getSlicedData());
      setIsFooterNeeded(false);
    } else {
      setTableData(filteredData);
    }
  };

  useEffect(() => {
    setTableData(data);
    setColumns(columnData);
  }, []);

  const getSlicedData = () => {
    console.log(tableData);
    const lastPostIndex = currentPage * rowPerPage;
    const firstPostIndex = lastPostIndex - rowPerPage;
    let slicedData = tableData.slice(firstPostIndex, lastPostIndex);
    console.log(slicedData, "sliced");
    return slicedData;
  };
  console.log("out use");

  useEffect(() => {
    console.log("in use");
    setRowsToDisplay(getSlicedData());
  }, [currentPage, tableData]);

  const copyText = (text, hoverData) => {
    setDisplayCopy(hoverData);
    navigator.clipboard.writeText(text);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const handleDelete = (id) => {
    const rowToDelete = rowsToDisplay.filter((data) => data.id === id);
    if (rowToDelete.length !== 0) {
      let confirmation = window.confirm(
        `Do you really want to delete ${rowToDelete[0].first_name}?`
      );
      if (confirmation) {
        const orginalData = tableData.filter((data) => data.id !== id);
        setTableData(orginalData);
      }
    }
  };

  const showCopyIcon = (hoverData) => {
    setDisplayCopy(hoverData);
  };

  const sortTable = (sortObj) => {
    const { column, order } = sortObj;
    const sortedData =
      order === "asc"
        ? [...tableData]?.sort((a, b) => (a[column] > b[column] ? 1 : -1))
        : order === "desc"
        ? [...tableData]?.sort((a, b) => (a[column] < b[column] ? 1 : -1))
        : rowsToDisplay;
    console.log(sortedData);
    setSort(sortObj);
    setTableData(sortedData);
  };

  const handleSelectRow = (e) => {
    const { name, checked } = e.target;
    if (name === "selectAll") {
      let checkedData = tableData.map((data) => {
        return { ...data, isChecked: checked };
      });
      setTableData(checkedData);
      setIsAllChecked(!isAllChecked);
    } else {
      let checkedData = tableData.map((data) =>
        data.id === Number(name) ? { ...data, isChecked: checked } : data
      );
      setTableData(checkedData);
      if (checked === false) {
        setIsAllChecked(false);
      }
    }
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Header changeSearchValue={changeSearchValue} searchValue={searchValue} />
      <table>
        <TableHead
          columns={columns ? columns : []}
          handleSelectRow={handleSelectRow}
          isAllChecked={isAllChecked}
          sort={sort}
          sortTable={sortTable}
        />
        <TBody
          columns={columns}
          handleSelectRow={handleSelectRow}
          showCopyIcon={showCopyIcon}
          displayCopy={displayCopy}
          copyText={copyText}
          handleDelete={handleDelete}
          rowsToDisplay={rowsToDisplay}
          isClicked={isClicked}
        />
        {isFooterNeeded === true ? (
          <TableFooter columns={columns ? columns : []} />
        ) : null}
      </table>
      {isFooterNeeded === false ? (
        <Pagination
          currentPage={currentPage}
          rowPerPage={rowPerPage}
          tableRows={tableData.length}
          setCurrentPage={setCurrentPage}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
          disabled={disabled}
        />
      ) : null}
    </>
  );
};

export default CustomTable;
