import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardRecipes from "./pages/dashboard/DashboardRecipes";
import DashboardVideos from "./pages/dashboard/DashboardVideos";
import DashboardAnalytics from "./pages/dashboard/DashboardAnalytics";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-cream text-espresso dark:bg-char dark:text-cream">
      <Toaster position="top-center" toastOptions={{ style: { fontFamily: "Manrope, sans-serif" } }} />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["creator", "admin"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="recipes" element={<DashboardRecipes />} />
            <Route path="videos" element={<DashboardVideos />} />
            <Route path="analytics" element={<DashboardAnalytics />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
