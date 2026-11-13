import React from "react";
import { FaTimes, FaPrint, FaFileInvoiceDollar } from "react-icons/fa";

function ViewFeeBillModal({ selectedBill, onClose }) {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FaFileInvoiceDollar size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Fee Bill Details
              </h2>
              <p className="text-sm text-gray-500">
                Complete student fee information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="space-y-6 p-5">
          {/* Bill Information */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-blue-50 p-4">
            <div>
              <p className="text-xs font-medium text-gray-500">Bill Number</p>
              <h3 className="mt-1 text-lg font-bold text-gray-800">
                {selectedBill?.billNo || "N/A"}
              </h3>
            </div>

            <span className="rounded-full bg-red-100 px-4 py-2 text-xs font-bold text-red-600">
              {selectedBill?.paymentStatus || "Unpaid"}
            </span>
          </div>

          {/* Student Information */}
          <section>
            <h3 className="mb-4 border-b pb-2 text-base font-bold text-gray-800">
              Student Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["Registration No", selectedBill?.registrationNo],
                ["Student Name", selectedBill?.studentName],
                ["Father Name", selectedBill?.fatherName],
                ["Class", selectedBill?.class],
                ["Section", selectedBill?.section],
                ["Academic Session", selectedBill?.academicSession],
                ["Bill Month", selectedBill?.billMonth],
                ["Issue Date", selectedBill?.issueDate],
                ["Due Date", selectedBill?.dueDate],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {value || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Fee Details */}
          <section>
            <h3 className="mb-4 border-b pb-2 text-base font-bold text-gray-800">
              Fee Details
            </h3>

            <div className="overflow-x-auto rounded-lg border border-gray-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Fee Type</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {selectedBill?.feeDetails?.map((fee, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 font-medium text-gray-700">
                        {fee.feeType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Payment Summary */}
          <section>
            <h3 className="mb-4 border-b pb-2 text-base font-bold text-gray-800">
              Payment Summary
            </h3>

            <div className="space-y-3">
              {[
                ["Previous Balance", selectedBill?.previousBalance],
                ["Total Fee", selectedBill?.totalFee],
                ["Discount", selectedBill?.discount],
                ["Net Payable", selectedBill?.netPayable],
                ["Paid Amount", selectedBill?.paidAmount],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-3">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="font-semibold text-gray-800">
                    Rs. {value ?? 0}
                  </span>
                </div>
              ))}

              <div className="flex justify-between border-t pt-4">
                <span className="font-bold text-gray-800">
                  Remaining Balance
                </span>
                <span className="text-lg font-bold text-red-600">
                  Rs. {selectedBill?.remainingBalance ?? 0}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg bg-[#398eb6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#28779e]"
          >
            <FaPrint />
            Print Bill
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewFeeBillModal;
