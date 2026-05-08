import { createBrowserRouter, Navigate, RouteObject } from "react-router";

import { MainLayout } from "../app/App";
import MainPage from "../pages/MainPage";
import HelpPage from "../pages/HelpPage";
import SettingsSidebar from "../pages/SettingsPage";
import Error404Page from "../pages/Error404Page";
import LoginPage from "../pages/LoginPage";
import PublicProfilePage from "../pages/ProfilePage";

const routes = [
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: MainPage },
      { path: "help", Component: HelpPage },
      {
        path: "settings",
        Component: SettingsSidebar,
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", Component: PublicProfilePage },
        ],
      },
    ],
  },
  { path: "/login", Component: LoginPage },
  { path: "*", Component: Error404Page },
] satisfies RouteObject[];

export const router = createBrowserRouter(routes);
