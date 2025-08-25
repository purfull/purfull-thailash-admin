// import "./App.css";
import Login from "./pages/login/Login";
import Console from "./pages/dashboard/console";
import Dashboard from "./pages/dashboard/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TemplateMainPage from "./pages/dashboard/usertemplates/userTemplate";
import NewTemplate from "./pages/dashboard/new-template/NewTemplate";
import Settings from "./pages/dashboard/settings-page/Settings";
import Testimonial from "./pages/Testimonial/testimonial";
import Product from "./pages/dashboard/product/product";
import Customer from "./pages/dashboard/customer/customer";
import Billings from "./pages/dashboard/billings/billings";
import Order from "./pages/dashboard/order/order";
import ViewOrder from "./pages/dashboard/order/viewOrder";
import ViewBillings from "./pages/dashboard/billings/viewbillings";
import { Provider } from "react-redux";
import store from "./store/store";
import EditTestimonial from "./pages/Testimonial/EditTestimonial";
import EditProduct from "./pages/dashboard/product/editproduct";
import ViewCustomer from "./pages/dashboard/customer/viewCustomer";
// import Blogs from "./pages/dashboard/blogs/Blogs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const isLogin = localStorage.getItem("user")

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Console />
              </ProtectedRoute>}>
              <Route path="reports" element={<Dashboard />} />
              <Route path="new-template" element={<NewTemplate />} />
              <Route path="my-template" element={<TemplateMainPage />} />
              <Route path="settings" element={<Settings />} />
              <Route path="testimonial" element={<Testimonial />} />
              <Route path="order" element={<Order />} />
              <Route path="order/view/:id" element={<ViewOrder />} />
              {/* <Route path="blogs" element={<Blogs />} /> */}
              <Route
                path="edit-testimonial/:id"
                element={<EditTestimonial />}
              />
              <Route path="product" element={<Product />}></Route>
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route path="customer" element={<Customer />}></Route>
              <Route
                path="customer/view-customer/:id"
                element={<ViewCustomer />}
              />
              <Route path="billings" element={<Billings />}></Route>
              <Route path="billings/view-bill/:id" element={<ViewBillings />} />
            </Route>
            <Route path="/*" element={<Login />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      </Provider>
    </>
  );
}

export default App;
