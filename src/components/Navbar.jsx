import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import avatar from '../images/avatar.png';
function Navbar() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return (
    <div className="flex sticky top-0  z-10 justify-between mt-2 bg-white border-b-2 ">
      <div className="sm:ml-10 ml-2">
        <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
          <h1 className=" sm:text-2xl text-base font-medium sm:mt-1 mt-2 cursor-pointer">
            Post Scheduler
          </h1>
        </Link>
      </div>
      <div className="flex items-center mr-4 ">
        <p>{userInfo.username}</p>
        <Link to="/profile">
          <img
            src={avatar}
            alt="profile_pic"
            className="rounded-full cursor-pointer w-12 h-12  mb-1 ml-2"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
