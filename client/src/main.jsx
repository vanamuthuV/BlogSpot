import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { SearchProvider } from "./context/searchProvider.jsx";
import { SnackbarProvider } from "./context/snackProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider>
    <AuthProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </AuthProvider>
  </SnackbarProvider>
);
