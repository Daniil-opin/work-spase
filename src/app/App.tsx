import HeaderComponent from "../components/header/index";
import Error404Page from "../pages/Error404Page/index";
import MainPage from "../pages/MainPage/index";
import LoginPage from "../pages/LoginPage/index";
import HelpPage from "../pages/HelpPage/index";

import ReservationPage from "../pages/ReservationPage/index";
import FavouritesPage from "../pages/FavouritesPage";
import SettingsSidebar from "../pages/SettingsPage/index";
import PublicProfilePage from "../pages/ProfilePage/index";
import { Outlet, RouterProvider } from "react-router";
import { router } from "../constants/routes";

export function MainLayout() {
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
