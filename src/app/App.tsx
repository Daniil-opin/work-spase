import { Routes, Route, Outlet } from "react-router-dom";

import HeaderComponent from "../components/header/index";
import Error404Page from "../pages/Error404Page/index";
import MainPage from "../pages/MainPage/index";
import LoginPage from "../pages/LoginPage/index";

function MainLayout() {
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/booking" element={<BookingPage />} /> */}
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default App;
