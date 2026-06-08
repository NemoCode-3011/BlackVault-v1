import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader } from 'lucide-react'

export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/role')
    }, 2000)
  }
  const [isSolo, setIsSolo] = useState(false)

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
            Classified Access
          </p>
          <h1 className="text-bv-ash text-4xl tracking-widest">
            Request Clearance
          </h1>
          <p className="text-bv-fog text-xs tracking-wide">
            Your role within Operation Kaval will be assigned upon entry.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-bv-fog text-[0.65rem] tracking-[0.3em] uppercase">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="As it appears on official records"
              value={formData.fullName}
              onChange={handleChange}
              className="bg-bv-vault border border-bv-dust text-bv-ash text-sm px-4 py-3 outline-none focus:border-bv-gold transition-colors duration-300 placeholder:text-bv-fog"
            />
          </div>

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
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
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

        </div>

        {/* Solo leveling toggle */}
        <div
          onClick={() => setIsSolo(!isSolo)}
          className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-4 h-4 border ${isSolo ? 'bg-bv-gold border-bv-gold' : 'border-bv-dust'} transition-colors duration-300`} />
          <p className="text-bv-fog text-xs tracking-wide group-hover:text-bv-ash transition-colors duration-300">
            I work alone. Activate Lone Wolf track.
          </p>
        </div>

        {/* Submit */}
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
          ) : 'Submit for Clearance'}
        </button>

        {/* Redirect */}
        <p className="text-center text-bv-fog text-xs">
          Already have clearance?{' '}
          <span
            onClick={() => navigate('/signin')}
            className="text-bv-gold cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>

      </motion.div>
    </div>
  )
}