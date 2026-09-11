import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './components/common/AuthProvider'
import { Navbar } from './components/common/Navbar'
import { ProtectedRoute, RoleRoute } from './components/common/ProtectedRoute'
import { HomePage } from './pages/Home'
import { LoginPage } from './pages/auth/Login'
import { RegisterPage } from './pages/auth/Register'
import { CourtDetailPage } from './pages/user/CourtDetail'
import { ProfilePage } from './pages/Profile'
import { MatchesPage } from './pages/user/Matches'
import { AdminUsersPage } from './pages/admin/AdminUsers'
import { AdminOwnersPage } from './pages/admin/AdminOwners'
import { AdminDashboardPage } from './pages/admin/AdminDashboard'
import { OwnerCourtsPage } from './pages/owner/OwnerCourts'
import { OwnerBookingsPage } from './pages/owner/OwnerBookings'
import { OwnerDashboardPage } from './pages/owner/OwnerDashboard'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/courts/:id"
              element={<CourtDetailPage />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/matches"
              element={
                <ProtectedRoute>
                  <MatchesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={['admin']}>
                    <AdminUsersPage />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/owners"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={['admin']}>
                    <AdminOwnersPage />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={['admin']}>
                    <AdminDashboardPage />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner/courts"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={['owner', 'admin']}>
                    <OwnerCourtsPage />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner/bookings"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={['owner', 'admin']}>
                    <OwnerBookingsPage />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner/dashboard"
              element={
                <ProtectedRoute>
                  <RoleRoute roles={['owner', 'admin']}>
                    <OwnerDashboardPage />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                <div className="flex min-h-[70vh] flex-col items-center justify-center">
                  <h1 className="text-6xl font-bold text-gray-300">404</h1>
                  <p className="mt-2 text-gray-500">Page not found.</p>
                  <Link to="/" className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-700">
                    Go home
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}