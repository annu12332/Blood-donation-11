import { createBrowserRouter } from "react-router";
import Root from "../src/root-layout/Root";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import DashboardLayout from "../src/layouts/DashboardLayout";
import DashboardHome from "../src/layouts/DashboardHome";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "./AdminRoute"; 
import Profile from "../src/pages/Profile";
import MyDonationRequests from "../src/components/dashboard/MyDonationRequests";
import CreateDonationRequest from "../src/components/dashboard/CreateDonationRequest";
import EditDonationRequest from "../src/components/dashboard/EditDonationRequest";
import AllUsers from "../src/pages/AllUsers";
import ContentManagement from "../src/pages/ContentManagement";
import AddBlog from "../src/pages/AddBlog";
import Search from "../src/pages/Search";
import DonationDetails from "../src/pages/DonationDetails";
import DonationRequests from "../src/pages/DonationRequest";
import AdminHome from "../src/pages/AdminHome";
import Blog from "../src/pages/Blog";
import AllDonationRequests from "../src/pages/AllDonatonRequest";

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
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/donation-requests",
        element: <DonationRequests />,
      },
      {
        path: "donation-details/:id",
        element: <DonationDetails />,
      },
      {
        path: "/blog",
        element: <Blog/>
      }
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
      {
        path: "all-users",
        
        element: <AdminRoute><AllUsers /></AdminRoute>, 
      },
      {
        path: "content-management",
        element: <ContentManagement />,
      },
      {
        path: "content-management/add-blog",
        element: <AddBlog />,
      },
      {
            path: "all-blood-donation-request", 
            element: <AllDonationRequests /> 
        },
      
    ],
  },
]);

export default router;