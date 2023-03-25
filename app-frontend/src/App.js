import "./styles/index.scss";
import "./styles/__reset.scss";

import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { useDispatch } from "react-redux";
import { createCart } from "store/cart/cartSlice";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/customer/HomePage";
import Contact from "./pages/customer/Contact";
import Introduce from "./pages/customer/Introduce";
import Service from "./pages/customer/Service";
import Booking from "./pages/customer/Booking";
import Dishes from "./pages/customer/Dishes";
import AppAdmin from "./pages/admin/AppAdmin";
import AreaAdmin from "pages/admin/Area/AreaAdmin";
import RoomAdmin from "pages/admin/Room/RoomAdmin";
import TableAdmin from "pages/admin/Table/TableAdmin";
import AreaEditAdmin from "pages/admin/Area/AreaEditAdmin";
import RoomEditAdmin from "pages/admin/Room/RoomEditAdmin";
import { Provider } from "react-redux";
import store from "store/index";
import { SnackbarProvider } from "notistack";
import Orders from "pages/customer/Orders";
import AppCustomer from "pages/customer/AppCustomer";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppCustomer></AppCustomer>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "orders",
        element: <Orders></Orders>,
      },
      {
        path: "dishes",
        element: <Dishes></Dishes>,
      },
      {
        path: "booking",
        element: <Booking></Booking>,
      },
      {
        path: "introduce",
        element: <Introduce></Introduce>,
      },
      {
        path: "service",
        element: <Service></Service>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AppAdmin></AppAdmin>,
    children: [
      {
        path: "",
        element: <HomePage></HomePage>,
      },
      {
        path: "area",
        element: <AreaAdmin></AreaAdmin>,
      },
      {
        path: "area/:areaId",
        element: <AreaEditAdmin></AreaEditAdmin>,
      },
      {
        path: "room",
        element: <RoomAdmin></RoomAdmin>,
      },
      {
        path: "room/:roomId",
        element: <RoomEditAdmin></RoomEditAdmin>,
      },
      {
        path: "/admin/table",
        element: <TableAdmin></TableAdmin>,
      },
    ],
  },
]);

// const AppWithProvieders = () => {
//   return (
//     <Provider store={store}>
//       <SnackbarProvider autoHideDuration={4000} />
//       <RouterProvider router={router}></RouterProvider>
//     </Provider>
//   );
// };

const App = (props) => {
  return (
    <Provider store={store}>
      <SnackbarProvider autoHideDuration={4000} />
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
};

App.propTypes = {};

export default App;
