import { createBrowserRouter } from "react-router";
import Root from "../src/root-layout/Root";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import DashboardLayout from "../src/layouts/DashboardLayout";
import DashboardHome from "../src/layouts/DashboardHome";
import PrivateRoute from "../routes/PrivateRoute"; 
import Profile from "../src/pages/Profile";

let router = createBrowserRouter([
  
  {
    path: "/",
    element: <Root></Root>,
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
        element: <Profile/>,
      },
      
    ],
  },
]);

export default router;