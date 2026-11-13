import React from "react";
import {
  FaFileInvoice,
  FaSearch,
  FaPlus,
  FaTrash,
  FaSave,
  FaPrint,
} from "react-icons/fa";
import { useState } from "react";

function FeeBill() {
  const inputClass =
    "w-full rounded-md border border-[#ced4da] bg-white px-3 py-3 text-base outline-none focus:border-[#398eb6]";

  const readOnlyClass =
    "w-full rounded-md border border-[#ced4da] bg-[#eeeeee] px-3 py-3 text-base outline-none";

  const labelClass = "text-base font-bold text-black";

  const [billData, setBillData] = useState({
    registrationNo: "",
    billNo: "",
    issueDate: "",
    studentName: "",
    fatherName: "",
    billMonth: "",
    class: "",
    section: "",
    dueDate: "",
    academicSession: "",
    previousBalance: 0,
    feeDetails: [
      {
        feeType: "Tuition Fee",
      },
    ],
    totalFee: 0,
    discount: 0,
    netPayable: 0,
    paidAmount: 0,
    remainingBalance: 0,
    paymentStatus: "Unpaid",
  });

  const handleGenerateBills = () => {
    const existingBills = JSON.parse(localStorage.getItem("feeBills")) || [];
    const newGenerateBills = [...existingBills, billData];
    localStorage.setItem("feeBills", JSON.stringify(newGenerateBills));
    setBillData({
      registrationNo: "",
      billNo: "",
      issueDate: "",
      studentName: "",
      fatherName: "",
      billMonth: "",
      class: "",
      section: "",
      dueDate: "",
      academicSession: "",
      previousBalance: 0,
      feeDetails: [
        {
          feeType: "Tuition Fee",
        },
      ],
      totalFee: 0,
      discount: 0,
      netPayable: 0,
      paidAmount: 0,
      remainingBalance: 0,
      paymentStatus: "Unpaid",
    });
  };

  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="min-h-screen bg-[#e9f0f6] p-4 md:p-6">
      {/* Heading */}
      <div className="mb-7 flex items-center gap-3">
        <FaFileInvoice size={32} className="text-black" />
        <h1 className="text-2xl font-normal text-black md:text-3xl">
          Generate Fee Bill
        </h1>
      </div>

      {/* Student & Bill Information */}
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 lg:grid-cols-2 xl:grid-cols-3">
        {/* Registration Number */}
        <div className="grid grid-cols-[125px_1fr] items-center gap-3">
          <label className={labelClass}>Registration No</label>
          <div className="flex min-w-0">
            <input
              type="text"
              placeholder="Registration No"
              value={billData.registrationNo}
              onChange={(e) =>
                setBillData({ ...billData, registrationNo: e.target.value })
              }
              className="min-w-0 flex-1 border  rounded-l-md border-[#ced4da] bg-[#eeeeee] px-3 py-3 outline-none"
            />
            <button className="rounded-r-md bg-[#398eb6] px-5 text-white">
              <FaSearch size={20} />
            </button>
          </div>
        </div>

        {/* Bill Number */}
        <div className="grid grid-cols-[125px_1fr] items-center gap-3">
          <label className={labelClass}>Bill No.</label>
          <input
            type="text"
            placeholder="Auto Generated"
            value={billData.billNo}
            onChange={(e) =>
              setBillData({ ...billData, billNo: e.target.value })
            }
            // readOnly
            className={readOnlyClass}
          />
        </div>

        {/* Issue Date */}
        <div className="grid grid-cols-[85px_1fr] items-center gap-3">
          <label className={labelClass}>Issue Date</label>
          <input
            type="date"
            className={inputClass}
            value={billData.issueDate}
            onChange={(e) =>
              setBillData({ ...billData, issueDate: e.target.value })
            }
          />
        </div>

        {/* Student Name */}
        <div className="grid grid-cols-[125px_1fr] items-center gap-3">
          <label className={labelClass}>Student Name</label>
          <input
            type="text"
            value={billData.studentName}
            onChange={(e) =>
              setBillData({ ...billData, studentName: e.target.value })
            }
            placeholder="Student Name"
            className={readOnlyClass}
          />
        </div>

        {/* Father Name */}
        <div className="grid grid-cols-[125px_1fr] items-center gap-3">
          <label className={labelClass}>Father Name</label>
          <input
            type="text"
            value={billData.fatherName}
            onChange={(e) =>
              setBillData({ ...billData, fatherName: e.target.value })
            }
            placeholder="Father Name"
            className={readOnlyClass}
          />
        </div>

        {/* Bill Month */}
        <div className="grid grid-cols-[85px_1fr] items-center gap-3">
          <label className={labelClass}>Bill Month</label>
          <input
            type="month"
            value={billData.billMonth}
            onChange={(e) =>
              setBillData({ ...billData, billMonth: e.target.value })
            }
            className={inputClass}
          />
        </div>

        {/* Class */}
        <div className="grid grid-cols-[125px_1fr] items-center gap-3">
          <label className={labelClass}>Class</label>
          <input
            type="text"
            value={billData.class}
            onChange={(e) =>
              setBillData({ ...billData, class: e.target.value })
            }
            placeholder="Student Class"
            className={readOnlyClass}
          />
        </div>

        {/* Section */}
        <div className="grid grid-cols-[125px_1fr] items-center gap-3">
          <label className={labelClass}>Section</label>
          <input
            type="text"
            value={billData.section}
            onChange={(e) =>
              setBillData({ ...billData, section: e.target.value })
            }
            placeholder="Section"
            className={readOnlyClass}
          />
        </div>

        {/* Due Date */}
        <div className="grid grid-cols-[85px_1fr] items-center gap-3">
          <label className={labelClass}>Due Date</label>
          <input
            type="date"
            value={billData.dueDate}
            onChange={(e) =>
              setBillData({ ...billData, dueDate: e.target.value })
            }
            className={inputClass}
          />
        </div>

        {/* Academic Session */}
        <div className="grid grid-cols-[125px_1fr] items-center gap-3">
          <label className={labelClass}>Academic Session</label>
          <select
            className={inputClass}
            value={billData.academicSession}
            onChange={(e) =>
              setBillData({ ...billData, academicSession: e.target.value })
            }
          >
            <option>Select Session</option>
            <option>2026-2027</option>
            <option>2027-2028</option>
          </select>
        </div>

        {/* Previous Balance */}
        <div className="grid grid-cols-[125px_1fr] items-center gap-3">
          <label className={labelClass}>Previous Balance</label>
          <input
            type="number"
            placeholder="0"
            value={billData.previousBalance}
            onChange={(e) =>
              setBillData({
                ...billData,
                previousBalance: Number(e.target.value),
              })
            }
            className={inputClass}
          />
        </div>
      </div>

      {/* Fee Details */}
      <div className="mt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-black">Fee Details</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-162.5 border-collapse bg-white text-sm">
            <thead className="bg-[#d8e5ef]">
              <tr>
                <th className="border border-[#ced4da] px-4 py-3">#</th>
                <th className="border border-[#ced4da] px-4 py-3">Fee Type</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-[#ced4da] px-4 py-3">1</td>
                <td className="border border-[#ced4da] p-2">
                  <select
                    className={inputClass}
                    value={billData.feeDetails[0].feeType}
                    onChange={(e) =>
                      setBillData({
                        ...billData,
                        feeDetails: [
                          {
                            ...billData.feeDetails[0],
                            feeType: e.target.value,
                          },
                        ],
                      })
                    }
                  >
                    <option>Tuition Fee</option>
                    <option>Admission Fee</option>
                    <option>Exam Fee</option>
                    <option>Computer Fee</option>
                    <option>Library Fee</option>
                    <option>Transport Fee</option>
                    <option>Other Charges</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="mt-8">
        <h2 className="mb-5 text-xl font-bold text-black">Payment Summary</h2>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="grid grid-cols-[125px_1fr] items-center gap-3">
            <label className={labelClass}>Total Fee</label>
            <input
              type="number"
              value={billData.totalFee}
              onChange={(e) =>
                setBillData({ ...billData, totalFee: Number(e.target.value) })
              }
              placeholder="0"
              className={readOnlyClass}
            />
          </div>

          <div className="grid grid-cols-[125px_1fr] items-center gap-3">
            <label className={labelClass}>Discount</label>
            <input
              type="number"
              placeholder="0"
              value={billData.discount}
              onChange={(e) =>
                setBillData({ ...billData, discount: Number(e.target.value) })
              }
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-[125px_1fr] items-center gap-3">
            <label className={labelClass}>Net Payable</label>
            <input
              type="number"
              value={billData.netPayable}
              onChange={(e) =>
                setBillData({ ...billData, netPayable: Number(e.target.value) })
              }
              placeholder="0"
              className={readOnlyClass}
            />
          </div>

          <div className="grid grid-cols-[125px_1fr] items-center gap-3">
            <label className={labelClass}>Paid Amount</label>
            <input
              type="number"
              placeholder="0"
              value={billData.paidAmount}
              onChange={(e) =>
                setBillData({ ...billData, paidAmount: Number(e.target.value) })
              }
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-[125px_1fr] items-center gap-3">
            <label className={labelClass}>Remaining Balance</label>
            <input
              type="number"
              value={billData.remainingBalance}
              onChange={(e) =>
                setBillData({
                  ...billData,
                  remainingBalance: Number(e.target.value),
                })
              }
              placeholder="0"
              className={readOnlyClass}
            />
          </div>

          <div className="grid grid-cols-[125px_1fr] items-center gap-3">
            <label className={labelClass}>Payment Status</label>
            <select
              className={inputClass}
              value={billData.paymentStatus}
              onChange={(e) =>
                setBillData({ ...billData, paymentStatus: e.target.value })
              }
            >
              <option>Unpaid</option>
              <option>Partial</option>
              <option>Paid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-7 flex flex-wrap justify-end gap-3">
        <button
          className="flex items-center gap-2 rounded-md bg-[#398eb6] px-5 py-3 font-semibold text-white"
          onClick={handleGenerateBills}
        >
          <FaSave />
          Generate Bill
        </button>

        <button
          className="flex items-center gap-2 rounded-md bg-green-600 px-5 py-3 font-semibold text-white"
          onClick={handlePrint}
        >
          <FaPrint />
          Print Bill
        </button>
      </div>
    </div>
  );
}

export default FeeBill;
