import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import { supabase } from '../lib/supabase'
import bvStamp from '../assets/blackvault-stamp.png'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [clearedCount, setClearedCount] = useState<number | null>(null)

  useEffect(() => {
    async function fetchCount() {
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })

      setClearedCount(count ?? 0)
    }

    fetchCount()
  }, [])

  const handleSubmit = async () => {
    setError('')

    if (!email || !email.includes('@')) {
      setError('Enter a valid email.')
      return
    }

    setLoading(true)

    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email, codename: 'pending' })

    if (insertError) {
      if (insertError.code === '23505') {
        setError('Already cleared. You are on the list.')
      } else {
        setError('Something went wrong. Try again.')
      }
      setLoading(false)
      return
    }

    setSubmitted(true)
    setLoading(false)
    setClearedCount(prev => (prev !== null ? prev + 1 : 1))
  }

  return (
    <div className="min-h-screen bg-bv-void flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl border border-bv-dust grid grid-cols-1 md:grid-cols-2 overflow-hidden"
        style={{ backgroundColor: '#15130F' }}
      >

        {/* Left side */}
        <div className="flex flex-col gap-8 p-8 md:p-12 justify-center">

          <div className="flex items-center gap-2">
            <img src={bvStamp} alt="" className="w-7 h-7 opacity-80" />
            <p className="text-bv-fog text-[0.6rem] tracking-[0.4em] uppercase">
              BlackVault
            </p>
          </div>

          <div className="inline-flex self-start border border-bv-blood px-3 py-1.5">
            <p className="text-bv-blood text-[0.6rem] tracking-[0.25em] uppercase">
              Status: Sealed
            </p>
          </div>

          <h1
            className="text-bv-ash text-3xl md:text-4xl tracking-wide leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The vault is not yet open.
          </h1>

          <div className="flex flex-col gap-3">
            <p className="text-bv-fog text-sm leading-relaxed">
              Operation KAVAL has documents waiting. Most of them are still locked.
            </p>
            <p className="text-bv-fog text-sm leading-relaxed">
              Leave your contact below and you'll be among the first granted clearance when access opens.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col gap-2 border-t border-bv-dust pt-6">
              <p className="text-bv-olive text-xs tracking-[0.2em] uppercase">
                ✓ Clearance request received
              </p>
              <p className="text-bv-fog text-xs leading-relaxed">
                You'll be notified the moment the vault opens.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="secure channel only"
                  className="bg-bv-vault border border-bv-dust text-bv-ash text-sm px-4 py-3 outline-none focus:border-bv-gold transition-colors duration-300 placeholder:text-bv-fog"
                />
              </div>

              {error && (
                <p className="text-bv-blood text-[0.65rem] tracking-widest">
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
                    Submitting...
                  </>
                ) : 'Request Clearance'}
              </button>
            </div>
          )}

          {clearedCount !== null && (
            <p className="text-bv-fog text-[0.6rem] tracking-[0.2em] uppercase opacity-60">
              {clearedCount} cleared. You are not yet among them.
            </p>
          )}

        </div>

        {/* Right side */}
        <div
          className="relative flex items-center justify-center p-12 border-t md:border-t-0 md:border-l border-bv-dust"
          style={{ backgroundColor: '#0E0C0A' }}
        >
          <img
            src={bvStamp}
            alt=""
            className="w-64 md:w-80"
            style={{
              opacity: 0.18,
              transform: 'rotate(-8deg)',
              filter: 'grayscale(100%)',
            }}
          />
          <p
            className="absolute bottom-8 left-8 right-8 text-bv-fog text-[0.6rem] tracking-[0.2em] text-center opacity-40"
            style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem' }}
          >
            "Whatever they built, I have lived inside it long enough that it has become mine by occupation."
          </p>
        </div>

      </motion.div>
    </div>
  )
}