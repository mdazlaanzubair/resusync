import { Navigate, createBrowserRouter } from "react-router-dom";

import { SignIn, SignUp } from "@clerk/clerk-react";
import AppRoot from "@/app";
import {
  AuthenticationModule,
  DashboardModule,
  HomePage,
  PageNotFound,
  ProtectedCoreAppLayout,
  ResumeModule,
  SettingsModule,
} from "@/app/modules";
import { ResumeBuilderPage, ResumeListPage } from "@/app/modules/resume/pages";
import {
  AIConfigPage,
  ProfilePage,
  SecurityPage,
} from "@/app/modules/settings/pages";

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
            path: "resumes",
            element: <ResumeModule />,
            children: [
              {
                index: true,
                element: <ResumeListPage />,
              },
              {
                path: "builder",
                element: <ResumeBuilderPage />,
              },
              {
                path: "builder/:resume_id",
                element: <ResumeBuilderPage />,
              },
            ],
          },
          {
            path: "settings",
            element: <SettingsModule />,
            children: [
              {
                index: true,
                element: <Navigate to="profile" replace />,
              },
              {
                path: "profile",
                element: <ProfilePage />,
              },
              {
                path: "security",
                element: <SecurityPage />,
              },
              {
                path: "config",
                element: <AIConfigPage />,
              },
              {
                path: "usage-history",
                element: <AIConfigPage />,
              },
              {
                path: "resume-score-reports",
                element: <AIConfigPage />,
              },
            ],
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
