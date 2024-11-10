import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Task from "./components/Task";
import { Toaster } from "react-hot-toast";

// Importing pages
import Login from "./pages/Login";
import Register from "./pages/Register"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken("");
  };

  return (
    <>
      <Toaster position="top-right" gutter={8} />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path="/"
              element={
                <AppLayout>
                  <div className="flex flex-col items-center w-full pt-10">
                    <img src="./image/welcome.svg" className="w-5/12" alt="" />
                    <h1 className="text-lg text-gray-600">
                      Select or create new project
                    </h1>
                  </div>
                </AppLayout>
              }
            />
            <Route path="/:projectId" element={<Task />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
