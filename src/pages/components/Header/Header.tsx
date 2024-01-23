import React from "react";
const Header = () => {
  return (
    <>
      <div className="ps-64 flex justify-end p-5 gap-4 bg-white drop-shadow-md">
        <input
          className="border ps-2"
          type="text"
          name=""
          id=""
          placeholder="Search"  
        />
        <i className="ri-account-circle-line text-2xl"></i>
      </div>
    </>
  );
};

export default Header;
