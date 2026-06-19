import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    setError('')

    if (!password || !confirmPassword) {
      setError('Both fields are required.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    })

    if (updateError) {
      setError('Something went wrong. Try again.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)

    setTimeout(() => {
      navigate('/signin')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-bv-void flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md flex flex-col gap-8"
      >

        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-bv-blood text-xs tracking-[0.4em] uppercase">
            Identity Verification
          </p>
          <h1 className="text-bv-ash text-4xl tracking-widest">
            New Passphrase
          </h1>
          <p className="text-bv-fog text-xs tracking-wide">
            Choose a new passphrase to regain access.
          </p>
        </div>

        {success ? (
          <p className="text-bv-olive text-xs tracking-[0.2em] text-center uppercase">
            ✓ Passphrase updated. Redirecting to sign in...
          </p>
        ) : (
          <>
            {/* Form */}
            <div className="flex flex-col gap-5">

              <div className="flex flex-col gap-2">
                <label className="text-bv-fog text-[0.65rem] tracking-[0.3em] uppercase">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full bg-bv-vault border border-bv-dust text-bv-ash text-sm px-4 py-3 outline-none focus:border-bv-gold transition-colors duration-300 placeholder:text-bv-fog"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-bv-fog hover:text-bv-ash transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-bv-fog text-[0.65rem] tracking-[0.3em] uppercase">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your passphrase"
                  className="w-full bg-bv-vault border border-bv-dust text-bv-ash text-sm px-4 py-3 outline-none focus:border-bv-gold transition-colors duration-300 placeholder:text-bv-fog"
                />
              </div>

            </div>

            {/* Error */}
            {error && (
              <p className="text-bv-blood text-[0.65rem] tracking-[0.2em] text-center">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full border border-bv-blood text-bv-ash text-xs tracking-[0.4em] uppercase py-3 hover:bg-bv-blood/10 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader size={14} className="animate-spin" />
                  Updating...
                </>
              ) : 'Update Passphrase'}
            </button>
          </>
        )}

      </motion.div>
    </div>
  )
}