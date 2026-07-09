import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/signup')
  }, [navigate])

  return null
}