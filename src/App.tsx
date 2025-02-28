import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AppNavbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <NextUIProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
              <AppNavbar className="sticky top-0 z-50 bg-white shadow-md px-6 py-4" />

              <main className="flex-1 container mx-auto px-4 sm:px-6 md:px-8">
                <Routes>
                  <Route element={<PublicRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                  </Route>

                  <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                  </Route>
                </Routes>
              </main>
            </div>
          </Router>
        </AppProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}

export default App;
