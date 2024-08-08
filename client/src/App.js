import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import DonationPage from "scenes/donationPage";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              {/* Conditional Route for login page */}
              {isAuth ? (
                <Route path="/" element={<HomePage />} />
              ) : (
                <Route path="/" element={<LoginPage />} />
              )}

              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              />
              <Route
                path="/donate"
                element={isAuth ? <DonationPage /> : <Navigate to="/" />}
              />
            </Routes>
          </ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
