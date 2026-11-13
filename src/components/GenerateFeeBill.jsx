import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaSearch,
  FaPlus,
  FaFileExcel,
  FaAddressCard,
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { MdOutlineFeed } from "react-icons/md";

import { Link } from "react-router-dom";
import ViewFeeBillModal from "./ViewFeeBillModal";
import EditFeeBill from "./EditFeeBill";
import * as XLSX from "xlsx";

function GenerateFeeBill() {
  const [feeBills, setFeeBills] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const [classSearch, setclassSearch] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [editBill, setEditBill] = useState(null);

  useEffect(() => {
    const savedBills = localStorage.getItem("feeBills");
    const bills = JSON.parse(savedBills) || [];
    setFeeBills(bills);
  }, []);

  const filteredStudent = feeBills.filter(
    (student) =>
      (student.studentName.toLowerCase().includes(SearchTerm.toLowerCase()) ||
        student.registrationNo.toString().includes(SearchTerm.toString()) ||
        student.fatherName.toLowerCase().includes(SearchTerm.toLowerCase())) &&
      (classSearch === "All" || student.class === classSearch),
  );

  const handleView = (data) => {
    setSelectedBill(data);
    setShowModal(true);
  };
  const handleUpadte = (data) => {
    setShowModal(true);
    setEditBill(data);
  };

  const closeViewModal = () => {
    setSelectedBill(null);
    setShowModal(false);
  };
  const closeEditModal = () => {
    setEditBill(null);
    setShowModal(false);
  };

  const handleSaveUpdatedBill = (originalBill, updatedBill) => {
    const updatedList = feeBills.map((bill) =>
      bill === originalBill ? updatedBill : bill,
    );

    setFeeBills(updatedList);

    localStorage.setItem("feeBills", JSON.stringify(updatedList));

    closeEditModal();
  };
  const handleDelate = (data) => {
    const confirm = window.confirm(
      `Are you sure you want to delete Fee Bill ${data.billNo}?`,
    );
    if (!confirm) return;

    const updatedList = feeBills.filter((bills) => bills !== data);
    setFeeBills(updatedList);
    localStorage.setItem("feeBills", JSON.stringify(updatedList));
  };

  const handleExportExcel = () => {
    if (filteredStudent.length === 0) {
      alert("No fee bills available to export!");
      return;
    }

    const excelData = filteredStudent.map((data, index) => ({
      "S.No": index + 1,
      "Bill No": data.billNo,
      "Registration No": data.registrationNo,
      "Student Name": data.studentName,
      "Father Name": data.fatherName,
      Class: data.class,
      Section: data.section,
      "Bill Month": data.billMonth,
      "Issue Date": data.issueDate,
      "Due Date": data.dueDate,
      "Total Fee": data.totalFee,
      Discount: data.discount,
      "Net Payable": data.netPayable,
      "Paid Amount": data.paidAmount,
      "Remaining Balance": data.remainingBalance,
      "Payment Status": data.paymentStatus,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Fee Bills");

    XLSX.writeFile(workbook, "Fee_Bills.xlsx");
  };

  const [show, setShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = Math.ceil(filteredStudent.length / show);

  const indexOflastBill = currentPage * show;
  const indexOfFirstBill = indexOflastBill - show;
  const currentBills = filteredStudent.slice(indexOfFirstBill, indexOflastBill);
  return (
    <div className="min-h-screen bg-[#f5f7fb] p-4 md:p-6 lg:p-8">
      {/* Heading */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <MdOutlineFeed size={23} />
            </div>

            <h1 className="text-2xl font-bold text-[#202b3c] md:text-3xl">
              Fee Bill
            </h1>
          </div>

          <p className="ml-1 text-sm text-gray-500">
            Manage and view all Fee Bills
          </p>
        </div>

        <Link
          to="/feeBill/create"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#398eb6] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#28779e]"
        >
          <FaPlus />
          Create Fee Bill For Student
        </Link>
      </div>

      {/* All Students Section */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {/* Table Header */}
        <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#202b3c]">All Students</h2>
            <p className="mt-1 text-sm text-gray-500">Students found</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-100"
              onClick={handleExportExcel}
            >
              <FaFileExcel />
              Export Excel
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 gap-3 border-b border-gray-100 bg-[#fafbfe] p-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative xl:col-span-3">
            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={SearchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, registration no, father name..."
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pr-4 pl-11 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-600 outline-none focus:border-blue-400"
            value={classSearch}
            onChange={(e) => {
              setclassSearch(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Classes</option>
            <option value="Nursery">Nursery</option>
            <option value="Prep">Prep</option>
            <option value="KG">KG</option>
            <option value="1st"> class 1st</option>
            <option value="2nd"> class 2nd</option>
            <option value="3rd">class 3rd</option>
            <option value="4th">class 4th</option>
            <option value="5th">class 5th</option>
            <option value="6th">class 6th</option>
            <option value="7th">class 7th</option>
            <option value="8th">class 8th</option>
            <option value="9th">class 9th</option>
            <option value="10th">class 10th</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
          </select>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-275 text-left text-sm">
            <thead className="bg-[#f5f7fb] text-xs font-bold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Registration No</th>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Father Name</th>
                <th className="px-5 py-4">Total Fee</th>
                <th className="px-5 py-4">Class</th>
                <th className="px-5 py-4">Paid Amount</th>
                <th className="px-5 py-4"> Fee Type</th>
                <th className="px-5 py-4">Remaining Balance</th>
                <th className="px-5 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-md font-bold uppercase text-gray-500">
              {currentBills.map((data, index) => (
                <tr key={index}>
                  <td className="px-5 py-4 ">{indexOfFirstBill + index + 1}</td>
                  <td className="px-5 py-4"> {data.registrationNo}</td>
                  <td className="px-5 py-4 flex items-center gap-2">
                    {" "}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                      {(data.studentName || "?").charAt(0).toUpperCase()}
                    </div>
                    {data.studentName}{" "}
                  </td>
                  <td className="px-5 py-4"> {data.fatherName}</td>
                  <td className="px-5 py-4"> {data.totalFee}</td>
                  <td className="px-5 py-4"> {data.class}</td>
                  <td className="px-5 py-4"> {data.paidAmount}</td>
                  <td className="px-5 py-4">
                    {" "}
                    {data.feeDetails?.[0]?.feeType || "N/A"}
                  </td>
                  <td className="px-5 py-4"> {data.remainingBalance}</td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleView(data)}
                        title="View Certificate"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                      >
                        <FaEye />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleUpadte(data)}
                        title="Edit Certificate"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100"
                      >
                        <FaEdit />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelate(data)}
                        title="Delete Certificate"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col justify-between gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>Show</span>

            <select
              className="rounded-md border border-gray-200 bg-white px-2 py-1.5 outline-none"
              value={show}
              onChange={(e) => setShow(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <span>entries</span>
            <span className="ml-2">
              Showing {filteredStudent.length === 0 ? 0 : indexOfFirstBill + 1}{" "}
              to {Math.min(indexOflastBill, filteredStudent.length)} of{" "}
              {filteredStudent.length} entries
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              value={currentPage}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronLeft size={12} />
            </button>

            <span className="min-w-24 text-center text-sm font-semibold text-gray-600">
              Page {currentPage} of {totalPage}
            </span>

            <button
              value={currentPage}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage <= 1 || totalPage === 0}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* View feeBills Modal */}
      {showModal && selectedBill && (
        <ViewFeeBillModal
          selectedBill={selectedBill}
          onClose={closeViewModal}
        />
      )}

      {editBill && showModal && (
        <EditFeeBill
          updatedBills={editBill}
          onClose={closeEditModal}
          onUpdate={handleSaveUpdatedBill}
        />
      )}
    </div>
  );
}

export default GenerateFeeBill;
