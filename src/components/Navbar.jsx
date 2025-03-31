import { useAuth } from "../context/UseAuth";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Components.css";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // Client-side only logout implementation
  const handleLogout = () => {
    try {
      // Clear all authentication data
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");

      // Remove the JWT cookie that's used in axios interceptors
      Cookies.remove("jwt");

      // Add additional cookie removal with path and domain if needed
      // Some cookies may require specific path/domain to be properly removed
      Cookies.remove("jwt", { path: "/" });
      alert("Logout successful");
      console.log("Logout successful");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="nav-container">
      <div className="nav-hero">
        <div className="nav-logo">
          <img
            src="https://img.icons8.com/?size=160&id=eNxkAvdW2BDa&format=png"
            alt="DataGram logo"
          />
        </div>
        <div className="nav-name">DataGram</div>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        {user ? <Link to="/analyse-csv">Insights</Link> : null}
        <Link to="/about">About</Link>
      </div>

      <div className="auth-buttons">
        {user ? (
          <>
            <p className="user-name">{user.name ? `${user.name.split(" ")[0]}` : "User"}</p>
            <p onClick={handleLogout} className="Logout">
              Logout
            </p>
          </>
        ) : (
          <>
            <Link to="/login" className="login">
              Login
            </Link>
            <Link to="/signup" className="signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
