import { Box, CssBaseline, Snackbar, Alert } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [toastColor, setToastColor] = useState("#4caf50"); // Default to success green

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Box
      minHeight="100vh"
      sx={{
        backgroundColor: darkMode ? "#2a221c" : "#e3d4c9",
        color: darkMode ? "#e7decf" : "#3e352e",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <CssBaseline />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route
          path="/"
          element={<HomePage darkMode={darkMode} />}
        />
        <Route
          path="/create"
          element={
            <CreatePage
              darkMode={darkMode}
              setToastMessage={setToastMessage}
              setOpenToast={setOpenToast}
              setToastColor={setToastColor}
            />
          }
        />
      </Routes>

      {/* Centered Snackbar */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Centered position
      >
        <Alert
          severity={toastColor === "#4caf50" ? "success" : "error"}
          sx={{
            bgcolor: toastColor,
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
