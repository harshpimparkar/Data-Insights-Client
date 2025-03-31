import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AnalyzeCSV from "./pages/Analyze-CSV/AnalyzeCSV";
import { UserContextProvider } from "./context/AuthContext";


function App() {
  return (
    <>
      <UserContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/analyse-csv" element={<AnalyzeCSV />} />
          </Routes>
          
        </Router>
      </UserContextProvider>
    </>
  );
}

export default App;
