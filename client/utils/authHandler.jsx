import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Store token in localStorage
      localStorage.setItem("accessToken", token);

      // Redirect to your desired page after storing the token
      navigate("/");
    } else {
      // Handle errors or redirect to login page
      const error = params.get("error");
      if (error) {
        console.error("Authentication Error:", error);
      }
      navigate("/login");
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default GoogleAuthHandler;
