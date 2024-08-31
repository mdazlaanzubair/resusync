import { Navigate, createBrowserRouter } from "react-router-dom";

import { SignIn, SignUp } from "@clerk/clerk-react";
import AppRoot from "@/app";
import {
  AuthenticationModule,
  DashboardModule,
  ProfileModule,
  HomePage,
  PageNotFound,
  ProtectedCoreAppLayout,
} from "@/app/modules";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "",
        element: <ProtectedCoreAppLayout />,
        children: [
          {
            path: "dashboard",
            element: <DashboardModule path="/dashboard" />,
          },
          {
            path: "profile",
            element: <ProfileModule path="/dashboard" />,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthenticationModule />,
        children: [
          {
            index: true,
            element: <Navigate to="login" replace />,
          },
          {
            path: "login",
            element: <SignIn signUpUrl="register" routing="/dashboard" />,
          },
          {
            path: "register",
            element: <SignUp signInUrl="login" routing="/dashboard" />,
          },
        ],
      },
    ],
  },
  // HANDLING ALL NON EXISTING ROUTE
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
