import React, { useState } from "react";
import { FaUser, FaSearch, FaPlus, FaUserCircle } from "react-icons/fa";

// Default form data
const initialFormData = {
  registrationNo: "2147483648",
  admissionDate: "2026-10-30",
  rollNo: "",
  studentName: "",
  dob: "",
  class: "",
  section: "",
  fatherName: "",
  gender: "",

  admissionToClass: "",
  bloodGroup: "",
  religion: "",
  nationality: "",
  formBNo: "",

  fatherContact: "",
  guardianName: "",
  guardianContact: "",
  emergencyContact: "",
  email: "",
  city: "",
  postalCode: "",
  permanentAddress: "",
  currentAddress: "",

  admissionFee: "",
  monthlyFee: "",
  annualFee: "",
  securityFee: "",
  discount: "",
  totalFee: "",
  paidFee: "",
  remainingFee: "",
  feeType: "",
  paymentStatus: "",
};

// Load previous saved data
const getSavedAdmission = () => {
  try {
    const savedData = JSON.parse(localStorage.getItem("admissionData"));

    if (!savedData) {
      return {
        formData: initialFormData,
        photo: null,
        documents: [],
      };
    }

    // Support old fields-array format and new object format
    let restoredFields = {};

    if (Array.isArray(savedData.fields)) {
      savedData.fields.forEach((field) => {
        restoredFields[field.id] = field.value;
      });
    } else if (savedData.fields) {
      restoredFields = savedData.fields;
    }

    // Exclude removed fields from previously saved data
    const { familyNo, previousSchool, motherContact, ...remainingFields } =
      restoredFields;

    return {
      formData: {
        ...initialFormData,
        ...remainingFields,
      },
      photo: savedData.photo || null,
      documents: savedData.documents || [],
    };
  } catch (error) {
    console.error("Error loading admission data:", error);

    return {
      formData: initialFormData,
      photo: null,
      documents: [],
    };
  }
};

// Reusable Input
const Input = ({
  label,
  name,
  type = "text",
  disabled = false,
  className = "",
  value,
  onChange,
}) => (
  <div className={`flex min-w-0 items-center gap-3 ${className}`}>
    {label && (
      <label
        htmlFor={name}
        className="w-[32%] shrink-0 text-[18px] font-bold text-[#303a44]"
      >
        {label}
      </label>
    )}

    <input
      id={name}
      name={name}
      type={type}
      value={value ?? ""}
      onChange={onChange}
      disabled={disabled}
      className={`h-13.75 w-full min-w-0 rounded-[9px] border border-[#d0d7df] bg-white px-5 text-[18px] text-[#454545] outline-none focus:border-[#3895c0] ${
        disabled ? "bg-[#ededed]" : ""
      }`}
    />
  </div>
);

// Reusable Select
const Select = ({
  label,
  name,
  options = [],
  plus = false,
  placeholder,
  value,
  onChange,
  onPlus,
}) => (
  <div className="flex min-w-0 items-center gap-3">
    <label
      htmlFor={name}
      className="w-[32%] shrink-0 text-[18px] font-bold text-[#303a44]"
    >
      {label}
    </label>

    <select
      id={name}
      name={name}
      value={value ?? ""}
      onChange={onChange}
      className="h-13.75 w-full min-w-0 rounded-[9px] border border-[#d0d7df] bg-white px-5 text-[18px] text-[#454545] outline-none focus:border-[#3895c0]"
    >
      <option value="">{placeholder || `--${label}--`}</option>

      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>

    {plus && (
      <button
        type="button"
        onClick={onPlus}
        className="flex h-13.75 w-15.5 shrink-0 items-center justify-center rounded-md bg-[#398eb6] text-white hover:bg-[#28779e]"
      >
        <FaPlus size={24} />
      </button>
    )}
  </div>
);

