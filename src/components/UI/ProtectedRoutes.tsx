// full replacement:
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<'checking' | 'ok' | 'no-session' | 'maintenance'>('checking')
  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setStatus('no-session')
        return
      }

      const { data } = await supabase
        .from('app_settings')
        .select('maintenance_mode')
        .eq('id', 1)
        .single()

      setStatus(data?.maintenance_mode ? 'maintenance' : 'ok')
    }
    check()
    const interval = setInterval(check, 15000)
    return () => clearInterval(interval)
  }, [])

  if (status === 'checking') return null
  if (status === 'no-session') return <Navigate to="/signup" replace />
  if (status === 'maintenance') {
    return (
      <div className="min-h-screen bg-bv-void flex items-center justify-center px-6 text-center">
        <p className="text-bv-fog text-xs tracking-[0.3em] uppercase">
          The vault is temporarily sealed. Check back soon.
        </p>
      </div>
    )
  }
  return <>{children}</>
}