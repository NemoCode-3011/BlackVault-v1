import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

// Re-checks the real Supabase session + profiles.is_custodian on every
// mount. The old version only checked a sessionStorage flag that anyone
// could set from devtools (`sessionStorage.setItem('custodian_verified','true')`)
// with nothing behind it — this closes that gap.
export default function CustodianRoute({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<'checking' | 'ok' | 'denied'>('checking')

  useEffect(() => {
    let cancelled = false

    async function check() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        if (!cancelled) setStatus('denied')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('is_custodian')
        .eq('id', session.user.id)
        .single()

      if (cancelled) return
      setStatus(!error && data?.is_custodian ? 'ok' : 'denied')
    }

    check()
    return () => { cancelled = true }
  }, [])

  if (status === 'checking') return null
  if (status === 'denied') return <Navigate to="/custodian-login" replace />
  return <>{children}</>
}