import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import { useAuthentication } from "./auth";
import RedirectGoogleAuth from "./components/GoogleRedirectHandler";
import BookDetails from "./components/BookDetails";
import SearchBooks from "./components/SearchBooks"; // Страница для поиска книг
import Dashboard from "./components/Dashboard"
function App() {
  const { isAuthorized } = useAuthentication();

  // Защищенные маршруты для логина и регистрации
  const ProtectedLogin = () => {
    return isAuthorized ? <Navigate to="/" /> : <AuthPage initialMethod="login" />;
  };
  const ProtectedRegister = () => {
    return isAuthorized ? <Navigate to="/" /> : <AuthPage initialMethod="register" />;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login/callback" element={<RedirectGoogleAuth />} />
        <Route path="/login" element={<ProtectedLogin />} />
        <Route path="/register" element={<ProtectedRegister />} />
        <Route path="/dashboard" element={isAuthorized ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchBooks />} /> {/* Страница поиска */}
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="*" element={<NotFound />} /> {/* Страница 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
