import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import AccountPage from "./pages/AccountPage";
import SingleProductPage from "./pages/SingleProductPage";
import AccountRegister from "./pages/AccountRegisterPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import CreateProductPage from "./pages/admin/Product/CreateProductPage";
import ProductPage from "./pages/admin/Product/ProductPage";
import OrderPage from "./pages/admin/Order/Orders";
import UpdateProductPage from "./pages/admin/Product/UpdateProductPage";
import Dashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./pages/Checkout";
import UserOrderPage from "./pages/user/UserOrderPage";
// import CategoryPage from "./pages/admin/Categories/CategoryPage";
// import UpdateCategoryPage from "./pages/admin/Categories/UpdateCategoryPage";
// import CreateCategoryPage from "./pages/admin/Categories/CreateCategoryPage";
import "./App.css";
import PublicRoute from "./components/PublicRoute";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/Contact" element={<ContactPage />} />
      <Route path="/product/:id" element={<SingleProductPage />} />

      <Route path="/" element={<PublicRoute />}>
        <Route path="/Account" element={<AccountPage />} />
        <Route path="/AccountRegister" element={<AccountRegister />} />
      </Route>

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<AdminUserPage />} />
        <Route path="/admin/products/create" element={<CreateProductPage />} />
        <Route path="/admin/products" element={<ProductPage />} />
        <Route path="/admin/orders" element={<OrderPage />} />
        <Route
          path="/admin/products/update/:id"
          element={<UpdateProductPage />}
        />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/user/orders" element={<UserOrderPage />} />
      </Route>

      {/* <Route path="/admin/categories" element={<CategoryPage/>}/>
      <Route path="/admin/categories/update/:id" element={<UpdateCategoryPage/>}/>
      <Route path="/admin/categories/create" element={<CreateCategoryPage/>} /> */}
    </Routes>
  );
}

export default App;
