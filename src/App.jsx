import React from "react";
import Header from "./components/Header";
import Slidebar from "./components/Slidebar";
import HomeInfo from "./components/HomeInfo";
import StudentRecord from "./components/StudentRecord";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function toggle() {
    setSidebarOpen((prev) => !prev);
  }
  return (
    <div>
      <Header toggle={toggle} />
      <div className="flex">
        <Slidebar sidebarOpen={sidebarOpen} />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
