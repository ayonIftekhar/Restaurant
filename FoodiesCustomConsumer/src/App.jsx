import { Route, Router, Routes } from "react-router-dom"
import { Menubar } from "./Components/Menubar/Menubar"
import Explore from "./pages/Explore/Explore"
import Home from "./pages/Home/Home"
import ContactUs from "./pages/ContactUs/ContactUs"
import FoodDetails from "./pages/FoodDetails/FoodDetails"
import Cart from './pages/Cart/Cart'
import OrderDetail from "./pages/OrderDetail/OrderDetail"
import LogIn from "./pages/LogIn/LogIn"
import Register from "./pages/Register/Register"
import { ToastContainer } from "react-toastify"
import OrderHistory from "./pages/OrderHistory/OrderHistory"
import OAuthSuccess from "./Components/OAuthSuccess/OAuthSuccess"
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Error from './pages/Error/Error'

function App() {
  
  return (
    <>
      <Menubar />

      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/explore" element={<Explore />}></Route>
        <Route
          path="/contact-us"
          element={
            <ProtectedRoute>
              <ContactUs />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/details/:id" element={<FoodDetails />}>
          {" "}
        </Route>
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/order-history"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/oauth-success/:token" element={<OAuthSuccess />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App
