import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { UserSignupPage } from "@/pages/UserSignupPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { AddressListPage } from "@/pages/AddressListPage";
import { ProductListPage } from "@/pages/ProductListPage";
import { AddressPage } from "@/pages/AddressFormPage";
import { ProductFormPage } from "@/pages/ProductFormPage";
import { ProductDetailsPage } from "@/pages/ProductListPageV2/ProductDetailsPage";
import { CartPage } from "@/pages/CartPage";
import { OrderPage } from "@/pages/PayPage";
import { UserOrdersPage } from "@/pages/OrderListPage";
export function BaseRoutes() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<UserSignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product-detail/:id" element={<ProductDetailsPage />} />
        
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/:id" element={<CartPage />} />
        <Route path="/products" element={<ProductListPage />} />
        
        <Route path="/cart/merge/:id" element={<CartPage />} />

        {/* Protected Routes */}
        <Route element={<AuthenticatedRoutes />}>

          <Route path="/orders/escape" element={<OrderPage />} />
          <Route path="/orders/user/:id" element={<UserOrdersPage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/address/user/:id" element={<AddressListPage />} />
          
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/:id" element={<ProductFormPage />} />
        </Route>

      </Routes>
    </>
  );
}
