import { Routes, Route } from 'react-router-dom'
import Entrance from './pages/Entrance'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import RoleReveal from './pages/RoleReveal'
import Custodian from './pages/admin/Custodian'
import Archive from './pages/Archive'
import Meridian from './pages/Meridian'
import ResetPassword from './pages/ResetPassword'
import ProtectedRoute from './components/UI/ProtectedRoutes'
import Waitlist from './pages/Waitlist'
import CustodianLogin from './pages/admin/CustodianLogin'
import CustodianRoute from './components/UI/CustodianRoutes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Entrance />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/role" element={<RoleReveal />} />
      <Route path="/meridian" element={<Meridian />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/waitlist" element={<Waitlist />} />

      {/* Archive with Protected Route */}
      <Route path="/archive" element={<ProtectedRoute><Archive /></ProtectedRoute>} />
      {/* admin */}
      <Route path="/custodian-login" element={<CustodianLogin />} />
      <Route path="/custodian" element={<CustodianRoute><Custodian /></CustodianRoute>}/>
    </Routes >

  )
}

export default App