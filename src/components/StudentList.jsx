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
  FaTimes,
  FaSave,
} from "react-icons/fa";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

// All Admission Form fields
const fieldGroups = [
  {
    title: "Personal Information",
    fields: [
      { name: "registrationNo", label: "Registration No" },
      { name: "admissionDate", label: "Admission Date", type: "date" },
      { name: "rollNo", label: "Class Roll No" },
      { name: "studentName", label: "Student Name" },
      { name: "dob", label: "Date of Birth", type: "date" },

      { name: "class", label: "Class" },
      {
        name: "section",
        label: "Section",
        type: "select",
        options: ["A", "B", "C"],
      },

      { name: "fatherName", label: "Father Name" },

      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["Male", "Female", "Other"],
      },

      { name: "admissionToClass", label: "Admission to Class" },
      {
        name: "bloodGroup",
        label: "Blood Group",
        type: "select",
        options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      },
      { name: "religion", label: "Religion" },
      { name: "previousSchool", label: "Previous School" },
      { name: "nationality", label: "Nationality" },

      { name: "cnicNo", label: "CNIC No" },
    ],
  },
  {
    title: "Contact Information",
    fields: [
      { name: "fatherContact", label: "Father Contact", type: "tel" },

      { name: "guardianName", label: "Guardian Name" },
      { name: "guardianContact", label: "Guardian Contact", type: "tel" },
      { name: "emergencyContact", label: "Emergency Contact", type: "tel" },
      { name: "email", label: "Email Address", type: "email" },
      { name: "city", label: "City" },
      { name: "postalCode", label: "Postal Code" },
      { name: "permanentAddress", label: "Permanent Address" },
      { name: "currentAddress", label: "Current Address" },
    ],
  },
  {
    title: "Fee Information",
    fields: [
      { name: "admissionFee", label: "Admission Fee", type: "number" },
      { name: "monthlyFee", label: "Monthly Fee", type: "number" },
      { name: "annualFee", label: "Annual Fee", type: "number" },
      { name: "securityFee", label: "Security Fee", type: "number" },
      { name: "discount", label: "Discount", type: "number" },
      { name: "totalFee", label: "Total Fee", type: "number" },
      { name: "paidFee", label: "Paid Fee", type: "number" },
      { name: "remainingFee", label: "Remaining Fee", type: "number" },
      { name: "transportFee", label: "Transport Fee", type: "number" },
      {
        name: "feeType",
        label: "Fee Type",
        type: "select",
        options: ["Monthly", "Quarterly", "Yearly"],
      },
      {
        name: "paymentStatus",
        label: "Payment Status",
        type: "select",
        options: ["Paid", "Unpaid", "Partial"],
      },
    ],
  },
];

