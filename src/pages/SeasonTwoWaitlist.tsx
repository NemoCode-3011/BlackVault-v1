import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import { supabase } from '../lib/supabase'
import bvStamp from '../assets/blackvault-stamp.png'

export default function SeasonTwoWaitlist() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setError('')

    if (!email || !email.includes('@')) {
      setError('Enter a valid email.')
      return
    }

    setLoading(true)

    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email, codename: 'season-2' })

    if (insertError) {
      if (insertError.code === '23505') {
        setError('Already noted. You will be reached.')
      } else {
        setError('Something went wrong. Try again.')
      }
      setLoading(false)
      return
    }

    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bv-void flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="w-full max-w-md flex flex-col gap-8 text-center items-center"
      >
        <img src={bvStamp} alt="" className="w-12 h-12 opacity-50" style={{ filter: 'grayscale(100%)' }} />

        {submitted ? (
          <div className="flex flex-col gap-3">
            <p className="text-bv-ash text-sm leading-relaxed">
              Noted.
            </p>
            <p className="text-bv-fog text-xs leading-relaxed">
              If this is real — and we believe it is — you will hear from us before anyone else does.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <p className="text-bv-ash text-sm leading-relaxed">
                What you found here was not supposed to be findable.
              </p>
              <p className="text-bv-fog text-sm leading-relaxed">
                We don't know what happens next. CORMORANT didn't finish his message. We are still trying to find out who he meant.
              </p>
              <p className="text-bv-fog text-sm leading-relaxed">
                If you want to know when we find out, leave a way to reach you.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="secure channel only"
                className="bg-bv-vault border border-bv-dust text-bv-ash text-sm px-4 py-3 outline-none focus:border-bv-gold transition-colors duration-300 placeholder:text-bv-fog text-center"
              />

              {error && (
                <p className="text-bv-blood text-[0.65rem] tracking-[0.1em]">
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
                ) : 'Leave a way to reach you'}
              </button>
            </div>
          </>
        )}

      </motion.div>
    </div>
  )
}