import React from "react";
import "./Button.scss";

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

export default PrimaryButton;