function StudentList() {
  const Selector = useSelector((store) => store.StudentStore);

  const [admissionStudents, setAdmissionStudents] = useState([]);
  const [searchStudent, setSearchStudent] = useState("");
  const [Category, setCategory] = useState("All");
  const [Classes, setClasses] = useState("All");
  const [Show, setShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [actionType, setActionType] = useState("");
  const [editData, setEditData] = useState({});
  const [editPhoto, setEditPhoto] = useState(null);
  const [editDocuments, setEditDocuments] = useState([]);
  const [editLeftSchool, setEditLeftSchool] = useState(false);

  // Load students from localStorage
  useEffect(() => {
    const loadStudents = () => {
      try {
        const savedStudents = JSON.parse(
          localStorage.getItem("admissionStudents") || "[]",
        );

        setAdmissionStudents(Array.isArray(savedStudents) ? savedStudents : []);
      } catch (error) {
        console.error("Student loading error:", error);
        setAdmissionStudents([]);
      }
    };

    loadStudents();

    window.addEventListener("admissionStudentsUpdated", loadStudents);

    return () => {
      window.removeEventListener("admissionStudentsUpdated", loadStudents);
    };
  }, []);

  // Convert Admission Form students to table format
  const formattedAdmissionStudents = admissionStudents.map(
    (student, index) => ({
      ...student,
      source: "admission",
      S_No: `A-${index + 1}`,
      Reg_No: student.registrationNo || "",
      Student_Name: student.studentName || "",
      Father_Name: student.fatherName || "",
      Whatsapp_No: student.fatherContact || "",
      class: student.class || "",
      status: student.leftSchool ? "left" : "present",
      "Net fee": student.totalFee || 0,
      "Transport Fee": student.transportFee || 0,
    }),
  );

  // Existing Redux students
  const reduxStudents = Array.isArray(Selector)
    ? Selector.map((student) => ({
        ...student,
        source: "redux",
      }))
    : [];

  // Combine both sources
  const allStudents = [...reduxStudents, ...formattedAdmissionStudents];

  // Search and filters
  const filteredStudents = allStudents.filter((student) => {
    const search = searchStudent.toLowerCase();

    const matchesSearch =
      String(student.Student_Name || "")
        .toLowerCase()
        .includes(search) ||
      String(student.Reg_No || "")
        .toLowerCase()
        .includes(search) ||
      String(student.Father_Name || "")
        .toLowerCase()
        .includes(search) ||
      String(student.Whatsapp_No || "").includes(searchStudent);

    const matchesCategory = Category === "All" || student.status === Category;

    const matchesClass = Classes === "All" || student.class === Classes;

    return matchesSearch && matchesCategory && matchesClass;
  });

  // Statistics
  const totalStudents = allStudents.length;

  const presentStudents = allStudents.filter(
    (student) => student.status === "present",
  ).length;

  const leftStudents = allStudents.filter(
    (student) => student.status === "left",
  ).length;

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / Show);

  const indexOfLastStudent = currentPage * Show;
  const indexOfFirstStudent = indexOfLastStudent - Show;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchStudent, Category, Classes, Show]);

  // Open View modal
  const handleView = (student) => {
    setSelectedStudent(student);
    setActionType("view");
  };

  // Open Edit modal
  const handleEdit = (student) => {
    if (student.source !== "admission") {
      alert("Redux student editing is not connected yet.");
      return;
    }

    const originalStudent = admissionStudents.find(
      (item) => item.id === student.id,
    );

    if (!originalStudent) return;

    setSelectedStudent(student);
    setEditData({ ...originalStudent });
    setEditPhoto(originalStudent.photo || null);
    setEditDocuments(originalStudent.documents || []);
    setEditLeftSchool(Boolean(originalStudent.leftSchool));
    setActionType("edit");
  };

  // Edit input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Edit photo
  const handleEditPhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setEditPhoto(reader.result);
    };

    reader.onerror = () => {
      alert("Unable to read image.");
    };

    reader.readAsDataURL(file);
  };

  // Edit documents
  const handleDocumentChange = (document) => {
    setEditDocuments((prev) =>
      prev.includes(document)
        ? prev.filter((item) => item !== document)
        : [...prev, document],
    );
  };

  // Save edited student
  const handleUpdate = () => {
    if (
      !String(editData.studentName || "").trim() ||
      !String(editData.fatherName || "").trim()
    ) {
      alert("Student Name and Father Name are required.");
      return;
    }

    const updatedStudents = admissionStudents.map((student) =>
      student.id === selectedStudent.id
        ? {
            ...student,
            ...editData,
            photo: editPhoto,
            documents: editDocuments,
            leftSchool: editLeftSchool,
            status: editLeftSchool ? "left" : "present",
          }
        : student,
    );

    try {
      localStorage.setItem(
        "admissionStudents",
        JSON.stringify(updatedStudents),
      );

      setAdmissionStudents(updatedStudents);
      closeModal();

      window.dispatchEvent(new Event("admissionStudentsUpdated"));

      alert("Student updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Unable to update student. Browser storage may be full.");
    }
  };

  // Delete student
  const handleDelete = (student) => {
    if (student.source !== "admission") {
      alert("Redux student deletion is not connected yet.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${student.Student_Name}?`,
    );

    if (!confirmDelete) return;

    const updatedStudents = admissionStudents.filter(
      (item) => item.id !== student.id,
    );

    try {
      localStorage.setItem(
        "admissionStudents",
        JSON.stringify(updatedStudents),
      );

      setAdmissionStudents(updatedStudents);

      window.dispatchEvent(new Event("admissionStudentsUpdated"));

      alert("Student deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Unable to delete student.");
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedStudent(null);
    setActionType("");
    setEditData({});
    setEditPhoto(null);
    setEditDocuments([]);
    setEditLeftSchool(false);
  };

  // Export Excel
  const exportToExcel = () => {
    const excelData = filteredStudents.map((student, index) => ({
      S_No: index + 1,
      Reg_No: student.Reg_No,
      Student_Name: student.Student_Name,
      Father_Name: student.Father_Name,
      Whatsapp_No: student.Whatsapp_No,
      Class: student.class,
      Status: student.status,
      Net_Fee: student["Net fee"],
      Transport_Fee: student["Transport Fee"],
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "Students_List.xlsx");
  };

  // Export VCF
  const exportToVCF = () => {
    const escapeVCF = (value) =>
      String(value || "")
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/,/g, "\\,")
        .replace(/;/g, "\\;");

    const vcfData = filteredStudents
      .map((student) => {
        const name = escapeVCF(student.Student_Name);
        const father = escapeVCF(student.Father_Name);
        const phone = escapeVCF(student.Whatsapp_No);

        return `BEGIN:VCARD
VERSION:3.0
FN:${name}
N:${name};;;;
TEL;TYPE=CELL:${phone}
NOTE:Father Name: ${father}, Class: ${escapeVCF(student.class)}, Registration No: ${escapeVCF(student.Reg_No)}
END:VCARD`;
      })
      .join("\n");

    const blob = new Blob([vcfData], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Students_Contacts.vcf";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-4 md:p-6 lg:p-8">
      {/* Heading */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FaUserGraduate size={23} />
            </div>

            <h1 className="text-2xl font-bold text-[#202b3c] md:text-3xl">
              Students List
            </h1>
          </div>

          <p className="ml-1 text-sm text-gray-500">
            Manage and view all registered students
          </p>
        </div>

        <Link
          to="/admissionform"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#398eb6] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#28779e]"
        >
          <FaPlus />
          Add New Student
        </Link>
      </div>

      {/* Statistics */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Students</p>
            <h2 className="mt-2 text-3xl font-bold text-[#202b3c]">
              {totalStudents}
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              All registered students
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <FaUsers size={25} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm font-medium text-gray-500">Active Students</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {presentStudents}
            </h2>
            <p className="mt-1 text-xs text-gray-400">Currently enrolled</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-600">
            <FaUserCheck size={25} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm font-medium text-gray-500">Left Students</p>
            <h2 className="mt-2 text-3xl font-bold text-red-500">
              {leftStudents}
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              Students who left school
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 text-red-500">
            <FaUserTimes size={25} />
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#202b3c]">All Students</h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredStudents.length} students found
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-100"
            >
              <FaFileExcel />
              Export Excel
            </button>

            <button
              onClick={exportToVCF}
              className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              <FaAddressCard />
              Export VCF
            </button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="grid grid-cols-1 gap-3 border-b border-gray-100 bg-[#fafbfe] p-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative xl:col-span-2">
            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search by name, registration no, father name..."
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pr-4 pl-11 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="relative">
            <FaFilter className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />

            <select
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-9 py-3 text-sm text-gray-600 outline-none focus:border-blue-400"
            >
              <option value="All">All Status</option>
              <option value="present">Active</option>
              <option value="left">Left</option>
            </select>
          </div>

          <select
            value={Classes}
            onChange={(e) => setClasses(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-600 outline-none focus:border-blue-400"
          >
            <option value="All">All Classes</option>
            <option value="Nursery">Nursery</option>
            <option value="Prep">Prep</option>
            <option value="KG">KG</option>

            {Array.from({ length: 10 }, (_, index) => (
              <option key={index} value={`Class ${index + 1}`}>
                Class {index + 1}
              </option>
            ))}

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
                <th className="px-5 py-4">WhatsApp No</th>
                <th className="px-5 py-4">Class</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Net Fee</th>
                <th className="px-5 py-4">Transport Fee</th>
                <th className="px-5 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {currentStudents.length > 0 ? (
                currentStudents.map((student, index) => (
                  <tr
                    key={`${student.source}-${student.id || student.Reg_No || index}`}
                    className="transition hover:bg-blue-50/40"
                  >
                    <td className="px-5 py-4 font-medium text-gray-500">
                      {indexOfFirstStudent + index + 1}
                    </td>

                    <td className="px-5 py-4 font-semibold text-blue-600">
                      {student.Reg_No || "-"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 font-bold text-blue-600">
                          {student.photo ? (
                            <img
                              src={student.photo}
                              alt={student.Student_Name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            (student.Student_Name || "?")
                              .charAt(0)
                              .toUpperCase()
                          )}
                        </div>

                        <span className="font-semibold text-[#263445]">
                          {student.Student_Name || "-"}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {student.Father_Name || "-"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {student.Whatsapp_No || "-"}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-md bg-purple-50 px-3 py-1.5 font-medium text-purple-700">
                        {student.class || "-"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          student.status === "left"
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {student.status === "left" ? "Left" : "Active"}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-medium text-gray-700">
                      {student["Net fee"] || 0}
                    </td>

                    <td className="px-5 py-4 font-medium text-gray-700">
                      {student["Transport Fee"] || 0}
                    </td>

                    {/* Action buttons */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleView(student)}
                          title="View Student"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                        >
                          <FaEye />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEdit(student)}
                          disabled={student.source !== "admission"}
                          title={
                            student.source === "admission"
                              ? "Edit Student"
                              : "Redux editing not connected"
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(student)}
                          disabled={student.source !== "admission"}
                          title={
                            student.source === "admission"
                              ? "Delete Student"
                              : "Redux deletion not connected"
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        <FaUserGraduate size={28} />
                      </div>

                      <h3 className="text-base font-bold text-gray-700">
                        No Students Found
                      </h3>

                      <p className="mt-1 text-sm text-gray-400">
                        Try changing your search or filters.
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
              value={Show}
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

      {/* View / Edit Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-3 md:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {actionType === "view" ? "Student Details" : "Edit Student"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {actionType === "view"
                    ? "Complete student information"
                    : "Update student admission record"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-5">
              {/* Student Photo and Status */}
              <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl bg-[#f5f7fb] p-4">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
                  {(
                    actionType === "view" ? selectedStudent.photo : editPhoto
                  ) ? (
                    <img
                      src={
                        actionType === "view"
                          ? selectedStudent.photo
                          : editPhoto
                      }
                      alt="Student"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    (selectedStudent.Student_Name || "?")
                      .charAt(0)
                      .toUpperCase()
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">
                    {actionType === "view"
                      ? selectedStudent.Student_Name
                      : editData.studentName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Registration No:{" "}
                    {actionType === "view"
                      ? selectedStudent.Reg_No
                      : editData.registrationNo}
                  </p>

                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      (actionType === "view"
                        ? selectedStudent.status
                        : editLeftSchool
                          ? "left"
                          : "present") === "left"
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {(actionType === "view"
                      ? selectedStudent.status
                      : editLeftSchool
                        ? "left"
                        : "present") === "left"
                      ? "Left"
                      : "Active"}
                  </span>
                </div>

                {actionType === "edit" && (
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="cursor-pointer rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditPhoto}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setEditPhoto(null)}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                    >
                      Clear Photo
                    </button>
                  </div>
                )}
              </div>

              {/* All field groups */}
              {fieldGroups.map((group) => (
                <div key={group.title} className="mb-7">
                  <h3 className="mb-4 border-b border-gray-200 pb-2 text-base font-bold text-[#398eb6]">
                    {group.title}
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {group.fields.map((field) => {
                      const value =
                        actionType === "view"
                          ? (selectedStudent[field.name] ??
                            (field.name === "studentName"
                              ? selectedStudent.Student_Name
                              : field.name === "fatherName"
                                ? selectedStudent.Father_Name
                                : field.name === "registrationNo"
                                  ? selectedStudent.Reg_No
                                  : field.name === "fatherContact"
                                    ? selectedStudent.Whatsapp_No
                                    : field.name === "totalFee"
                                      ? selectedStudent["Net fee"]
                                      : field.name === "transportFee"
                                        ? selectedStudent["Transport Fee"]
                                        : ""))
                          : (editData[field.name] ?? "");

                      return (
                        <div key={field.name}>
                          <label className="mb-2 block text-sm font-semibold text-gray-600">
                            {field.label}
                          </label>

                          {field.type === "select" ? (
                            <select
                              name={field.name}
                              value={value}
                              disabled={actionType === "view"}
                              onChange={handleEditChange}
                              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400 disabled:bg-gray-50"
                            >
                              <option value="">Select {field.label}</option>
                              {field.options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type || "text"}
                              name={field.name}
                              value={value}
                              readOnly={actionType === "view"}
                              onChange={handleEditChange}
                              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 read-only:bg-gray-50"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Left School */}
              <div className="mb-6">
                <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={
                      actionType === "view"
                        ? Boolean(selectedStudent.leftSchool)
                        : editLeftSchool
                    }
                    disabled={actionType === "view"}
                    onChange={(e) => setEditLeftSchool(e.target.checked)}
                    className="h-5 w-5 accent-blue-600"
                  />
                  Left School
                </label>
              </div>

              {/* Documents */}
              <div className="mb-6">
                <h3 className="mb-3 border-b border-gray-200 pb-2 text-base font-bold text-[#398eb6]">
                  Documents Received
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    "Photographs",
                    "Form B/Birth Certificate",
                    "School Leaving Certificate",
                    "Father's NIC",
                  ].map((document) => {
                    const checked =
                      actionType === "view"
                        ? (selectedStudent.documents || []).includes(document)
                        : editDocuments.includes(document);

                    return (
                      <label
                        key={document}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={actionType === "view"}
                          onChange={() => handleDocumentChange(document)}
                          className="h-4 w-4 accent-blue-600"
                        />
                        {document}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Saved date */}
              {selectedStudent.savedAt && (
                <p className="text-xs text-gray-400">
                  Saved: {new Date(selectedStudent.savedAt).toLocaleString()}
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 p-5">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>

              {actionType === "edit" && (
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="flex items-center gap-2 rounded-lg bg-[#398eb6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#28779e]"
                >
                  <FaSave />
                  Update Student
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;
