import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

type NavBarProps = {
  isLoggedIn: boolean;
  userName?: string | null;
};

export default function NavBar({ isLoggedIn, userName }: NavBarProps) {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LEFT SIDE: Logos */}
      <div className="nav-left">
        <div className="logo-group">
          <img src="/react.png" alt="React" width={50} height={50} />
          <span className="operator">+</span>
          <img src="/go.png" alt="Go" width={40} height={40} />
          <span className="operator">=</span>
          <img src="/explode.png" alt="Explode" width={50} height={50} />
        </div>
      </div>

      {/* RIGHT SIDE: Auth buttons + Dark toggle + username */}
      <div className="nav-right">
        {isLoggedIn && userName && (
          <span className="username">Hello, {userName}</span>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}

        {isLoggedIn && (
          <button className="btn logout" onClick={logout}>
            Logout
          </button>
        )}

        <button className="btn" onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
