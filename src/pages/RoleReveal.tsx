import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const roleDescriptions: Record<string, string> = {
  'Intelligence Officer': 'Dates. Names. Locations. Connections. While everyone else searches for answers, you build the map.',
  'Mole': "Sometimes a file appears in your inbox that nobody else received. Don't ask why. Use it before it disappears.",
  'Cryptanalyst': "You notice patterns others don't see. Encoded messages rarely stay hidden from you for long.",
  'Spotter': 'The details everyone misses have a habit of finding you.',
  'Defector': 'Messages arrive from VEIL. Some tell the truth. Some are designed to mislead you. The difference matters more than you think.',
}

export default function RoleReveal() {
  const navigate = useNavigate()
  const location = useLocation()
  const [revealed, setRevealed] = useState(false)
  const [loading, setLoading] = useState(true)

  const { codename, role, solo } = location.state || {}

  useEffect(() => {
    if (!codename || !role) {
      navigate('/signup')
      return
    }

    async function saveProfile() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { error } = await supabase
        .from('profiles')
        .update({ codename, role, solo })
        .eq('id', session.user.id)

      if (error) {
        console.error('Failed to save profile:', error)
      }
    }

    saveProfile()

    const loadTimer = setTimeout(() => setLoading(false), 2500)
    const revealTimer = setTimeout(() => setRevealed(true), 2600)

    return () => {
      clearTimeout(loadTimer)
      clearTimeout(revealTimer)
    }
  }, [codename, role, solo, navigate])

  return (
    <div className="min-h-screen bg-bv-void flex items-center justify-center px-6 relative">
      <AnimatePresence>
        {loading && (
          <motion.p
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="text-bv-fog text-xs tracking-[0.4em] uppercase absolute"
          >
            Accessing personnel files...
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-md flex flex-col gap-8 border border-bv-dust bg-bv-vault p-10"
          >

            {/* Top label */}
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-bv-blood text-[0.65rem] tracking-[0.4em] uppercase">
                Clearance Granted
              </p>
              <p className="text-bv-fog text-xs tracking-wide">
                Your identity within Operation Kaval has been assigned.
              </p>
            </div>

            {/* Codename */}
            <div className="flex flex-col items-center gap-2 text-center border-y border-bv-dust py-6">
              <p className="text-bv-fog text-[0.65rem] tracking-[0.4em] uppercase">
                Your Codename
              </p>
              <h1 className="text-bv-gold text-4xl tracking-widest">
                {codename}
              </h1>
            </div>

            {/* Role */}
            <div className="flex flex-col gap-3">
              <p className="text-bv-fog text-[0.65rem] tracking-[0.4em] uppercase">
                Role
              </p>
              <p className="text-bv-ash text-xl tracking-wide">
                {role}
              </p>
              <p className="text-bv-fog text-xs leading-relaxed">
                {roleDescriptions[role]}
              </p>
            </div>

            {/* Solo status */}
            {solo && (
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-bv-gold border-bv-gold border" />
                <p className="text-bv-fog text-xs tracking-wide">
                  Lone Wolf track activated.
                </p>
              </div>
            )}

            {/* Proceed button */}
            <button
              onClick={() => navigate('/signin')}
              className="w-full border border-bv-blood text-bv-ash text-xs tracking-[0.4em] uppercase py-3 hover:bg-bv-blood/10 transition-colors duration-300 cursor-pointer"
            >
              Proceed to Sign In
            </button>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}