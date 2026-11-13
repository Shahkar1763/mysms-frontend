import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { RiAccountCircle2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";

function Header({ toggle }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <header className="bg-[#398FBC] w-full h-20">
      <div className="flex justify-between items-center h-full px-6 ">
        <div className="flex gap-6 ">
          <CiMenuBurger
            className="text-2xl text-white font-bold"
            onClick={toggle}
          />
          <h1 className=" text-white font-bold ">SMS</h1>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <RiAccountCircle2Fill className="text-2xl font-bold" />
            <h2 className="font-bold text-black "> Demo Account</h2>
          </div>
          <div className="flex items-center gap-2">
            <AiOutlineLogout className="text-2xl text-white font-bold" />
            <h2 className=" text-white capitalize" onClick={handleLogout}>
              {" "}
              log out
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
