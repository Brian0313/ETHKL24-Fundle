// src/components/WorldcoinButton.jsx

import React from "react";

const WorldcoinButton = ({ onClick, isVerified }) => {
  return (
    !isVerified ? (
      <button
        onClick={onClick}
        className="bg-[#1dc071] text-white font-epilogue font-semibold text-[16px] leading-[26px] min-h-[52px] px-4 rounded-[10px]"
      >
        Verify with World ID
      </button>
    ) : null // Return null if already verified
  );
};

export default WorldcoinButton;