const AdmissionForm = () => {
  const saved = getSavedAdmission();

  const [activeTab, setActiveTab] = useState("Personal Information");

  const [formData, setFormData] = useState(saved.formData);
  const [photo, setPhoto] = useState(saved.photo);
  const [documents, setDocuments] = useState(saved.documents);

  const [classes, setClasses] = useState([
    "Nursery",
    "Prep",
    "KG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "1st Year",
    "2nd Year",
  ]);

  const tabs = [
    "Personal Information",
    "Contact Information",
    "Fee Information",
  ];

  const documentList = [
    "Form B/Birth Certificate",
    "School Leaving Certificate",
    "Father's NIC",
  ];

  // Handle all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new class
  const handleAddClass = () => {
    const newClass = window.prompt("Enter new class name:");

    if (!newClass || !newClass.trim()) return;

    const cleanClass = newClass.trim();

    if (classes.includes(cleanClass)) {
      alert("This class already exists!");
      return;
    }

    setClasses((prev) => [...prev, cleanClass]);

    setFormData((prev) => ({
      ...prev,
      class: cleanClass,
    }));
  };

  // Handle documents
  const toggleDocument = (name) => {
    setDocuments((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  // Handle photo upload
  const handlePhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image!");
      e.target.value = "";
      return;
    }

    // Convert image to Base64
    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.onerror = () => {
      alert("Unable to read image!");
    };

    reader.readAsDataURL(file);
  };

  // Save admission form
  const handleSave = (e) => {
    e.preventDefault();

    try {
      const existingStudents = JSON.parse(
        localStorage.getItem("admissionStudents") || "[]",
      );

      if (!Array.isArray(existingStudents)) {
        throw new Error("Saved student data is not an array.");
      }

      // Check required fields
      if (!formData.studentName.trim() || !formData.fatherName.trim()) {
        alert("Please enter Student Name and Father Name.");
        return;
      }

      const newStudent = {
        id: Date.now(),
        ...formData,
        photo,
        documents,
        savedAt: new Date().toISOString(),
      };

      const updatedStudents = [...existingStudents, newStudent];

      localStorage.setItem(
        "admissionStudents",
        JSON.stringify(updatedStudents),
      );

      // Clear old saved form data
      localStorage.removeItem("admissionData");

      // Reset React state
      setFormData({ ...initialFormData });
      setPhoto(null);
      setDocuments([]);
      setActiveTab("Personal Information");

      // Reset the actual HTML form
      e.currentTarget.reset();

      // Notify StudentList if it is already mounted
      window.dispatchEvent(new Event("admissionStudentsUpdated"));

      alert("Student saved successfully!");
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Unable to save student. Check browser storage or image size.");
    }
  };

  // Search button
  const searchButton = (
    <button
      type="button"
      onClick={() =>
        alert("Student search functionality is not connected yet.")
      }
      className="flex h-13.75 w-16 shrink-0 items-center justify-center rounded-r-md bg-[#398eb6] text-white hover:bg-[#28779e]"
    >
      <FaSearch size={23} />
    </button>
  );

  return (
    <form
      id="admission-form"
      onSubmit={handleSave}
      className="min-h-screen bg-[#eaf0f6] p-3 md:p-5.5"
    >
      <div className="mb-6 flex items-center gap-2">
        <FaUser className="text-[38px] text-black" />

        <h1 className="text-[35px] font-normal text-black">Admission Form</h1>
      </div>

      {/* TOP SECTION */}

      <div className="grid grid-cols-1 gap-x-7 gap-y-3 xl:grid-cols-[1.1fr_1fr_230px]">
        {/* LEFT SIDE */}

        <div className="space-y-2">
          {/* Registration No */}

          <div className="flex items-center gap-3">
            <label className="w-[32%] shrink-0 text-[18px] font-bold">
              Registration No
            </label>

            <div className="flex min-w-0 flex-1">
              <input
                value="PKR-"
                readOnly
                className="h-13.75 w-28.75 shrink-0 rounded-l-lg border border-[#d0d7df] bg-[#eeeeee] px-5 text-lg"
              />

              <input
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleChange}
                className="h-13.75 w-full min-w-0 border border-[#d0d7df] bg-white px-5 text-lg outline-none"
              />

              {searchButton}
            </div>
          </div>

          {/* Admission Date */}

          <Input
            label="Admission Date"
            name="admissionDate"
            type="date"
            value={formData.admissionDate}
            onChange={handleChange}
          />

          {/* Class Roll No */}

          <Input
            label="Class Roll No"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
          />

          {/* Student Name */}

          <div className="flex items-center gap-3">
            <label className="w-[32%] shrink-0 text-[18px] font-bold">
              Student Name
            </label>

            <div className="flex w-full min-w-0">
              <input
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="h-13.75 w-full min-w-0 rounded-l-lg border border-[#d0d7df] bg-white px-5 text-lg outline-none focus:border-[#3895c0]"
              />

              {searchButton}
            </div>
          </div>

          {/* Date of Birth */}
        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-2">
          <Select
            label="Class"
            name="class"
            options={classes}
            placeholder="--classes--"
            value={formData.class}
            onChange={handleChange}
            plus
            onPlus={handleAddClass}
          />

          {/* SECTION DROPDOWN */}
          <Select
            label="Section"
            name="section"
            options={["A", "B", "C"]}
            placeholder="--Select Section--"
            value={formData.section}
            onChange={handleChange}
          />

          <Input
            label="Father Name"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
          />

          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />

          <Select
            label="Gender"
            name="gender"
            options={["Male", "Female", "Other"]}
            value={formData.gender}
            onChange={handleChange}
          />
        </div>

        {/* STUDENT PHOTO */}

        <div className="flex flex-col items-center gap-1">
          <label className="flex h-49.75 w-49.75 cursor-pointer items-center justify-center overflow-hidden bg-[#d9d9d9]">
            {photo ? (
              <img
                src={photo}
                alt="Student"
                className="h-full w-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-[180px] text-[#b8b8b8]" />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="hidden"
            />
          </label>

          <div className="flex w-49.75 gap-1">
            <label className="flex h-13.5 flex-1 cursor-pointer items-center justify-center rounded bg-[#398eb6] text-lg text-white hover:bg-[#28779e]">
              Select
              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={() => setPhoto(null)}
              className="h-13.5 flex-1 rounded bg-[#398eb6] text-lg text-white hover:bg-[#28779e]"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}

      <div className="mt-2 overflow-hidden rounded-t-md border border-[#398eb6]">
        <div className="bg-[#337fa8] px-4 pt-4 md:px-6">
          <div className="flex flex-wrap gap-1 border-b border-white/80">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-t-md border px-5 py-4 text-[18px] text-white transition md:px-6 ${
                  activeTab === tab
                    ? "border-white bg-[#285575]"
                    : "border-transparent hover:bg-[#286d94]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* TAB BODY */}

        <div className="min-h-162.5 bg-[#eaf0f6] p-5 md:p-6 lg:px-6 lg:py-14">
          {/* PERSONAL INFORMATION */}

          {activeTab === "Personal Information" && (
            <div className="space-y-2">
              <div className="grid grid-cols-1 gap-x-16 gap-y-2 lg:grid-cols-2">
                <Select
                  label="Admission to Class"
                  name="admissionToClass"
                  options={classes}
                  placeholder="--classes--"
                  value={formData.admissionToClass}
                  onChange={handleChange}
                />

                <Select
                  label="Blood Group"
                  name="bloodGroup"
                  options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
                  placeholder="--Blood Group--"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-x-16 gap-y-2 lg:grid-cols-2">
                <Input
                  label="Religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                />

                <Input
                  label="Nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                />

                <Input
                  label="CNIC No"
                  name="cnicNo"
                  value={formData.cnicNo}
                  onChange={handleChange}
                />
              </div>

              {/* DOCUMENTS */}

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="lg:col-start-1">
                  <h3 className="mb-4 text-[19px] font-bold text-[#303a44]">
                    Documents Received
                  </h3>

                  <div className="space-y-3">
                    {documentList.map((item) => (
                      <label
                        key={item}
                        className="flex cursor-pointer items-center gap-1 text-[19px] font-bold text-[#303a44]"
                      >
                        <input
                          type="checkbox"
                          checked={documents.includes(item)}
                          onChange={() => toggleDocument(item)}
                          className="h-9 w-9 accent-[#398eb6]"
                        />

                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT INFORMATION */}

          {activeTab === "Contact Information" && (
            <div className="grid grid-cols-1 gap-x-16 gap-y-3 lg:grid-cols-2">
              <Input
                label="Father Contact"
                name="fatherContact"
                type="tel"
                value={formData.fatherContact}
                onChange={handleChange}
              />

              <Input
                label="Guardian Name"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
              />

              <Input
                label="Guardian Contact"
                name="guardianContact"
                type="tel"
                value={formData.guardianContact}
                onChange={handleChange}
              />

              <Input
                label="Emergency Contact"
                name="emergencyContact"
                type="tel"
                value={formData.emergencyContact}
                onChange={handleChange}
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

              <Input
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />

              <Input
                label="Permanent Address"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
              />

              <Input
                label="Current Address"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
              />
            </div>
          )}

          {/* FEE INFORMATION */}

          {activeTab === "Fee Information" && (
            <div className="grid grid-cols-1 gap-x-16 gap-y-3 lg:grid-cols-2">
              <Input
                label="Admission Fee"
                name="admissionFee"
                type="number"
                value={formData.admissionFee}
                onChange={handleChange}
              />

              <Input
                label="Monthly Fee"
                name="monthlyFee"
                type="number"
                value={formData.monthlyFee}
                onChange={handleChange}
              />

              <Input
                label="Annual Fee"
                name="annualFee"
                type="number"
                value={formData.annualFee}
                onChange={handleChange}
              />

              <Input
                label="Security Fee"
                name="securityFee"
                type="number"
                value={formData.securityFee}
                onChange={handleChange}
              />

              <Input
                label="Discount"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
              />

              <Input
                label="Total Fee"
                name="totalFee"
                type="number"
                value={formData.totalFee}
                onChange={handleChange}
              />

              <Input
                label="Paid Fee"
                name="paidFee"
                type="number"
                value={formData.paidFee}
                onChange={handleChange}
              />

              <Input
                label="Remaining Fee"
                name="remainingFee"
                type="number"
                value={formData.remainingFee}
                onChange={handleChange}
              />

              <Input
                label="Transport Fee"
                name="transportFee"
                type="number"
                value={formData.remainingFee}
                onChange={handleChange}
              />

              <Select
                label="Fee Type"
                name="feeType"
                options={["Monthly", "Quarterly", "Yearly"]}
                value={formData.feeType}
                onChange={handleChange}
              />

              <Select
                label="Payment Status"
                name="paymentStatus"
                options={["Paid", "Unpaid", "Partial"]}
                value={formData.paymentStatus}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* SAVE BUTTON */}

      <div className="mt-5 mb-5 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-[#398eb6] px-10 py-3 text-xl font-semibold text-white shadow-md hover:bg-[#287da5]"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AdmissionForm;
