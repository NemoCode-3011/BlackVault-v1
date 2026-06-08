import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const foreignChars = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩабвгдежзийклмнопрстуфхцчшщъыьэюя'

function getRandomChar() {
  return foreignChars[Math.floor(Math.random() * foreignChars.length)]
}

function GlitchLetter({ targetLetter, delay }: { targetLetter: string; delay: number }) {
  const [display, setDisplay] = useState(getRandomChar())
  const [resolved, setResolved] = useState(false)

  useEffect(() => {
    let iterations = 0
    const maxIterations = 10

    const interval = setInterval(() => {
      if (iterations >= maxIterations) {
        setDisplay(targetLetter)
        setResolved(true)
        clearInterval(interval)
        return
      }
      setDisplay(getRandomChar())
      iterations++
    }, 25)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setDisplay(targetLetter)
      setResolved(true)
    }, delay + maxIterations * 25)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [targetLetter, delay])

  return (
    <span className={`inline-block min-w-[0.6em] transition-colors duration-300 ${resolved ? 'text-bv-ash' : 'text-bv-blood'}`}>
      {display}
    </span>
  )
}

export default function Entrance() {
  const navigate = useNavigate()
  const word = 'BLACKVAULT'
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowButton(true)
    }, word.length * 150 + 400)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="min-h-screen bg-bv-void flex flex-col items-center justify-center gap-10">

      {/* BLACKVAULT glitch text */}
      <h1 className="text-[clamp(2.5rem,8vw,6rem)] tracking-[0.2em] select-none"
        style={{ fontFamily: 'var(--font-display)' }}>
        {word.split('').map((letter, index) => (
          <GlitchLetter
            key={index}
            targetLetter={letter}
            delay={index * 150}
          />
        ))}
      </h1>
      <AnimatePresence>
        {showButton && (
          <motion.p
            key="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="text-bv-fog text-[0.7rem] tracking-[0.6em] uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The game plays you.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Enter button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            key="enter"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: 'mirror',
            }}
            onClick={() => navigate('/signup')}
            className="border border-bv-dust text-bv-ash font-body text-[0.85rem] tracking-[0.4em] uppercase px-10 py-3 bg-transparent cursor-pointer hover:border-bv-gold hover:text-bv-gold transition-colors duration-300"
          >
            Enter
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  )
}