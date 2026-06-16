import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader } from 'lucide-react'

export default function SignIn() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/archive')
    }, 2000)
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setMessage('Enter your email address first.')
      return
    }
    setMessage('If that email exists in our system, a reset link has been sent.')
  }

  return (
    <div className="min-h-screen bg-bv-void flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-bv-blood text-xs tracking-[0.4em] uppercase">
            Restricted Access
          </p>
          <h1 className="text-bv-ash text-4xl tracking-widest">
            Identify Yourself
          </h1>
          <p className="text-bv-fog text-xs tracking-wide">
            Authorised agents only.
          </p>
        </div>
        {/* Form */}
        <div className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-bv-fog text-[0.65rem] tracking-[0.3em] uppercase">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Secure channel only"
              value={formData.email}
              onChange={handleChange}
              className="bg-bv-vault border border-bv-dust text-bv-ash text-sm px-4 py-3 outline-none focus:border-bv-gold transition-colors duration-300 placeholder:text-bv-fog"
            />
          </div>
          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-bv-fog text-[0.65rem] tracking-[0.3em] uppercase">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your passphrase"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-bv-vault border border-bv-dust text-bv-ash text-sm px-4 py-3 outline-none focus:border-bv-gold transition-colors duration-300 placeholder:text-bv-fog"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-bv-fog hover:text-bv-ash transition-colors duration-300">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </span>
            </div>
          </div>
        </div>
        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full border border-bv-blood text-bv-ash text-xs tracking-[0.4em] uppercase py-3 hover:bg-bv-blood/10 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">
          {loading ? (
            <>
              <Loader size={14} className="animate-spin" />
              Verifying...
            </>
          ) : 'Enter the Vault'}
        </button>
        {/* Redirect */}
        <p className="text-center text-bv-fog text-xs">
          No clearance yet?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-bv-gold cursor-pointer hover:underline">
            Request Access
          </span>
        </p>
        <button
          onClick={handleForgotPassword}
          className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase hover:text-bv-ash transition-colors duration-200 cursor-pointer self-center mt-2"
        >
          Forgot password?
        </button>
        {message && (
          <p className="text-bv-olive text-[0.65rem] tracking-[0.2em] text-center mt-2">
            {message}
          </p>
        )}
      </motion.div>
    </div>
  )
}