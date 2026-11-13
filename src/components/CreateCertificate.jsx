import React, { useState, useEffect } from "react";
import { FaUser, FaSearch } from "react-icons/fa";

function CreateCertificate({ certificate, onUpdate, onClose }) {
  const [formData, setFormData] = useState({
    regNo: "2147483648",
    slcNo: "",
    issueDate: "",
    admissionDate: "",
    leavingDate: "",
    studentName: "",
    fatherName: "",
    dob: "",
    admissionClass: "",
    leavingClass: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = "Student Name is required";
    }

    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Father Name is required";
    }
    if (!formData.slcNo.trim()) {
      newErrors.slcNo = "SLC No is required";
    }

    if (!formData.issueDate) {
      newErrors.issueDate = "Issue Date is required";
    }

    if (!formData.leavingDate) {
      newErrors.leavingDate = "Leaving Date is required";
    }

    if (!formData.regNo.trim()) {
      newErrors.regNo = "Registration No is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSave = () => {
    if (!validateForm()) {
      return;
    }
    const existingCertificates =
      JSON.parse(localStorage.getItem("schoolCertificates")) || [];

    let updatedCertificates;

    if (certificate) {
      // Edit existing certificate
      const certificateIndex = existingCertificates.findIndex(
        (item) => item.regNo === certificate.regNo,
      );

      if (certificateIndex !== -1) {
        updatedCertificates = [...existingCertificates];
        updatedCertificates[certificateIndex] = formData;
      } else {
        alert("Certificate not found!");
        return;
      }
    } else {
      // Create new certificate
      updatedCertificates = [...existingCertificates, formData];
    }

    // Save updated array
    localStorage.setItem(
      "schoolCertificates",
      JSON.stringify(updatedCertificates),
    );

    alert(
      certificate
        ? "Certificate Updated Successfully!"
        : "Certificate Saved Successfully!",
    );

    onUpdate();
  };

  useEffect(() => {
    if (certificate) {
      setFormData(certificate);
    }
  }, [certificate]);

  const searchButton = (
    <button
      type="button"
      className="flex h-13.75 w-16 shrink-0 items-center justify-center rounded-r-md bg-[#398eb6] text-white hover:bg-[#28779e]"
    >
      <FaSearch size={23} />
    </button>
  );

  return (
    <>
      <div className="min-h-screen bg-[#eaf0f6] p-3 md:p-5.5">
        <div className="mb-6 flex items-center gap-2">
          <FaUser className="text-[38px] text-black" />
          <h1 className="text-[35px] font-normal text-black">
            School Leaving Certificate
          </h1>
        </div>

        {/* Section 1: Registration, SLC, Issue Date */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_0.75fr_1fr]">
          {/* Registration No */}
          <div className="flex items-start gap-3">
            <label className="w-[32%] shrink-0 pt-3 text-[18px] font-bold">
              Registration No
            </label>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex min-w-0">
                <input
                  defaultValue="PKR-"
                  className="h-13.75 w-28.75 shrink-0 rounded-l-lg border border-[#d0d7df] bg-[#eeeeee] px-5 text-lg"
                />

                <input
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleChange}
                  className={`h-13.75 w-full min-w-0 border bg-[#eeeeee] px-5 text-lg outline-none ${
                    errors.regNo ? "border-red-500" : "border-[#d0d7df]"
                  }`}
                />

                {searchButton}
              </div>

              {errors.regNo && (
                <p className="mt-1 text-sm text-red-500">{errors.regNo}</p>
              )}
            </div>
          </div>

          {/* SLC No */}
          <div className="flex items-start gap-3">
            <label className="w-[32%] shrink-0 pt-3 text-[18px] font-bold">
              SLC No.
            </label>

            <div className="flex min-w-0 flex-1 flex-col">
              <input
                type="text"
                name="slcNo"
                value={formData.slcNo}
                onChange={handleChange}
                className={`h-13.75 w-full min-w-0 rounded-md border bg-[#eeeeee] px-5 text-lg outline-none ${
                  errors.slcNo ? "border-red-500" : "border-[#d0d7df]"
                }`}
              />

              {errors.slcNo && (
                <p className="mt-1 text-sm text-red-500">{errors.slcNo}</p>
              )}
            </div>
            
          </div>

          {/* Issue Date */}
          <div className="flex items-start gap-3">
            <label className="shrink-0 pt-3 text-[18px] font-bold">
              Issue Date
            </label>

            <div className="flex min-w-0 flex-1 flex-col">
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className={`h-13.75 w-full min-w-0 rounded-md border bg-white px-3 text-lg outline-none ${
                  errors.issueDate ? "border-red-500" : "border-[#d0d7df]"
                }`}
              />

              {errors.issueDate && (
                <p className="mt-1 text-sm text-red-500">{errors.issueDate}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Dates */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          {/* Date of Admission */}
          <div className="flex items-start gap-3">
            <label className="w-[24.5%] shrink-0 pt-3 text-[18px] font-bold">
              Date of Admission
            </label>

            <div className="flex min-w-0 flex-1 flex-col">
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                className="h-13.75 w-full rounded-md border border-[#d0d7df] bg-white px-3 text-lg outline-none"
              />
            </div>
          </div>

          {/* Date of Leaving */}
          <div className="flex items-start gap-3">
            <label className="w-40 shrink-0 pt-3 text-[18px] font-bold">
              Date of Leaving
            </label>

            <div className="flex min-w-0 flex-1 flex-col">
              <input
                type="date"
                name="leavingDate"
                value={formData.leavingDate}
                onChange={handleChange}
                className={`h-13.75 w-full min-w-0 rounded-md border bg-white px-3 text-lg outline-none ${
                  errors.leavingDate ? "border-red-500" : "border-[#d0d7df]"
                }`}
              />

              {errors.leavingDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.leavingDate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Student & Father Names */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          {/* Student Name */}
          <div className="flex items-start gap-3">
            <label className="w-[25%] shrink-0 pt-3 text-[18px] font-bold">
              Name
            </label>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex min-w-0">
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className={`h-13.75 w-full min-w-0 rounded-l-md border bg-[#eeeeee] px-5 text-lg outline-none ${
                    errors.studentName ? "border-red-500" : "border-[#d0d7df]"
                  }`}
                />
                {searchButton}
              </div>
              {errors.studentName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.studentName}
                </p>
              )}
            </div>
          </div>

          {/* Father Name */}
          <div className="flex items-start gap-3">
            <label className="w-40 shrink-0 pt-3 text-[18px] font-bold">
              Father Name
            </label>
            <div className="flex min-w-0 flex-1 flex-col">
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className={`h-13.75 w-full rounded-md border bg-[#eeeeee] px-3 text-lg outline-none ${
                  errors.fatherName ? "border-red-500" : "border-[#d0d7df]"
                }`}
              />
              {errors.fatherName && (
                <p className="mt-1 text-sm text-red-500">{errors.fatherName}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_0.75fr_1fr] mt-5">
          {/* Date of Birth */}
          <div className="flex items-start gap-3">
            <label className="w-[32%] shrink-0 pt-3 text-[18px] font-bold">
              Date of Birth
            </label>

            <div className="flex min-w-0 flex-1 flex-col">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`h-13.75 w-full rounded-md border bg-white px-3 text-lg outline-none ${
                  errors.dob ? "border-red-500" : "border-[#d0d7df]"
                }`}
              />

              {errors.dob && (
                <p className="mt-1 text-sm text-red-500">{errors.dob}</p>
              )}
            </div>
          </div>

          {/* Admission Class */}
          <div className="flex items-start gap-3">
            <label className="w-[32%] shrink-0 pt-3 text-[18px] font-bold">
              Admission Class
            </label>

            <div className="flex min-w-0 flex-1 flex-col">
              <input
                type="text"
                name="admissionClass"
                value={formData.admissionClass}
                onChange={handleChange}
                className="h-13.75 w-full min-w-0 rounded-md border border-[#d0d7df] bg-[#eeeeee] px-5 text-lg outline-none"
              />
            </div>
          </div>

          {/* Leaving Class */}
          <div className="flex items-start gap-3">
            <label className="shrink-0 pt-3 text-[18px] font-bold">
              Leaving Class
            </label>

            <div className="flex min-w-0 flex-1 flex-col">
              <input
                type="text"
                name="leavingClass"
                value={formData.leavingClass}
                onChange={handleChange}
                className="h-13.75 w-full min-w-0 rounded-md border border-[#d0d7df] bg-[#eeeeee] px-3 text-lg outline-none"
              />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center my-5">Reason to Leave</h1>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="h-100 min-w-0 w-full border border-[#d0d7df] bg-white px-3 text-lg outline-none rounded-md"
        />

        <div className="flex gap-4 mt-10">
          <button
            onClick={handleOnSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-30 text-2xl"
          >
            {certificate ? "Update" : "Save"}
          </button>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-30 text-2xl"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateCertificate;

// import React, { useEffect, useState } from "react";
// import {
//   FaCertificate,
//   FaUser,
//   FaCalendarAlt,
//   FaIdCard,
//   FaSave,
//   FaTimes,
//   FaSearch,
//   FaBook,
//   FaFileAlt,
// } from "react-icons/fa";

// const initialFormData = {
//   regNo: "",
//   slcNo: "",
//   issueDate: "",
//   admissionDate: "",
//   leavingDate: "",
//   studentName: "",
//   fatherName: "",
//   dob: "",
//   admissionClass: "",
//   leavingClass: "",
//   reason: "",
// };

// function CreateCertificate({ certificate, onUpdate, onClose }) {
//   const [formData, setFormData] = useState(initialFormData);
//   const [errors, setErrors] = useState({});
//   const [saving, setSaving] = useState(false);

//   const isEditing = Boolean(certificate);

//   // Load existing certificate when editing
//   useEffect(() => {
//     if (certificate) {
//       setFormData({
//         ...initialFormData,
//         ...certificate,
//       });
//     } else {
//       setFormData({
//         ...initialFormData,
//         regNo: "",
//       });
//     }

//     setErrors({});
//   }, [certificate]);

//   // Input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear field error when user starts typing
//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   // Form validation
//   const validateForm = () => {
//     const newErrors = {};

//     if (!String(formData.regNo || "").trim()) {
//       newErrors.regNo = "Registration No is required";
//     }

//     if (!String(formData.slcNo || "").trim()) {
//       newErrors.slcNo = "SLC No is required";
//     }

//     if (!formData.issueDate) {
//       newErrors.issueDate = "Issue Date is required";
//     }

//     if (!String(formData.studentName || "").trim()) {
//       newErrors.studentName = "Student Name is required";
//     }

//     if (!String(formData.fatherName || "").trim()) {
//       newErrors.fatherName = "Father Name is required";
//     }

//     if (!formData.leavingDate) {
//       newErrors.leavingDate = "Leaving Date is required";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // Save / Update certificate
//   const handleOnSave = () => {
//     if (!validateForm()) return;

//     setSaving(true);

//     try {
//       const existingCertificates = JSON.parse(
//         localStorage.getItem("schoolCertificates") || "[]",
//       );

//       if (!Array.isArray(existingCertificates)) {
//         throw new Error("Invalid certificate data");
//       }

//       let updatedCertificates;

//       if (isEditing) {
//         // Find existing certificate using its original values
//         const certificateIndex = existingCertificates.findIndex(
//           (item) =>
//             item.regNo === certificate.regNo &&
//             item.slcNo === certificate.slcNo,
//         );

//         if (certificateIndex === -1) {
//           alert("Certificate not found!");
//           return;
//         }

//         // Preserve existing unique ID and update its data
//         updatedCertificates = [...existingCertificates];

//         updatedCertificates[certificateIndex] = {
//           ...existingCertificates[certificateIndex],
//           ...formData,
//         };
//       } else {
//         // Prevent duplicate Registration No + SLC No
//         const duplicate = existingCertificates.some(
//           (item) =>
//             item.regNo === formData.regNo && item.slcNo === formData.slcNo,
//         );

//         if (duplicate) {
//           setErrors((prev) => ({
//             ...prev,
//             slcNo: "This certificate already exists",
//           }));

//           return;
//         }

//         const newCertificate = {
//           ...formData,
//           id: Date.now(),
//           savedAt: new Date().toISOString(),
//         };

//         updatedCertificates = [...existingCertificates, newCertificate];
//       }

//       localStorage.setItem(
//         "schoolCertificates",
//         JSON.stringify(updatedCertificates),
//       );

//       alert(
//         isEditing
//           ? "Certificate updated successfully!"
//           : "Certificate saved successfully!",
//       );

//       // Notify parent component
//       if (onUpdate) {
//         onUpdate();
//       }
//     } catch (error) {
//       console.error("Certificate save error:", error);
//       alert("Unable to save certificate. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Reusable input classes
//   const inputClass = (name) =>
//     `w-full rounded-lg border ${
//       errors[name] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
//     } px-4 py-3 text-sm text-gray-700 outline-none transition
//     focus:border-blue-400 focus:ring-2 focus:ring-blue-100`;

//   // Reusable field
//   const renderInput = ({
//     name,
//     label,
//     type = "text",
//     placeholder = "",
//     required = false,
//     icon,
//   }) => (
//     <div key={name}>
//       <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600">
//         {icon}
//         {label}

//         {required && <span className="text-red-500">*</span>}
//       </label>

//       <input
//         type={type}
//         name={name}
//         value={formData[name] ?? ""}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className={inputClass(name)}
//       />

//       {errors[name] && (
//         <p className="mt-1 text-xs font-medium text-red-500">{errors[name]}</p>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#f5f7fb] p-4 md:p-6 lg:p-8">
//       {/* Page Heading */}
//       <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <div className="mb-1 flex items-center gap-3">
//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
//               <FaCertificate size={23} />
//             </div>

//             <h1 className="text-2xl font-bold text-[#202b3c] md:text-3xl">
//               School Leaving Certificate
//             </h1>
//           </div>

//           <p className="ml-1 text-sm text-gray-500">
//             {isEditing
//               ? "Update existing school leaving certificate"
//               : "Create a new school leaving certificate"}
//           </p>
//         </div>

//         <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
//           {isEditing ? "Edit Certificate" : "New Certificate"}
//         </div>
//       </div>

//       {/* Form */}
//       <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
//         {/* Form Header */}
//         <div className="border-b border-gray-100 p-5">
//           <h2 className="text-lg font-bold text-[#202b3c]">
//             Certificate Information
//           </h2>

//           <p className="mt-1 text-sm text-gray-500">
//             Enter the student's details carefully.
//           </p>

//           <p className="mt-3 text-xs text-gray-400">
//             Fields marked with <span className="text-red-500">*</span> are
//             required.
//           </p>
//         </div>

//         <div className="space-y-8 p-5 md:p-7">
//           {/* Section 1: Certificate Information */}
//           <section>
//             <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-3">
//               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
//                 <FaIdCard />
//               </div>

//               <h3 className="font-bold text-[#398eb6]">
//                 Certificate Information
//               </h3>
//             </div>

//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
//               {renderInput({
//                 name: "regNo",
//                 label: "Registration No",
//                 placeholder: "Enter registration number",
//                 required: true,
//                 icon: <FaIdCard />,
//               })}

//               {renderInput({
//                 name: "slcNo",
//                 label: "SLC No",
//                 placeholder: "Enter SLC number",
//                 required: true,
//                 icon: <FaCertificate />,
//               })}

//               {renderInput({
//                 name: "issueDate",
//                 label: "Issue Date",
//                 type: "date",
//                 required: true,
//                 icon: <FaCalendarAlt />,
//               })}
//             </div>
//           </section>

//           {/* Section 2: Dates */}
//           <section>
//             <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-3">
//               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
//                 <FaCalendarAlt />
//               </div>

//               <h3 className="font-bold text-[#398eb6]">
//                 Admission & Leaving Dates
//               </h3>
//             </div>

//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
//               {renderInput({
//                 name: "admissionDate",
//                 label: "Date of Admission",
//                 type: "date",
//               })}

//               {renderInput({
//                 name: "leavingDate",
//                 label: "Date of Leaving",
//                 type: "date",
//                 required: true,
//               })}

//               {renderInput({
//                 name: "dob",
//                 label: "Date of Birth",
//                 type: "date",
//               })}
//             </div>
//           </section>

//           {/* Section 3: Student Information */}
//           <section>
//             <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-3">
//               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
//                 <FaUser />
//               </div>

//               <h3 className="font-bold text-[#398eb6]">Student Information</h3>
//             </div>

//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//               {renderInput({
//                 name: "studentName",
//                 label: "Student Name",
//                 placeholder: "Enter student name",
//                 required: true,
//                 icon: <FaUser />,
//               })}

//               {renderInput({
//                 name: "fatherName",
//                 label: "Father Name",
//                 placeholder: "Enter father name",
//                 required: true,
//                 icon: <FaUser />,
//               })}

//               {renderInput({
//                 name: "admissionClass",
//                 label: "Admission Class",
//                 placeholder: "Enter admission class",
//                 icon: <FaBook />,
//               })}

//               {renderInput({
//                 name: "leavingClass",
//                 label: "Leaving Class",
//                 placeholder: "Enter leaving class",
//                 icon: <FaBook />,
//               })}
//             </div>
//           </section>

//           {/* Section 4: Reason */}
//           <section>
//             <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-3">
//               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
//                 <FaFileAlt />
//               </div>

//               <h3 className="font-bold text-[#398eb6]">Reason for Leaving</h3>
//             </div>

//             <textarea
//               name="reason"
//               value={formData.reason}
//               onChange={handleChange}
//               rows={5}
//               placeholder="Write the reason for leaving school..."
//               className="w-full resize-y rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//             />
//           </section>
//         </div>

//         {/* Footer Buttons */}
//         <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 bg-[#fafbfe] p-5">
//           {onClose && (
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
//             >
//               <FaTimes />
//               Close
//             </button>
//           )}

//           <button
//             type="button"
//             onClick={handleOnSave}
//             disabled={saving}
//             className="flex items-center gap-2 rounded-lg bg-[#398eb6] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#28779e] disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             <FaSave />

//             {saving
//               ? "Saving..."
//               : isEditing
//                 ? "Update Certificate"
//                 : "Save Certificate"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateCertificate;
