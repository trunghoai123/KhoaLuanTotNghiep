import "./styles/index.scss";
import "./styles/__reset.scss";

import React, { useState } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/customer/HomePage";
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
import { AuthContext, AuthProvider } from "utils/context/AuthContext";
import NotFound from "components/NotFound/NotFound";
import { FormStateProvider } from "utils/context/FormStateContext";
import OrderAdmin from "pages/admin/Order/OrderAdmin";
const App = (props) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <FormStateProvider>
          <SnackbarProvider autoHideDuration={4000} />
          <RouterProvider router={router}></RouterProvider>
        </FormStateProvider>
      </AuthProvider>
    </Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppCustomer></AppCustomer>,
    errorElement: <NotFound></NotFound>,
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
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "",
        element: <HomePage></HomePage>,
        errorElement: <NotFound></NotFound>,
      },
      {
        path: "area/update",
        element: <AreaAdmin></AreaAdmin>,
      },
      // {
      //   path: "area/update",
      //   element: <AreaEditAdmin></AreaEditAdmin>,
      // },
      {
        path: "room/update",
        element: <RoomAdmin></RoomAdmin>,
      },
      {
        path: "order/update",
        element: <OrderAdmin></OrderAdmin>,
      },
      // {
      //   path: "room/:roomId",
      //   element: <RoomEditAdmin></RoomEditAdmin>,
      // },
      {
        path: "table",
        element: <TableAdmin></TableAdmin>,
      },
      {
        path: "booking",
        element: <Dishes></Dishes>,
      },
    ],
  },
]);

App.propTypes = {};

export default App;
