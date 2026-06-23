import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function CustodianLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')

    if (!email || !password) {
      setError('All fields are required.')
      return
    }

    setLoading(true)

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError || !data.user) {
      setError('Access denied.')
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_custodian')
      .eq('id', data.user.id)
      .single()

    if (!profile?.is_custodian) {
      setError('Access denied. This identity holds no custodial clearance.')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    sessionStorage.setItem('custodian_verified', 'true')
    navigate('/custodian')
  }

  return (
    <div className="min-h-screen bg-bv-void flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm flex flex-col gap-8"
      >

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-bv-blood text-xs tracking-[0.4em] uppercase">
            Custodial Access
          </p>
          <h1 className="text-bv-ash text-2xl tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
            The Custodian
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-bv-vault border border-bv-dust text-bv-ash text-sm px-4 py-3 outline-none focus:border-bv-gold transition-colors duration-300 placeholder:text-bv-fog"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Password"
            className="bg-bv-vault border border-bv-dust text-bv-ash text-sm px-4 py-3 outline-none focus:border-bv-gold transition-colors duration-300 placeholder:text-bv-fog"
          />
        </div>

        {error && (
          <p className="text-bv-blood text-[0.65rem] tracking-widest text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full border border-bv-blood text-bv-ash text-xs tracking-[0.4em] uppercase py-3 hover:bg-bv-blood/10 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader size={14} className="animate-spin" />
              Verifying...
            </>
          ) : 'Enter'}
        </button>

      </motion.div>
    </div>
  )
}