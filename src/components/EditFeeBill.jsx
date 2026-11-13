import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaSave,
  FaFileInvoiceDollar,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

function EditFeeBill({ updatedBills, onClose, onUpdate }) {
  const [formData, setFormData] = useState(updatedBills);

  // Keep form synchronized with selected bill
  useEffect(() => {
    setFormData({
      ...updatedBills,
      feeDetails: updatedBills.feeDetails?.length
        ? updatedBills.feeDetails
        : [{ feeType: "Tuition Fee" }],
    });
  }, [updatedBills]);

  // Handle normal input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle fee detail fields
  const handleFeeChange = (index, e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedFees = [...prev.feeDetails];

      updatedFees[index] = {
        ...updatedFees[index],
        [name]: name === "amount" ? Number(value) : value,
      };

      return {
        ...prev,
        feeDetails: updatedFees,
      };
    });
  };

  // Add new fee row
  const addFee = () => {
    setFormData((prev) => ({
      ...prev,
      feeDetails: [...prev.feeDetails, { feeType: "Tuition Fee" }],
    }));
  };

  // Remove fee row
  const removeFee = (index) => {
    setFormData((prev) => ({
      ...prev,
      feeDetails: prev.feeDetails.filter((_, i) => i !== index),
    }));
  };

  // Calculate fee amounts
  const totalFee = formData.feeDetails.reduce(
    (total, fee) => total + Number(fee.amount || 0),
    0,
  );

  const previousBalance = Number(formData.previousBalance || 0);
  const discount = Number(formData.discount || 0);
  const paidAmount = Number(formData.paidAmount || 0);

  const netPayable = Math.max(0, previousBalance + totalFee - discount);

  const remainingBalance = Math.max(0, netPayable - paidAmount);

  const paymentStatus =
    remainingBalance === 0
      ? "Paid"
      : paidAmount > 0
        ? "Partially Paid"
        : "Unpaid";

  // Update bill
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBill = {
      ...formData,
      totalFee,
      netPayable,
      remainingBalance,
      paymentStatus,
      previousBalance,
      discount,
      paidAmount,
    };

    onUpdate(updatedBills, updatedBill);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center rounded bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white p-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Fee Bill</h2>
            <p className="mt-1 text-sm text-gray-500">
              Update student fee bill information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-5 shadow-sm md:p-7"
        >
          {/* Bill Information */}
          <section>
            <div className="mb-5 flex items-center gap-3 border-b pb-3">
              <FaFileInvoiceDollar className="text-xl text-[#398eb6]" />
              <h3 className="text-lg font-bold text-gray-800">
                Bill Information
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Bill Number
                </label>
                <input
                  name="billNo"
                  value={formData.billNo || ""}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter bill number"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-[#398eb6]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Issue Date
                </label>
                <input
                  name="issueDate"
                  value={formData.issueDate || ""}
                  onChange={handleChange}
                  type="date"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-[#398eb6]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Due Date
                </label>
                <input
                  name="dueDate"
                  value={formData.dueDate || ""}
                  onChange={handleChange}
                  type="date"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-[#398eb6]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Registration No
                </label>
                <input
                  name="registrationNo"
                  value={formData.registrationNo || ""}
                  onChange={handleChange}
                  type="text"
                  placeholder="Registration number"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-[#398eb6]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Student Name
                </label>
                <input
                  name="studentName"
                  value={formData.studentName || ""}
                  onChange={handleChange}
                  type="text"
                  placeholder="Student name"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-[#398eb6]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Father Name
                </label>
                <input
                  name="fatherName"
                  value={formData.fatherName || ""}
                  onChange={handleChange}
                  type="text"
                  placeholder="Father name"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-[#398eb6]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Class
                </label>
                <select
                  name="class"
                  value={formData.class || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 outline-none focus:border-[#398eb6]"
                >
                  <option value="">Select Class</option>
                  {[
                    "Nursery",
                    "Prep",
                    "KG",
                    "1st",
                    "2nd",
                    "3rd",
                    "4th",
                    "5th",
                    "6th",
                    "7th",
                    "8th",
                    "9th",
                    "10th",
                    "1st Year",
                    "2nd Year",
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Section
                </label>
                <select
                  name="section"
                  value={formData.section || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 outline-none focus:border-[#398eb6]"
                >
                  <option value="">Select Section</option>
                  {["A", "B", "C"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Academic Session
                </label>
                <input
                  name="academicSession"
                  value={formData.academicSession || ""}
                  onChange={handleChange}
                  type="text"
                  placeholder="2026-2027"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-[#398eb6]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Bill Month
                </label>
                <select
                  name="billMonth"
                  value={formData.billMonth || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 outline-none focus:border-[#398eb6]"
                >
                  <option value="">Select Month</option>
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = new Date(2026, i).toLocaleString("en", {
                      month: "long",
                    });
                    return (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </section>

          {/* Fee Details */}
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b pb-3">
              <h3 className="text-lg font-bold text-gray-800">Fee Details</h3>
            </div>

            <div className="space-y-3">
              {formData.feeDetails.map((fee, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 items-end gap-3 rounded-lg border border-gray-100 p-4 md:grid-cols-4"
                >
                  <div>
                    <label className=" mb-2 block text-sm font-semibold text-gray-600">
                      Fee Type
                    </label>
                    <select
                      name="feeType"
                      value={fee.feeType || ""}
                      onChange={(e) => handleFeeChange(index, e)}
                      className="w-138 w-max-0 rounded-lg border border-gray-200 bg-white px-3 py-2.5"
                    >
                      {[
                        "Tuition Fee",
                        "Admission Fee",
                        "Exam Fee",
                        "Transport Fee",
                        "Other Fee",
                      ].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Summary */}
          <section>
            <h3 className="mb-5 border-b pb-3 text-lg font-bold text-gray-800">
              Payment Summary
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Previous Balance (Rs.)
                </label>
                <input
                  name="previousBalance"
                  value={formData.previousBalance ?? 0}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Total Fee (Rs.)
                </label>
                <input
                  value={totalFee}
                  type="number"
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Discount (Rs.)
                </label>
                <input
                  name="discount"
                  value={formData.discount ?? 0}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Net Payable (Rs.)
                </label>
                <input
                  value={netPayable}
                  type="number"
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Paid Amount (Rs.)
                </label>
                <input
                  name="paidAmount"
                  value={formData.paidAmount ?? 0}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Remaining Balance (Rs.)
                </label>
                <input
                  value={remainingBalance}
                  type="number"
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5"
                />
              </div>

              <div>
                <label className="  mb-2 block text-sm font-semibold text-gray-600">
                  Payment Status
                </label>
                <input
                  value={paymentStatus}
                  readOnly
                  className="w-138 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5"
                />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-wrap justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-[#398eb6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#28779e]"
            >
              <FaSave />
              Update Fee Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFeeBill;
