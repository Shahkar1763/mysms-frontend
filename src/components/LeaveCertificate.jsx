import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaSearch,
  FaPlus,
  FaAddressCard,
  FaCertificate,
  FaCalendarAlt,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaEdit,
  FaTrash,
  FaUsers,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import CertificateModal from "./CertificateModal";
import CreateCertificate from "./CreateCertificate";

function LeaveCertificate() {
  const [certificate, setCertificate] = useState([]);
  const [searchStudent, setSearchStudent] = useState("");
  const [show, setShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [editCertificates, setEditCertificates] = useState(null);

  // Load certificates
  const loadCertificates = () => {
    try {
      const existingCertificates = JSON.parse(
        localStorage.getItem("schoolCertificates") || "[]",
      );

      setCertificate(
        Array.isArray(existingCertificates) ? existingCertificates : [],
      );
    } catch (error) {
      console.error("Certificate loading error:", error);
      setCertificate([]);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  // Search
  const filteredStudents = certificate.filter((student) => {
    const search = searchStudent.toLowerCase();

    return (
      String(student.studentName || "")
        .toLowerCase()
        .includes(search) ||
      String(student.regNo || "")
        .toLowerCase()
        .includes(search) ||
      String(student.slcNo || "")
        .toLowerCase()
        .includes(search)
    );
  });

  // Statistics
  const totalCertificates = certificate.length;

  const currentMonthCertificates = certificate.filter((student) => {
    if (!student.issueDate) return false;

    const issueDate = new Date(student.issueDate);

    if (Number.isNaN(issueDate.getTime())) return false;

    const today = new Date();

    return (
      issueDate.getMonth() === today.getMonth() &&
      issueDate.getFullYear() === today.getFullYear()
    );
  }).length;

  const searchResults = filteredStudents.length;

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / show);

  const indexOfLastStudent = currentPage * show;
  const indexOfFirstStudent = indexOfLastStudent - show;

  const displayedCertificates = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchStudent, show]);

  // View Certificate
  const handleView = (data) => {
    setSelectedCertificate(data);
    setShowModal(true);
  };

  // Edit Certificate
  const handleEdit = (data) => {
    setEditCertificates(data);
  };

  // Delete Certificate
  const handleDelete = (regNo) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this certificate?",
    );

    if (!confirmDelete) return;

    const updatedCertificates = certificate.filter(
      (student) => student.regNo !== regNo,
    );

    try {
      localStorage.setItem(
        "schoolCertificates",
        JSON.stringify(updatedCertificates),
      );

      setCertificate(updatedCertificates);

      alert("Certificate deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Unable to delete certificate.");
    }
  };

  // After edit
  const handleUpdate = () => {
    loadCertificates();
    setEditCertificates(null);
  };

  // Close view modal
  const closeViewModal = () => {
    setShowModal(false);
    setSelectedCertificate(null);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditCertificates(null);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-4 md:p-6 lg:p-8">
      {/* Heading */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FaCertificate size={23} />
            </div>

            <h1 className="text-2xl font-bold text-[#202b3c] md:text-3xl">
              School Leaving Certificate
            </h1>
          </div>

          <p className="ml-1 text-sm text-gray-500">
            Manage and view all school leaving certificates
          </p>
        </div>

        <Link
          to="/createCertificate"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#398eb6] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#28779e]"
        >
          <FaPlus />
          Create Certificate
        </Link>
      </div>

      {/* Statistics */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Certificates */}
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Certificates
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#202b3c]">
              {totalCertificates}
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              All issued certificates
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <FaAddressCard size={25} />
          </div>
        </div>

        {/* This Month */}
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm font-medium text-gray-500">This Month</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {currentMonthCertificates}
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Certificates issued this month
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-600">
            <FaCalendarAlt size={25} />
          </div>
        </div>

        {/* Search Results */}
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm font-medium text-gray-500">Search Results</p>

            <h2 className="mt-2 text-3xl font-bold text-purple-600">
              {searchResults}
            </h2>

            <p className="mt-1 text-xs text-gray-400">Matching certificates</p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <FaUsers size={25} />
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {/* Table Header */}
        <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#202b3c]">
              All Certificates
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredStudents.length} certificates found
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="grid grid-cols-1 gap-3 border-b border-gray-100 bg-[#fafbfe] p-5 md:grid-cols-2">
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search by student name, registration no, SLC no..."
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pr-4 pl-11 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
            <FaFilter />

            <span>Search certificates</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5 text-left text-sm">
            <thead className="bg-[#f5f7fb] text-xs font-bold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4 text-center">Action</th>
                <th className="px-5 py-4">Student Name</th>
                <th className="px-5 py-4">Registration No</th>
                <th className="px-5 py-4">SLC No</th>
                <th className="px-5 py-4">Issue Date</th>
                <th className="px-5 py-4">Leaving Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {displayedCertificates.length > 0 ? (
                displayedCertificates.map((data, index) => (
                  <tr
                    key={data.id || `${data.regNo}-${index}`}
                    className="transition hover:bg-blue-50/40"
                  >
                    <td className="px-5 py-4 font-medium text-gray-500">
                      {indexOfFirstStudent + index + 1}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
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
                          onClick={() => handleEdit(data)}
                          title="Edit Certificate"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(data.regNo)}
                          title="Delete Certificate"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>

                    {/* Student Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                          {(data.studentName || "?").charAt(0).toUpperCase()}
                        </div>

                        <span className="font-semibold text-[#263445]">
                          {data.studentName || "-"}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-semibold text-blue-600">
                      {data.regNo || "-"}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-md bg-purple-50 px-3 py-1.5 font-medium text-purple-700">
                        {data.slcNo || "-"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {data.issueDate || "-"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {data.leavingDate || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        <FaUserGraduate size={28} />
                      </div>

                      <h3 className="text-base font-bold text-gray-700">
                        No Certificates Found
                      </h3>

                      <p className="mt-1 text-sm text-gray-400">
                        Try changing your search or create a new certificate.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col justify-between gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>Show</span>

            <select
              value={show}
              onChange={(e) => setShow(Number(e.target.value))}
              className="rounded-md border border-gray-200 bg-white px-2 py-1.5 outline-none"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <span>entries</span>

            <span className="ml-2">
              Showing{" "}
              {filteredStudents.length === 0 ? 0 : indexOfFirstStudent + 1} to{" "}
              {Math.min(indexOfLastStudent, filteredStudents.length)} of{" "}
              {filteredStudents.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronLeft size={12} />
            </button>

            <span className="min-w-24 text-center text-sm font-semibold text-gray-600">
              Page {currentPage} of {Math.max(totalPages, 1)}
            </span>

            <button
              disabled={currentPage >= totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* View Certificate Modal */}
      {showModal && selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={closeViewModal}
        />
      )}

      {/* Edit Certificate Modal */}
      {editCertificates && (
        <CreateCertificate
          certificate={editCertificates}
          onUpdate={handleUpdate}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
}

export default LeaveCertificate;
