
import { useEffect, useState } from "react";
import Landing from "./components/Landing";
import NotVerified from "./components/Unath/NotVerified";
import DashboardMerchant from "./components/Merchant/Dashboard";
import DashboardUser from "./components/Merchant/Dashboard";


import { Routes, Route } from 'react-router-dom'


// Colors 
// Primary - #5271ff
// Secondary - #5ce1e6

function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<Landing />} />
        <Route path="/not-verified" element={<NotVerified />} />
        <Route path="/dashboard-user" element={<DashboardUser />} />
        <Route path="/dashboard-merchant" element={<DashboardMerchant />} />
      </Routes>
    </>
  );
}

export default App;
