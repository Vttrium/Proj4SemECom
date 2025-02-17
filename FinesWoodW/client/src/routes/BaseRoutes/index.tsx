import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { UserSignupPage } from "@/pages/UserSignupPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { CategoryListPage } from "@/pages/CategoryListPage";
import { ProductListPage } from "@/pages/ProductListPage";
import { CategoryFormPage } from "@/pages/CategoryFormPage";
import { ProductFormPage } from "@/pages/ProductFormPage";
import { ProductListPageV2 } from "@/pages/ProductListPageV2";
import { ProductFormPageV2 } from "@/pages/ProductFormPageV2";
import { CartPage } from "@/pages/CartPage";

export function BaseRoutes() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<UserSignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />

        {/* Protected Routes */}
        <Route element={<AuthenticatedRoutes />}>
          <Route path="/cart" element={<CartPage />} />

          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/categories/new" element={<CategoryFormPage />} />
          <Route path="/categories/:id" element={<CategoryFormPage />} />
          
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/:id" element={<ProductFormPage />} />

          <Route path="/products-v2" element={<ProductListPageV2 />} />
          <Route path="/products-v2/new" element={<ProductFormPageV2 />} />
          <Route path="/products-v2/:id" element={<ProductFormPageV2 />} />
        </Route>

      </Routes>
    </>
  );
}
