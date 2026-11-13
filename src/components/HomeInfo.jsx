import React from "react";
import { Link } from "react-router-dom";

function HomeInfo() {
  return (
    <>
      {/* <div className="mt-6 mx-5 flex">
        <h1 className="text-2xl">Home</h1>
        <div className="pl-30 text-2xl text-[#FF0000]">
          MySms is integrated by 1-bill. Parents can
          <p className="pl-12 text-[#FF0000]">
            {" "}
            pay Bills by scanning QR-Code{" "}
          </p>
        </div>
        <div className="pl-20 text-2xl  text-[#337AB7]">
          Mobile app is available for Parants / Teachers,click here for
          <p className="pl-130 text-[#337AB7]">details.</p>
        </div>
      </div> */}

      <div className=" mt-8 mx-5 h-10 border-3 b border-gray-500  flex flex-wrap ">
        <h1 className="pl-20 font-bold py-1">Jump to</h1>
        <Link to="">
          <h1 className="pl-8 font-bold py-1 text-[#337AB7]">
            Student Reports
          </h1>
        </Link>
        <a href="">
          <h1 className="pl-8 font-bold py-1 text-[#337AB7]">Fee Records</h1>
        </a>
        <a href="">
          <h1 className="pl-8 font-bold py-1 text-[#337AB7]">Examination</h1>
        </a>
        <a href="">
          <h1 className="pl-8 font-bold py-1 text-[#337AB7]">Staff Records</h1>
        </a>
        <a href="">
          <h1 className="pl-8 font-bold py-1 text-[#337AB7]">Transport</h1>
        </a>
        <a href="">
          <h1 className="pl-8 font-bold py-1 text-[#337AB7]">Finance</h1>
        </a>
        <a href="">
          <h1 className="pl-8 font-bold py-1 text-[#337AB7]">Messaging</h1>
        </a>
      </div>
    </>
  );
}

export default HomeInfo;
