import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import operativePhoto from "../assets/Ok.png"

export default function Briefing() {
  const navigate = useNavigate()
  const location = useLocation()
  const { codename, solo } = location.state || {}

  return (
    <div className="min-h-screen bg-bv-void flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md flex flex-col gap-7 border border-bv-dust bg-bv-vault p-10"
      >
        <div className="relative -m-10 mb-0 h-48 flex items-end overflow-hidden">
          <img
            src={operativePhoto}
            alt=""
            className="absolute w-full h-full object-cover  contrast-100"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bv-vault via-bv-vault/60 to-black/40" />
          <div className="relative z-10 w-full text-center px-6 pb-5">
            <p className="text-bv-blood text-[0.65rem] tracking-[0.4em] uppercase mb-1">
              Welcome to Operation KAVAL
            </p>
            <p className="text-bv-fog text-xs tracking-wide">
              Kavala Station Archive Access, read before proceeding
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-bv-gold text-[0.7rem] tracking-[0.3em] uppercase">
            The archive does not open all at once.
          </p>
          <p className="text-bv-fog text-xs leading-relaxed">
            Files unlock as you resolve the ones before them. Some are readable before they're solvable, pay attention to which is which.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-bv-gold text-[0.7rem] tracking-[0.3em] uppercase">
            Read everything twice.
          </p>
          <p className="text-bv-fog text-xs leading-relaxed">
            Filenames, footnotes, downloaded files. Nothing in this archive is here by accident.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-bv-gold text-[0.7rem] tracking-[0.3em] uppercase">
            Not everyone sees the same archive.
          </p>
          <p className="text-bv-fog text-xs leading-relaxed">
            Your designation shapes what reaches you. Compare notes with someone running this differently, and don't assume you're seeing the same thing.
          </p>
        </div>
        {solo && (
          <div className="flex items-center gap-3 border-t border-bv-dust pt-5">
            <div className="w-4 h-4 bg-bv-gold border-bv-gold border shrink-0" />
            <p className="text-bv-fog text-xs tracking-wide">
              You're running this alone. No one is coming to explain what you missed.
            </p>
          </div>
        )}
        <button
          onClick={() => navigate('/signin')}
          className="w-full border border-bv-blood text-bv-ash text-xs tracking-[0.4em] uppercase py-3 hover:bg-bv-blood/10 transition-colors duration-300 cursor-pointer mt-2"
        >
          {codename ? `Proceed,${codename}` : 'Proceed to Sign In'}
        </button>
      </motion.div>
    </div>
  )
}