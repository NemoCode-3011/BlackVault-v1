import {  Routes, Route } from 'react-router-dom'
import Entrance from './pages/Entrance'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import RoleReveal from './pages/RoleReveal'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/role" element={<RoleReveal />} />
      </Routes>

  )
}

export default App