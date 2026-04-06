import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AnalysisPage from './pages/AnalysisPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ProfileViewer from './pages/ProfileViewer.jsx'
import {Toaster} from 'react-hot-toast';
export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-paper">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#111",
              borderRadius: "10px"
            }
          }}
        />
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path='/profile' element={<ProtectedRoute><ProfileViewer /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes — redirects to /login if not authenticated */}
          <Route
            path="/analyze"
            element={
              <ProtectedRoute>
                <AnalysisPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  )
}