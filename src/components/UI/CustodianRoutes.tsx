import { Navigate } from 'react-router-dom'

export default function CustodianRoute({ children }: { children: React.ReactNode }) {
  const verified = sessionStorage.getItem('custodian_verified') === 'true'

  if (!verified) {
    return <Navigate to="/custodian-login" replace />
  }

  return <>{children}</>
}