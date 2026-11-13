import React from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { FaBookOpen } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaBus } from "react-icons/fa6";
import { FaCoins } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaCut } from "react-icons/fa";
import { FaSms } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function Slidebar({ sidebarOpen }) {
  return (
    <>
      <div
        className={`min-h-screen ${
          sidebarOpen ? "w-72" : "w-32"
        } py-5 bg-[#202d32] text-white flex flex-col gap-4`}
      >
        {/* // <div className="min-h-screen w-72 py-5 bg-[#202d32] text-white flex flex-col gap-4"> */}
        <h1 className="bg-[#192328] text-[#52758A] text-sm uppercase p-4 ">
          main Navigation
        </h1>

        <ul className=" bg-[#243238] text-[#B8D5E5]">
          <li className=" px-6 py-3  flex items-center gap-2 hover:bg-[#192328] hover:text-white hover:cursor-pointer">
            {sidebarOpen === false ? (
              <AiOutlineDashboard className="mx-auto text-center text-3xl font-bold transition-all duration-300" />
            ) : (
              <AiOutlineDashboard />
            )}
            {/* <AiOutlineDashboard /> */}
            {sidebarOpen && <span> Dashboard</span>}
          </li>
          <li className="  px-6 py-3 bg-[#192328] text-white flex items-center gap-2">
            {" "}
            {sidebarOpen === false ? (
              <FaHome className="mx-auto text-center text-3xl font-bold transition-all duration-300" />
            ) : (
              <FaHome />
            )}
            {sidebarOpen && <span>Home</span>}
          </li>

          <li className=" px-6 py-3 flex items-center gap-2 hover:bg-[#192328] hover:text-white hover:cursor-pointer">
            {sidebarOpen === false ? (
              <IoPersonAddSharp className="mx-auto text-center text-3xl font-bold transition-all duration-300" />
            ) : (
              <IoPersonAddSharp />
            )}
            {sidebarOpen && <Link to="/">Student Records</Link>}

            {sidebarOpen && <FaAngleLeft className="ml-auto" />}
          </li>
          <li className=" px-6 py-3 flex items-center gap-2 hover:bg-[#192328] hover:text-white hover:cursor-pointer">
            {sidebarOpen === false ? (
              <TbReportSearch className="mx-auto text-center text-3xl font-bold transition-all duration-300" />
            ) : (
              <TbReportSearch />
            )}

            {sidebarOpen && <span>Student Reports</span>}

            {sidebarOpen && <FaAngleLeft className="ml-auto" />}
          </li>
          <li className=" px-6 py-3 flex items-center gap-2 hover:bg-[#192328] hover:text-white hover:cursor-pointer">
            {sidebarOpen === false ? (
              <TbReportSearch className="mx-auto text-center text-3xl font-bold transition-all duration-300" />
            ) : (
              <TbReportSearch />
            )}
            {sidebarOpen && <span>Student Fee</span>}

            {sidebarOpen && <FaAngleLeft className="ml-auto" />}
          </li>
          <li className=" px-6 py-3 flex items-center gap-2 hover:bg-[#192328] hover:text-white hover:cursor-pointer">
            {sidebarOpen === false ? (
              <FaBookOpen className="mx-auto text-center text-3xl font-bold transition-all duration-300" />
            ) : (
              <FaBookOpen />
            )}
            {sidebarOpen && <span>Examination</span>}
            {sidebarOpen && <FaAngleLeft className="ml-auto" />}
          </li>
          <li className=" px-6 py-3 flex items-center gap-2 hover:bg-[#192328] hover:text-white hover:cursor-pointer">
            {sidebarOpen === false ? (
              <IoIosPeople className="mx-auto text-center text-3xl font-bold transition-all duration-300" />
            ) : (
              <IoIosPeople />
            )}
            {sidebarOpen && <span>Staff Records</span>}
            {sidebarOpen && <FaAngleLeft className="ml-auto" />}
          </li>
          <li className=" px-6 py-3 flex items-center gap-2 hover:bg-[#192328] hover:text-white hover:cursor-pointer ">
            {sidebarOpen === false ? (
              <FaBus className="mx-auto text-center text-3xl font-bold transition-all duration-300" />
            ) : (
              <FaBus />
            )}
            {sidebarOpen && <span>Transport</span>}
            {sidebarOpen && <FaAngleLeft className="ml-auto" />}
          </li>
          <li className=" px-6  py-3 flex items-center gap-2 hover:bg-[#192328] hover:text-white hover:cursor-pointer ">
            {sidebarOpen === false ? (
              <FaCoins className="mx-auto text-center text-3xl font-bold transition-all duration-300" />
            ) : (
              <FaCoins />
            )}
            {sidebarOpen && <span> Finance</span>}

            {sidebarOpen && <FaAngleLeft className="ml-auto" />}
          </li>
        </ul>

        <h1 className="bg-[#192328] text-[#52758A] text-sm uppercase p-4 ">
          Account Settings
        </h1>

        <ul className=" bg-[#243238] text-[#B8D5E5] ">
          <li className=" px-6 py-3  flex items-center gap-2 hover:bg-[#192328] hover:text-white hover:cursor-pointer">
            {sidebarOpen === false ? (
              <IoIosSettings className="mx-auto text-center text-3xl font-bold transition-all duration-300" />
            ) : (
              <IoIosSettings />
            )}
            {sidebarOpen && <span> Settings</span>}

            {sidebarOpen && <FaAngleLeft className="ml-auto" />}
          </li>
          <li className="  px-6 py-3 flex items-center gap-2 hover:bg-[#192328] hover:text-white hover:cursor-pointer">
            {sidebarOpen === false ? (
              <FaCut className="mx-auto text-center text-3xl font-bold transition-all duration-300" />
            ) : (
              <FaCut />
            )}
            {sidebarOpen && <span>Utilities</span>}

            {sidebarOpen && <FaAngleLeft className="ml-auto" />}
          </li>

          <li className=" px-6 py-3 flex items-center gap-2 hover:bg-[#192328] hover:text-white hover:cursor-pointer">
            {sidebarOpen === false ? (
              <FaSms className="mx-auto text-center text-3xl font-bold transition-all duration-300" />
            ) : (
              <FaSms />
            )}
            {sidebarOpen && <span> Messaging</span>}

            {sidebarOpen && <FaAngleLeft className="ml-auto" />}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Slidebar;
