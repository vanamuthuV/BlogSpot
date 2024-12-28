import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Create the Snackbar context
const SnackbarContext = createContext();

// Custom hook to use the Snackbar context
export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      "useSnackbarContext must be used within a SnackbarProvider"
    );
  }
  return context;
};

// SnackbarProvider component
export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // Default severity is success
    duration: 3000, // Default auto-hide duration
  });

  // Function to show the snackbar
  const showSnackbar = (message, isSuccess = true) => {
    setSnackbar({
      open: true,
      message,
      severity: isSuccess ? "success" : "error",
      duration: 3000,
    });
  };

  // Function to hide the snackbar
  const hideSnackbar = (_, reason) => {
    if (reason !== "clickaway") {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.duration}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // Customize position
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
