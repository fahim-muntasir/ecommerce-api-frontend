import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout.jsx";
import App from "./App.jsx";
import "./index.css";
import CartProvider from "./context/CartProvider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        {/* <Layout> */}
          <App />
        {/* </Layout> */}
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
