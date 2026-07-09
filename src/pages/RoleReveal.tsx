import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const firstWords = ['Rusty', 'Pale', 'Hollow', 'Burnt', 'Stray', 'Broken', 'Silent', 'Faded', 'Cold', 'Cracked', 'Dim', 'Worn', 'Lost', 'Odd', 'Bare', 'Dusty', 'Slack', 'Grey', 'Blunt', 'Tangled']
const secondWords = ['Owl', 'Fox', 'Sparrow', 'Sage', 'Echo', 'Raven', 'Moth', 'Pike', 'Finch', 'Wren', 'Hound', 'Lark', 'Crane', 'Veil', 'Gate', 'Drift', 'Shade', 'Flint', 'Reed', 'Thorn']
const roles = ['Intelligence Officer', 'Mole', 'Cryptanalyst', 'Spotter', 'Defector']

function generateCodename() {
  const first = firstWords[Math.floor(Math.random() * firstWords.length)]
  const second = secondWords[Math.floor(Math.random() * secondWords.length)]
  return `${first} ${second}`
}

function assignRole() {
  return roles[Math.floor(Math.random() * roles.length)]
}

const roleDescriptions: Record<string, string> = {
  'Intelligence Officer': 'Dates. Names. Locations. Connections. While everyone else searches for answers, you build the map.',
  'Mole': "Sometimes a file appears in your inbox that nobody else received. Don't ask why. Use it before it disappears.",
  'Cryptanalyst': "You notice patterns others don't see. Encoded messages rarely stay hidden from you for long.",
  'Spotter': 'The details everyone misses have a habit of finding you.',
  'Defector': 'Messages arrive from VEIL. Some tell the truth. Some are designed to mislead you. The difference matters more than you think.',
}

export default function RoleReveal() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'checking' | 'name' | 'loading' | 'revealed'>('checking')
  const [nameInput, setNameInput] = useState('')
  const [codename, setCodename] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        navigate('/signup')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('codename, role, full_name')
        .eq('id', session.user.id)
        .maybeSingle()

      if (profile?.codename && profile?.role) {
        navigate('/archive')
        return
      }

      if (!profile?.full_name) {
        setStep('name')
        return
      }

      await assignAndReveal()
    }

    init()
  }, [navigate])

  const assignAndReveal = async () => {
    setStep('loading')

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/signup')
      return
    }

    const newCodename = generateCodename()
    const newRole = assignRole()

    const { error } = await supabase
      .from('profiles')
      .update({ codename: newCodename, role: newRole, rank: 'Recruit' })
      .eq('id', session.user.id)

    if (error) {
      console.error('Failed to save profile:', error)
    }

    setCodename(newCodename)
    setRole(newRole)

    setTimeout(() => setStep('revealed'), 2500)
  }

  const submitName = async () => {
    if (!nameInput.trim()) return

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/signup')
      return
    }

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: nameInput.trim() })
      .eq('id', session.user.id)

    if (error) {
      console.error('Failed to save name:', error)
    }

    await assignAndReveal()
  }

  return (
    <div className="min-h-screen bg-bv-void flex items-center justify-center px-6 relative">
      <AnimatePresence>
        {step === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md flex flex-col gap-6 border border-bv-dust bg-bv-vault p-10 text-center"
          >
            <p className="text-bv-blood text-[0.65rem] tracking-[0.4em] uppercase">
              Identity Verification
            </p>
            <p className="text-bv-fog text-xs tracking-wide">
              Before your clearance is assigned, we need a name for official records.
            </p>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitName()}
              placeholder="Your full name"
              className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-4 py-3 outline-none focus:border-bv-gold transition-colors duration-300 placeholder:text-bv-fog text-center"
              autoFocus
            />
            <button
              onClick={submitName}
              className="w-full border border-bv-blood text-bv-ash text-xs tracking-[0.4em] uppercase py-3 hover:bg-bv-blood/10 transition-colors duration-300 cursor-pointer"
            >
              Submit
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'loading' && (
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
        {step === 'revealed' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-md flex flex-col gap-8 border border-bv-dust bg-bv-vault p-10"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-bv-blood text-[0.65rem] tracking-[0.4em] uppercase">
                Clearance Granted
              </p>
              <p className="text-bv-fog text-xs tracking-wide">
                Your identity within Operation Kaval has been assigned.
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 text-center border-y border-bv-dust py-6">
              <p className="text-bv-fog text-[0.65rem] tracking-[0.4em] uppercase">
                Your Codename
              </p>
              <h1 className="text-bv-gold text-4xl tracking-widest">
                {codename}
              </h1>
            </div>

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

            <button
              onClick={() => navigate('/briefing', { state: { codename, role } })}
              className="w-full border border-bv-blood text-bv-ash text-xs tracking-[0.4em] uppercase py-3 hover:bg-bv-blood/10 transition-colors duration-300 cursor-pointer"
            >
              Proceed
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}