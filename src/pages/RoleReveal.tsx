import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const firstWords = [
  'Rusty', 'Pale', 'Hollow', 'Burnt', 'Stray', 'Broken', 'Silent',
  'Faded', 'Cold', 'Cracked', 'Dim', 'Worn', 'Lost', 'Odd', 'Bare',
  'Dusty', 'Slack', 'Grey', 'Blunt', 'Tangled'
]

const secondWords = [
  'Owl', 'Fox', 'Sparrow', 'Sage', 'Echo', 'Raven', 'Moth', 'Pike',
  'Finch', 'Wren', 'Hound', 'Lark', 'Crane', 'Veil', 'Gate', 'Drift',
  'Shade', 'Flint', 'Reed', 'Thorn'
]

const roles = [
  {
    title: 'Intelligence Officer',
    description: 'Dates. Names. Locations. Connections. While everyone else searches for answers, you build the map.',
  },
  {
    title: 'Mole',
    description: 'Sometimes a file appears in your inbox that nobody else received. Don\'t ask why. Use it before it disappears.',
  },
  {
    title: 'Cryptanalyst',
    description: 'You notice patterns others don\'t see. Encoded messages rarely stay hidden from you for long.',
  },
  {
    title: 'Spotter',
    description: ' The details everyone misses have a habit of finding you.',
  },
  {
    title: 'Defector',
    description: 'Messages arrive from VEIL. Some tell the truth. Some are designed to mislead you. The difference matters more than you think.',
  },
]

function generateCodename() {
  const first = firstWords[Math.floor(Math.random() * firstWords.length)]
  const second = secondWords[Math.floor(Math.random() * secondWords.length)]
  return `${first} ${second}`
}

function assignRole() {
  return roles[Math.floor(Math.random() * roles.length)]
}

export default function RoleReveal() {
  const navigate = useNavigate()
  const [codename] = useState(generateCodename)
  const [role] = useState(assignRole)
  const [isSolo, setIsSolo] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const loadTimer = setTimeout(() => setLoading(false), 2500)
    const revealTimer = setTimeout(() => setRevealed(true), 2600)
    return () => {
      clearTimeout(loadTimer)
      clearTimeout(revealTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-bv-void flex items-center justify-center px-6 relative">
      <AnimatePresence>
        {loading && (
          <motion.p
          key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5}}
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
              <div className="flex items-center justify-between">
                <p className="text-bv-fog text-[0.65rem] tracking-[0.4em] uppercase">
                  Role
                </p>
              </div>
              <p className="text-bv-ash text-xl tracking-wide">
                {role.title}
              </p>
              <p className="text-bv-fog text-xs leading-relaxed">
                {role.description}
              </p>
            </div>

            {/* Solo toggle */}
            <div
              onClick={() => setIsSolo(!isSolo)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className={`w-4 h-4 border ${isSolo ? 'bg-bv-gold border-bv-gold' : 'border-bv-dust'} transition-colors duration-300`} />
              <p className="text-bv-fog text-xs tracking-wide group-hover:text-bv-ash transition-colors duration-300">
                I work alone. Activate Lone Wolf track.
              </p>
            </div>

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