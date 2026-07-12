
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import Home from "./pages/Home"
import Semester from "./pages/semesterPage";
import SubjectPage from "./pages/SubjectPage";
import CGPAPage from "./pages/CGPAPage";
import DashboardPage from "./pages/DashboardPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

import { BrowserRouter, Routes, Route, } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-bg-light text-primary-text font-sans antialiased flex flex-col justify-between">
            <Navbar />
            <MobileNav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/semester/:id" element={<Semester />} />
              <Route path="/semester/:id/:subject" element={<SubjectPage />} />
              <Route path="/cgpa" element={<CGPAPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
export default App;