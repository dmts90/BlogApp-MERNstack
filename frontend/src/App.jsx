import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import RegisterPage from "./components/registerPage/registerPage";
import BlogDetailLayout from "./layout/BlogDetailLayout";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./components/loginPage/loginPage";
import AdminLayout from "./layout/AdminLayout";
import AdminBlogDetail from "./components/admin/blogDetail/adminBlogDetail";
import AddBlog from "./components/admin/addBlog/addBlog";
import AdminUser from "./components/admin/user/adminUser";
import AdminBlog from "./components/admin/blog/adminBlog";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <MainLayout /> : <Navigate to="/login" />}
      />
      <Route
        path="/detay/:id"
        element={user ? <BlogDetailLayout /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!user ? <RegisterPage /> : <Navigate to="/" />}
      />
      <Route
        path="/admin"
        element={user ? <AdminLayout /> : <Navigate to="/login" />}
      />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/admin/user" element={<AdminUser />} />
      <Route path="/admin/blog" element={<AdminBlog />} />
      <Route path="/admin/blog/:id" element={<AdminBlogDetail />} />
      <Route path="/admin/blog/add" element={<AddBlog />} />
      <Route path="*" element={<MainLayout />} />
    </Routes>
  );
}

export default App;
