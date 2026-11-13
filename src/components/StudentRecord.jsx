import React from "react";
import { Link } from "react-router-dom";
import {
  HiDocumentText,
  HiUsers,
  HiAcademicCap,
  HiCalendar,
  HiReceiptTax,
  HiCash,
  HiTrendingUp,
  HiCurrencyDollar,
  HiClock,
  HiIdentification,
  HiChat,
  HiClipboardCheck,
} from "react-icons/hi";

function StudentRecord() {
  const dashboardItems = [
    {
      id: 1,
      title: "Admission Form",
      path: "/admissionform",
      icon: (
        <HiDocumentText className="w-30 h-20 mx-auto mt-5 text-amber-600" />
      ),
    },
    {
      id: 2,
      title: "Students List",
      path: "/StudentList",
      icon: <HiUsers className=" w-30 h-20 mx-auto mt-5 text-blue-600" />,
    },
    {
      id: 3,
      title: "School Leaving Certificate",
      path: "/slc",
      icon: (
        <HiAcademicCap className=" w-30 h-20 mx-auto mt-5 text-emerald-600 " />
      ),
    },
    {
      id: 4,
      title: "Daily Attendance",
      path: "/dailyAttandence",
      icon: <HiCalendar className="w-30 h-20 mx-auto mt-5 text-purple-600 " />,
    },
    {
      id: 5,
      title: "Generate Fee Bills",
      path: "/feeBill",
      icon: <HiReceiptTax className=" w-30 h-20 mx-auto mt-5 text-rose-600 " />,
    },
    //   {
    //     id: 6,
    //     title: "Fee Bill Receiving",
    //     icon: <HiCash className="w-20 h-20 mx-auto mt-5 text-indigo-600 " />,
    //   },
    //   {
    //     id: 7,
    //     title: "Change Class Fee",
    //     icon: <HiTrendingUp className="w-20 h-20 mx-auto mt-5 text-teal-600 " />,
    //   },
    //   {
    //     id: 8,
    //     title: "Add Arrears",
    //     icon: (
    //       <HiCurrencyDollar className=" w-20 h-20 mx-auto mt-5 text-orange-600 " />
    //     ),
    //   },
    //   {
    //     id: 9,
    //     title: "Generate Late Fee Fine",
    //     icon: (
    //       <HiCurrencyDollar className="w-20 h-20 mx-auto mt-5 text-red-600" />
    //     ),
    //   },
    //   {
    //     id: 10,
    //     title: "Print I.D Card",
    //     icon: <HiClock className="w-20 h-20 mx-auto mt-5 text-cyan-600" />,
    //   },
    //   {
    //     id: 11,
    //     title: "Inquiry",
    //     icon: (
    //       <HiIdentification className="w-20 h-20 mx-auto mt-5 text-yellow-600" />
    //     ),
    //   },
    //   {
    //     id: 12,
    //     title: "Transfer Letter",
    //     icon: <HiChat className="w-20 h-20 mx-auto mt-5 text-violet-600" />,
    //   },
    //   {
    //     id: 13,
    //     title: "Birth Certificate",
    //     icon: (
    //       <HiClipboardCheck className="w-20 h-20 mx-auto mt-5 text-pink-600" />
    //    ),
    //  },
  ];
  return (
    <>
      <div className="mt-8 mx-5 h-140 mb-8 border-3 b border-gray-500 ">
        <span class="absolute top-41 left-85 bg-[#2b82c9] text-white px-6 py-1 text-2xl rounded-3xl  shadow-sm">
          Student Records
        </span>
        <div className="flex items-center justify-center flex-wrap">
          {dashboardItems.map((items) => (
            <Link
              key={items.id}
              to={items.path}
              className="w-58 h-50 border border-gray-500 my-10 mx-10"
            >
              <div>{items.icon}</div>
              <h1 className="font-bold mx-12 my-2">{items.title}</h1>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default StudentRecord;
