
import React from "react";
import { FaTimes, FaPrint, FaCertificate } from "react-icons/fa";

function CertificateModal({ certificate, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  const details = [
    { label: "Student Name", value: certificate?.studentName },
    { label: "Father Name", value: certificate?.fatherName },
    { label: "Registration No", value: certificate?.regNo },
    { label: "SLC No", value: certificate?.slcNo },
    { label: "Date of Birth", value: certificate?.dob },
    { label: "Issue Date", value: certificate?.issueDate },
    { label: "Admission Date", value: certificate?.admissionDate },
    { label: "Leaving Date", value: certificate?.leavingDate },
    { label: "Admission Class", value: certificate?.admissionClass },
    { label: "Leaving Class", value: certificate?.leavingClass },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5">
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }

          #printable-certificate,
          #printable-certificate * {
            visibility: visible !important;
          }

          #printable-certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 25px;
            box-shadow: none !important;
            border: none !important;
          }

          @page {
            size: A4;
            margin: 10mm;
          }
        }
      `}</style>

      <div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl text-[#398eb6]">
              <FaCertificate />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Certificate Preview
              </h2>
              <p className="text-xs text-gray-500">
                School Leaving Certificate
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <FaTimes size={19} />
          </button>
        </div>

        {/* Printable Certificate */}
        <div className="overflow-y-auto bg-slate-100 p-4 sm:p-7">
          <div
            id="printable-certificate"
            className="mx-auto max-w-200 border border-gray-200 bg-white p-6 shadow-sm sm:p-10"
          >
            {/* School Header */}
            <div className="border-b-2 border-[#398eb6] pb-6 text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl text-[#398eb6]">
                <FaCertificate />
              </div>

              <h1 className="text-2xl font-extrabold uppercase tracking-wide text-gray-800 sm:text-3xl">
                Al-Falah Public School
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                kahi Nizampur/03295957232
              </p>

              <div className="mt-6">
                <span className="rounded-full bg-blue-50 px-5 py-2 text-sm font-bold uppercase tracking-wider text-[#398eb6]">
                  School Leaving Certificate
                </span>
              </div>
            </div>

            {/* Certificate Number */}
            <div className="mt-6 flex flex-wrap justify-between gap-3 text-sm">
              <p>
                <span className="font-semibold text-gray-600">
                  Registration No:
                </span>{" "}
                <span className="font-bold text-gray-800">
                  {certificate?.regNo || "-"}
                </span>
              </p>

              <p>
                <span className="font-semibold text-gray-600">SLC No:</span>{" "}
                <span className="font-bold text-gray-800">
                  {certificate?.slcNo || "-"}
                </span>
              </p>
            </div>

            {/* Student Details */}
            <div className="mt-8">
              <h3 className="mb-5 border-l-4 border-[#398eb6] pl-3 text-base font-bold text-gray-800">
                Student Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {details.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-3">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                      {item.label}
                    </p>

                    <p className="wrap-break-word text-sm font-semibold text-gray-800">
                      {item.value || "-"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div className="mt-8">
              <h3 className="mb-3 border-l-4 border-[#398eb6] pl-3 text-base font-bold text-gray-800">
                Reason for Leaving
              </h3>

              <div className="min-h-20 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                  {certificate?.reason || "No reason provided."}
                </p>
              </div>
            </div>

            {/* Declaration */}
            <div className="mt-8 text-sm leading-7 text-gray-700">
              This is to certify that the above-mentioned student was a bonafide
              student of this institution. The information provided above is
              correct according to our school records.
            </div>

            {/* Signatures */}
            <div className="mt-20 grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="mx-auto w-40 border-t border-gray-800 pt-2">
                  <p className="text-sm font-semibold text-gray-800">
                    Parent Signature
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="mx-auto w-40 border-t border-gray-800 pt-2">
                  <p className="text-sm font-semibold text-gray-800">
                    Principal Signature
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 border-t border-gray-200 pt-4 text-center">
              <p className="text-xs text-gray-400">
                This certificate is issued by the school administration.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 border-t border-gray-200 bg-white px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
          >
            Close
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg bg-[#398eb6] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#287da5]"
          >
            <FaPrint />
            Print Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

export default CertificateModal;
