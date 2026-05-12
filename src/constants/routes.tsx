import { createBrowserRouter, Navigate, RouteObject } from "react-router";

import { MainLayout } from "../app/App";
import MainPage from "../pages/MainPage";
import HelpPage from "../pages/HelpPage";
import SettingsSidebar from "../pages/SettingsPage";
import Error404Page from "../pages/Error404Page";
import LoginPage from "../pages/LoginPage";
import PublicProfilePage from "../pages/ProfilePage";
import ReservationPage from "../pages/ReservationPage/index";
import FavouritesPage from "../pages/FavouritesPage";
import TopicPage from "../pages/TopicPage";
import NotificationPage from "../pages/NotificationPage";
import PrivacyPage from "../pages/PrivacyPage";
import HistoryPage from "../pages/HistoryPage";
import ResourcesPage from "../pages/MapPage";
import EmailPage from "../pages/EmailPage";

const routes = [
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: MainPage },
      { path: "help", Component: HelpPage },
      { path: "favourites", Component: FavouritesPage },
      { path: "reservations", Component: ReservationPage },
      {
        path: "settings",
        Component: SettingsSidebar,
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", Component: PublicProfilePage },
          { path: "topic", Component: TopicPage },
          { path: "notifications", Component: NotificationPage },
          { path: "privacy", Component: PrivacyPage },
          { path: "history", Component: HistoryPage },
          { path: "email", Component: EmailPage },
        ],
      },
      { path: "map", Component: ResourcesPage },
    ],
  },
  { path: "/login", Component: LoginPage },
  { path: "*", Component: Error404Page },
] satisfies RouteObject[];

export const router = createBrowserRouter(routes);
