import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaSearch,
  FaClipboardCheck,
} from "react-icons/fa";

function DailyAttandence() {
  const [student, Setstudent] = useState(() => {
    const savedStudents = localStorage.getItem("admissionStudents");

    if (!savedStudents) return [];

    try {
      const students = JSON.parse(savedStudents);

      return students.map((item) => ({
        id: item.id,
        rollNo: item.rollNo,
        registrationNo: item.registrationNo,
        name: item.studentName,
        class: item.class || item.admissionToClass || "",
        section: item.section || "",
        status: "Present",
        remarks: "",
      }));
    } catch (error) {
      console.error("Error loading students:", error);
      return [];
    }
  });

  const [searchTerm, setseatchTerm] = useState("");

  const [selectedClass, SetselctedClass] = useState("All");
  const [Section, setSection] = useState("");
  const [selectedDate, SetselctedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  // Automatically update list when a new student is added
  useEffect(() => {
    const loadStudents = () => {
      try {
        const savedStudents = JSON.parse(
          localStorage.getItem("admissionStudents") || "[]",
        );

        Setstudent((prevStudents) =>
          savedStudents.map((item) => {
            const existingStudent = prevStudents.find(
              (student) => student.id === item.id,
            );

            return {
              id: item.id,
              rollNo: item.rollNo,
              registrationNo: item.registrationNo,
              name: item.studentName,
              class: item.class || item.admissionToClass || "",
              section: item.section || "",
              status: existingStudent?.status || "Present",
              remarks: existingStudent?.remarks || "",
            };
          }),
        );
      } catch (error) {
        console.error("Error loading students:", error);
      }
    };

    window.addEventListener("admissionStudentsUpdated", loadStudents);

    return () => {
      window.removeEventListener("admissionStudentsUpdated", loadStudents);
    };
  }, []);

  // CHANGED: Get classes dynamically from students
  const availableClasses = [
    ...new Set(student.map((item) => item.class).filter(Boolean)),
  ];

  const filteredStudent = student.filter(
    (studentSearch) =>
      (studentSearch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        studentSearch.rollNo.toString().includes(searchTerm.toString())) &&
      (selectedClass === "All" || studentSearch.class === selectedClass) &&
      (Section === "" || studentSearch.section === Section),
  );

  const handleStatusChange = (id, newStatus) => {
    Setstudent((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student,
      ),
    );
  };

  const MarkAllPresent = (newStatus) => {
    Setstudent((prevStudents) =>
      prevStudents.map((student) => ({ ...student, status: newStatus })),
    );
  };

  const MarkAllAbsent = (newStatus) => {
    Setstudent((prevStudents) =>
      prevStudents.map((student) => ({ ...student, status: newStatus })),
    );
  };

  const totalCount = student.length;

  const presentCount = student.filter(
    (studentData) => studentData.status === "Present",
  ).length;

  const absentCount = student.filter(
    (studentData) => studentData.status === "Absent",
  ).length;

  const leaveCount = student.filter(
    (studentData) => studentData.status === "Leave",
  ).length;

  const handleSaveAttendance = () => {
    localStorage.setItem(
      "studentAttandence",
      JSON.stringify({
        date: selectedDate,
        students: student,
      }),
    );
  };

  // Existing attendance loading functionality
  useEffect(() => {
    const savedData = localStorage.getItem("studentAttandence");

    if (savedData) {
      const attendanceData = JSON.parse(savedData);
      Setstudent(attendanceData.students);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#eaf0f6] p-3 md:p-5">
      {/* Page Header */}
      <div className="mb-6 flex items-center gap-3">
        <FaUser className="text-3xl text-black" />
        <h1 className="text-2xl font-normal text-black md:text-3xl">
          Students Daily Attendance
        </h1>
      </div>

      {/* Filters Section */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-sm md:p-6">
        <h2 className="mb-5 text-xl font-semibold text-gray-700">
          Attendance Filters
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Date */}
          <div className="flex min-w-0 flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Select Date
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={selectedDate}
                onChange={(e) => SetselctedDate(e.target.value)}
                type="date"
                className="w-full rounded-md border border-gray-300 p-2.5 pl-10 outline-none focus:border-[#398FBC]"
              />
            </div>
          </div>

          {/* Class */}
          <div className="flex min-w-0 flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => SetselctedClass(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-2.5 outline-none focus:border-[#398FBC]"
            >
              <option value="All">All</option>

              {availableClasses.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          {/* Section */}
          <div className="flex min-w-0 flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Select Section
            </label>
            <select
              value={Section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-2.5 outline-none focus:border-[#398FBC]"
            >
              <option value="">-- Select Section --</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex min-w-0 flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Search Student
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                onChange={(e) => setseatchTerm(e.target.value)}
                type="text"
                placeholder="Search by name or roll no..."
                className="w-full rounded-md border border-gray-300 p-2.5 pl-10 outline-none focus:border-[#398FBC]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
        {/* Table Header */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FaClipboardCheck className="text-2xl text-[#398FBC]" />
            <h2 className="text-xl font-semibold text-gray-700">
              Attendance List
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => MarkAllPresent("Present")}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white"
            >
              Mark All Present
            </button>
            <button
              onClick={() => MarkAllAbsent("Absent")}
              className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white"
            >
              Mark All Absent
            </button>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
            <p className="text-sm text-gray-500">Total Students</p>
            <h3 className="mt-1 text-2xl font-semibold text-gray-800">
              {totalCount}
            </h3>
          </div>

          <div className="rounded-md border border-green-200 bg-green-50 p-3">
            <p className="text-sm text-green-700">Present</p>
            <h3 className="mt-1 text-2xl font-semibold text-green-700">
              {presentCount}
            </h3>
          </div>

          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-700">Absent</p>
            <h3 className="mt-1 text-2xl font-semibold text-red-700">
              {absentCount}
            </h3>
          </div>

          <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3">
            <p className="text-sm text-yellow-700">Leave</p>
            <h3 className="mt-1 text-2xl font-semibold text-yellow-700">
              {leaveCount}
            </h3>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-187.5 border-collapse text-left">
            <thead>
              <tr className="bg-[#398FBC] text-white">
                <th className="p-3 font-medium">#</th>
                <th className="p-3 font-medium">Roll No</th>
                <th className="p-3 font-medium">Registration No</th>
                <th className="p-3 font-medium">Student Name</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Class</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudent.map((data, index) => (
                <tr key={data.id}>
                  <td className="px-2 py-4 font-medium text-xl text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-2 py-4 font-medium text-xl text-gray-500">
                    {data.rollNo}
                  </td>
                  <td className="px-2 py-4 font-medium text-xl text-gray-500">
                    {data.registrationNo}
                  </td>
                  <td className="px-3 py-4 font-medium text-xl text-gray-500">
                    {data.name}
                  </td>
                  <td className="px-3 py-4 font-medium text-xl text-gray-500">
                    <select
                      value={data.status}
                      onChange={(e) =>
                        handleStatusChange(data.id, e.target.value)
                      }
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Leave">Leave</option>
                    </select>
                  </td>
                  <td className="px-3 py-4 font-medium text-xl text-gray-500">
                    {data.class}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save Attendance */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveAttendance}
            className="rounded-md bg-[#398FBC] px-6 py-2.5 font-medium text-white hover:bg-[#287da9]"
          >
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
}

export default DailyAttandence;
