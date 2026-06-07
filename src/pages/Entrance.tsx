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
    }, 60)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setDisplay(targetLetter)
      setResolved(true)
    }, delay + maxIterations * 60)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [targetLetter, delay])

  return (
    <span
      style={{
        color: resolved ? '#E8E0D0' : '#C0392B',
        transition: 'color 0.3s ease',
        display: 'inline-block',
        minWidth: '0.6em',
      }}
    >
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
    <div
      style={{
        backgroundColor: '#0E0C0A',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
      }}
    >
      {/* overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          zIndex: 10,
          opacity: 0.4,
        }}
      />

      {/* glitch text */}
      <h1
        style={{
          fontFamily: "'Special Elite', cursive",
          fontSize: 'clamp(2.5rem, 8vw, 6rem)',
          letterSpacing: '0.2em',
          userSelect: 'none',
        }}
      >
        {word.split('').map((letter, index) => (
          <GlitchLetter
            key={index}
            targetLetter={letter}
            delay={index * 150}
          />
        ))}
      </h1>

      {/* Enter button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: 'mirror',
            }}
            onClick={() => navigate('/signup')}
            style={{
              background: 'transparent',
              border: '1px solid #3D3B2F',
              color: '#E8E0D0',
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '0.4em',
              padding: '0.75rem 2.5rem',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'border-color 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.borderColor = '#D4A843'
                ; (e.target as HTMLButtonElement).style.color = '#D4A843'
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.borderColor = '#3D3B2F'
                ; (e.target as HTMLButtonElement).style.color = '#E8E0D0'
            }}
          >
            Enter
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}