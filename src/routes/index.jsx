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
  AIConfigurationModule,
  ScannerModule,
  SecurityModule,
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
            element: <DashboardModule />,
          },
          {
            path: "scanner",
            element: <ScannerModule />,
          },
          {
            path: "profile",
            element: <ProfileModule />,
          },
          {
            path: "security",
            element: <SecurityModule />,
          },
          {
            path: "config",
            element: <AIConfigurationModule />,
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
            element: <SignIn forceRedirectUrl="/dashboard" />,
          },
          {
            path: "register",
            element: <SignUp forceRedirectUrl="/dashboard" />,
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
