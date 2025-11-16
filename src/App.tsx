import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

/**
 * App component sets up routing for the app
 */
function App() {
  return (
    <Router>
      {/* Navbar is always visible */}
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} /> {/* Home is protected */}
      </Routes>
    </Router>
  );
}

export default App;
