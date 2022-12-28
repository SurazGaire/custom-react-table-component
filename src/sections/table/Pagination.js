import React from "react";
import { PrimaryButton, SecondaryButton } from "../../components/Button";

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

export default Pagination;
