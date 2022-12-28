import React from "react";

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

export default SecondaryButton;
