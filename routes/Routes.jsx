import { createBrowserRouter } from "react-router";
import Root from "../src/root-layout/Root";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import DashboardLayout from "../src/layouts/DashboardLayout";
import DashboardHome from "../src/layouts/DashboardHome"; 
import PrivateRoute from "../routes/PrivateRoute";
import Profile from "../src/pages/Profile";
import MyDonationRequests from "../src/components/dashboard/MyDonationRequests";
import CreateDonationRequest from "../src/components/dashboard/CreateDonationRequest";
import EditDonationRequest from "../src/components/dashboard/EditDonationRequest";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "create-donation-request", 
        element: <CreateDonationRequest />,
      },
      {
        path: "edit-request/:id",
        element: <EditDonationRequest />,
      },
    ],
  },
]);

export default router;