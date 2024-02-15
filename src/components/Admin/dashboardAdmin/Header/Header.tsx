import React, { useState } from "react";

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAccountClick = () => {
    setShowPopup(!showPopup);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin')
    alert("Logged out successfully");
    window.location.reload(); // Merefresh halaman setelah logout
  };

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
        <i
          className="ri-account-circle-line text-2xl cursor-pointer"
          onClick={handleAccountClick}
        ></i>
        {showPopup && (
          <div className="absolute top-16 bg-white p-4 border rounded-lg shadow-lg">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
