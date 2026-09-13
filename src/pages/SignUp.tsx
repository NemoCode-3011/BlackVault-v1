import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader } from 'lucide-react'
import { supabase } from '../lib/supabase'

type Mode = 'choose' | 'email-form' | 'otp'
type AuthAction = 'signup' | 'signin'

export default function SignUp() {
  const isReturning = localStorage.getItem('bv_returning') === 'true'

  const [mode, setMode] = useState<Mode>('choose')
  const [action, setAction] = useState<AuthAction>(isReturning ? 'signin' : 'signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const handleOAuthLogin = async (provider: 'discord' | 'google') => {
    setError('')
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/role`,
      },
    })
  }

  const handleEmailSubmit = async () => {
    setError('')
    setNotice('')
    if (!email.trim() || !password) {
      setError('Email and password are required.')
      return
    }
    setLoading(true)

    if (action === 'signup') {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      })
      setLoading(false)

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      // If email confirmations are off, Supabase may already return a
      // session here. Otherwise, a code was emailed — collect it next.
      if (data.session) {
        window.location.href = '/role'
        return
      }
      setMode('otp')
      return
    }

    // action === 'signin'
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setLoading(false)

    if (signInError) {
      if (signInError.message.toLowerCase().includes('confirm')) {
        // Account exists but never finished the OTP step — resend and
        // send them there instead of dead-ending on an error message.
        await supabase.auth.resend({ type: 'signup', email: email.trim() })
        setNotice('Your email still needs verifying — we just sent a fresh code.')
        setMode('otp')
        return
      }
      setError(signInError.message)
      return
    }

    window.location.href = '/role'
  }

  const handleVerifyOtp = async () => {
    setError('')
    if (!otp.trim()) return
    setLoading(true)

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: otp.trim(),
      type: 'email',
    })

    setLoading(false)

    if (verifyError) {
      setError(verifyError.message)
      return
    }

    window.location.href = '/role'
  }

  const handleResendOtp = async () => {
    setError('')
    setNotice('')
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: email.trim(),
    })
    if (resendError) {
      setError(resendError.message)
      return
    }
    setNotice('A new code is on its way.')
  }

  return (
    <div className="min-h-screen bg-bv-void flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md flex flex-col gap-8 text-center"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-bv-blood text-xs tracking-[0.4em] uppercase">
            {isReturning ? 'Welcome Back' : 'Classified Access'}
          </p>
          <h1 className="text-bv-ash text-4xl tracking-widest">
            {isReturning ? 'Resume Access' : 'Request Clearance'}
          </h1>
          <p className="text-bv-fog text-xs tracking-wide">
            {mode === 'otp'
              ? `Enter the code sent to ${email}.`
              : isReturning
              ? 'Sign back in to continue where you left off.'
              : 'Your role within Operation Kaval will be assigned upon entry.'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'choose' && (
            <motion.div
              key="choose"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3"
            >
              <button
                onClick={() => handleOAuthLogin('google')}
                className="w-full border border-bv-blood text-bv-ash text-xs tracking-[0.4em] uppercase py-4 hover:bg-bv-blood/10 transition-colors duration-300 cursor-pointer flex items-center justify-center gap-3"
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.61 20.08H42V20H24v8h11.3c-1.65 4.66-6.08 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.85 1.15 7.96 3.04l5.66-5.66C34.46 6.05 29.5 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.65-.39-3.92z"/>
                  <path fill="#FF3D00" d="M6.3 14.69l6.57 4.82C14.6 15.9 18.9 13 24 13c3.06 0 5.85 1.15 7.96 3.04l5.66-5.66C34.46 6.05 29.5 4 24 4 16.32 4 9.68 8.34 6.3 14.69z"/>
                  <path fill="#4CAF50" d="M24 44c5.4 0 10.3-1.98 14.02-5.2l-6.47-5.47C29.5 34.94 26.9 36 24 36c-5.2 0-9.62-3.32-11.29-7.95l-6.53 5.03C9.62 39.55 16.28 44 24 44z"/>
                  <path fill="#1976D2" d="M43.61 20.08H42V20H24v8h11.3c-.79 2.23-2.24 4.15-4.11 5.55l6.47 5.47C39.99 36.87 44 31.1 44 24c0-1.34-.14-2.65-.39-3.92z"/>
                </svg>
                Continue with Google
              </button>

              <button
                onClick={() => handleOAuthLogin('discord')}
                className="w-full border border-bv-dust text-bv-ash text-xs tracking-[0.4em] uppercase py-4 hover:bg-bv-blood/10 transition-colors duration-300 cursor-pointer flex items-center justify-center gap-3"
              >
                <svg width="18" height="18" viewBox="0 0 127.14 96.36" fill="currentColor">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
                Continue with Discord
              </button>

              <div className="flex items-center gap-3 my-1">
                <div className="h-px flex-1 bg-bv-dust" />
                <p className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">or</p>
                <div className="h-px flex-1 bg-bv-dust" />
              </div>

              <button
                onClick={() => setMode('email-form')}
                className="w-full border border-bv-dust text-bv-fog text-xs tracking-[0.4em] uppercase py-4 hover:bg-bv-blood/10 hover:text-bv-ash transition-colors duration-300 cursor-pointer"
              >
                Continue with email
              </button>
            </motion.div>
          )}

          {mode === 'email-form' && (
            <motion.div
              key="email-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                autoFocus
                className="bg-bv-vault border border-bv-dust text-bv-ash text-sm px-4 py-3 outline-none focus:border-bv-gold transition-colors duration-300 placeholder:text-bv-fog"
              />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()}
                placeholder="Password"
                className="bg-bv-vault border border-bv-dust text-bv-ash text-sm px-4 py-3 outline-none focus:border-bv-gold transition-colors duration-300 placeholder:text-bv-fog"
              />

              {error && (
                <p className="text-bv-blood text-[0.65rem] tracking-widest">{error}</p>
              )}

              <button
                onClick={handleEmailSubmit}
                disabled={loading}
                className="w-full border border-bv-blood text-bv-ash text-xs tracking-[0.4em] uppercase py-4 hover:bg-bv-blood/10 transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <><Loader size={14} className="animate-spin" /> Please wait...</>
                ) : action === 'signup' ? 'Create account' : 'Sign in'}
              </button>

              <div className="flex items-center justify-between text-[0.65rem] tracking-[0.2em] uppercase">
                <button
                  onClick={() => { setMode('choose'); setError('') }}
                  className="text-bv-fog hover:text-bv-ash transition-colors duration-200 cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  onClick={() => { setAction(action === 'signup' ? 'signin' : 'signup'); setError('') }}
                  className="text-bv-fog hover:text-bv-ash transition-colors duration-200 cursor-pointer"
                >
                  {action === 'signup' ? 'Already have an account?' : 'Need an account?'}
                </button>
              </div>
            </motion.div>
          )}

          {mode === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleVerifyOtp()}
                placeholder="6-digit code"
                autoFocus
                className="bg-bv-vault border border-bv-dust text-bv-ash text-sm px-4 py-3 outline-none focus:border-bv-gold transition-colors duration-300 placeholder:text-bv-fog text-center tracking-[0.3em]"
              />

              {error && <p className="text-bv-blood text-[0.65rem] tracking-widest">{error}</p>}
              {notice && <p className="text-bv-fog text-[0.65rem] tracking-widest">{notice}</p>}

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full border border-bv-blood text-bv-ash text-xs tracking-[0.4em] uppercase py-4 hover:bg-bv-blood/10 transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <><Loader size={14} className="animate-spin" /> Verifying...</>
                ) : 'Verify'}
              </button>

              <button
                onClick={handleResendOtp}
                className="text-bv-fog text-[0.65rem] tracking-[0.2em] uppercase hover:text-bv-ash transition-colors duration-200 cursor-pointer"
              >
                Resend code
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}