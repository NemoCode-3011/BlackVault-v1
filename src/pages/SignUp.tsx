import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

export default function SignUp() {
  const isReturning = localStorage.getItem('bv_returning') === 'true'

  const handleDiscordLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/role`,
      },
    })
  }

  return (
    <div className="min-h-screen bg-bv-void flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md flex flex-col gap-8 text-center"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-bv-blood text-xs tracking-[0.4em] uppercase">
            {isReturning ? 'Welcome Back' : 'Classified Access'}
          </p>
          <h1 className="text-bv-ash text-4xl tracking-widest">
            {isReturning ? 'Resume Access' : 'Request Clearance'}
          </h1>
          <p className="text-bv-fog text-xs tracking-wide">
            {isReturning
              ? 'Sign back in to continue where you left off.'
              : 'Your role within Operation Kaval will be assigned upon entry.'}
          </p>
        </div>

        <button
          onClick={handleDiscordLogin}
          className="w-full border border-bv-blood text-bv-ash text-xs tracking-[0.4em] uppercase py-4 hover:bg-bv-blood/10 transition-colors duration-300 cursor-pointer flex items-center justify-center gap-3"
        >
          <svg width="18" height="18" viewBox="0 0 127.14 96.36" fill="currentColor">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
          </svg>
          {isReturning ? 'Sign in with Discord' : 'Continue with Discord'}
        </button>
      </motion.div>
    </div>
  )
}