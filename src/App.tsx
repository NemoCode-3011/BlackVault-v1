import {  Routes, Route } from 'react-router-dom'
import Entrance from './pages/Entrance'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import RoleReveal from './pages/RoleReveal'
import Custodian from './pages/admin/Custodian'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/role" element={<RoleReveal />} />

        {/* admin */}
        <Route path="/custodian" element={<Custodian />} />
      </Routes>

  )
}

export default App