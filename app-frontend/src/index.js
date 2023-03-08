import React from "react";
import "./styles/index.scss";
import App from "./App";
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
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/introduce",
        element: <Introduce></Introduce>,
      },
      {
        path: "/service",
        element: <Service></Service>,
      },
      {
        path: "/booking",
        element: <Booking></Booking>,
      },
      {
        path: "/dishes",
        element: <Dishes></Dishes>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AppAdmin></AppAdmin>,
    children: [
      {
        path: "/admin",
        element: <HomePage></HomePage>,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
