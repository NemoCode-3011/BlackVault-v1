import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import bvStamp from '../assets/blackvault-stamp.png'
import bvLogo from '../assets/bv-logo.png'
import unknownWoman from '../assets/unknown-woman.jpg'
import { supabase } from '../lib/supabase'
import { useNavigate, Link } from 'react-router-dom'
import { signOut } from '../lib/auth'

// --- AnswerInput ---
function AnswerInput({ answer, onUnlock }: { answer: string; onUnlock: () => void }) {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')

  const handleSubmit = () => {
    if (input.trim().toUpperCase() === answer.toUpperCase()) {
      setStatus('correct')
      onUnlock()
    } else {
      setStatus('wrong')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  return status === 'correct' ? (
    <p style={{ color: '#556B57', fontSize: '0.7rem', letterSpacing: '0.3em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
      ✓ Access granted — next file unlocked
    </p>
  ) : (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Enter your findings..."
          className="flex-1 px-3 py-2 outline-none"
          style={{
            backgroundColor: '#C8B89A',
            border: '1px solid rgba(0,0,0,0.2)',
            color: '#1A1714',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
          }}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-[0.65rem] tracking-[0.3em] uppercase cursor-pointer"
          style={{ backgroundColor: '#2A2520', color: '#D8CEB8', fontFamily: 'var(--font-body)' }}
        >
          Submit
        </button>
      </div>
      {status === 'wrong' && (
        <p style={{ color: '#7A1616', fontSize: '0.65rem', letterSpacing: '0.2em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
          Incorrect. Access denied.
        </p>
      )}
    </div>
  )
}

// --- Document004 ---
function Document004({ onUnlock }: { onUnlock: (id: string) => void }) {
  const [stage, setStage] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [finished, setFinished] = useState(false)
  const [revealStage, setRevealStage] = useState(0)

  const stages = [
    { clue: "File metadata intact. Coordinates embedded in filename per standard Kavala Station field protocol.", answer: 'BRUSSELS' },
    { clue: "See also: MI-1978-KVL cross-reference noted in transit record. Supporting material exists outside this archive.", answer: 'VANTAGE' },
    { clue: "Decryption key derivation: subject designation combined with participation classification. See Form HF-7.", answer: 'STARLINGWASCHOSEN' },
  ]

  const currentStage = stages[stage]

  useEffect(() => {
    if (!finished) return
    const t1 = setTimeout(() => setRevealStage(1), 2500)
    const t2 = setTimeout(() => setRevealStage(2), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [finished])

  const handleSubmit = () => {
    if (input.trim().toUpperCase() === currentStage.answer.toUpperCase()) {
      setStatus('correct')
      setTimeout(() => {
        if (stage === stages.length - 1) {
          setFinished(true)
        } else {
          setStage(prev => prev + 1)
          setInput('')
          setStatus('idle')
        }
      }, 1200)
    } else {
      setStatus('wrong')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 border-b border-black/15 pb-4">
        <p style={{ color: '#7A1616', fontSize: '0.55rem', letterSpacing: '0.5em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
          BlackVault — Unclassified Submission
        </p>
        <p style={{ color: '#2A2520', fontSize: '0.55rem', letterSpacing: '0.3em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
          Origin: Anonymous Upload · Received: 04:32 UTC
        </p>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#1A1714', letterSpacing: '0.08em' }}>
            Photograph — Brussels, undated
          </p>
          <p style={{ fontSize: '0.6rem', color: '#8A8070', fontFamily: 'var(--font-body)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            No accompanying note. No sender identity.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p style={{ fontSize: '0.55rem', color: '#8A8070', fontFamily: 'var(--font-body)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>File</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: '#7A1616' }}>KVL-004</p>
        </div>
      </div>

      <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.78rem', color: '#8A8070', fontStyle: 'italic', lineHeight: 1.6 }}>
        This file appeared in the BlackVault upload queue forty minutes after MOTH_33's original submission. No account was used. The IP address resolved to a VPN exit node in Reykjavik. We do not know who sent this or why.
      </p>

      <div className="flex flex-col gap-2">
        <img
          src="/src/public/assets/50.8410_N_4.3570_E.jpg"
          alt=""
          style={{ width: '100%', filter: 'grayscale(100%) contrast(1.1) brightness(0.9)', border: '1px solid rgba(0,0,0,0.2)' }}
        />
        <div className="flex items-center justify-between">
          <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
            This preview strips embedded data. The original file may not.
          </p>
          < a href="/assets/50.8410_N_4.3570_E.jpg"
            download="50.8410_N_4.3570_E.jpg"
            style={{ fontSize: '0.6rem', color: '#7A1616', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', textDecoration: 'none', borderBottom: '1px solid #7A1616', paddingBottom: '1px' }}
          >
            Download file
          </a>
        </div>
      </div>

      {!finished ? (
        <div className="flex flex-col gap-3 border-t border-black/10 pt-4 mt-1">
          <div className="flex items-center gap-3">
            <p style={{ color: '#7A1616', fontSize: '0.6rem', letterSpacing: '0.4em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
              Analyst Input
            </p>
            <p style={{ color: '#3D3B2F', fontSize: '0.6rem', letterSpacing: '0.2em', fontFamily: 'var(--font-body)' }}>
              {stage + 1} / 3
            </p>
          </div>
          <p style={{ color: '#2A2520', fontSize: '0.75rem', lineHeight: '1.8', fontFamily: 'var(--font-body)' }}>
            {currentStage.clue}
          </p>
          {status === 'correct' ? (
            <p style={{ color: '#556B57', fontSize: '0.7rem', letterSpacing: '0.3em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
              ✓ Correct. Loading next layer...
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="Enter your findings..."
                  className="flex-1 px-3 py-2 outline-none"
                  style={{ backgroundColor: '#C8B89A', border: '1px solid rgba(0,0,0,0.2)', color: '#1A1714', fontFamily: 'var(--font-body)', fontSize: '0.8rem', letterSpacing: '0.1em' }}
                />
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-[0.65rem] tracking-[0.3em] uppercase cursor-pointer"
                  style={{ backgroundColor: '#2A2520', color: '#D8CEB8', fontFamily: 'var(--font-body)' }}
                >
                  Submit
                </button>
              </div>
              {status === 'wrong' && (
                <p style={{ color: '#7A1616', fontSize: '0.65rem', letterSpacing: '0.2em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                  Incorrect. Keep looking.
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 border-t border-black/10 pt-4 mt-1">
          <p style={{ color: '#7A1616', fontSize: '0.6rem', letterSpacing: '0.4em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
            Decrypted — Vigenère key: STARLINGWASCHOSEN
          </p>
          <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', lineHeight: 1.85 }}>
            I am CORMORANT. I am 84 years old. I have not spoken about this in 58 years.
          </p>
          <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', lineHeight: 1.85 }}>
            I put the Ω on those seven files because I believed Walsh had made an error with them. I was right about six. I was wrong about the seventh. Subject Ω was not a plant. Subject Ω was something Walsh did not design and did not predict.
          </p>
          <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', lineHeight: 1.85 }}>
            I have spent fifty years trying to understand how. The organisation in this photograph is still running. They have new names now. New papers. New faces. But the work continues.
          </p>
          <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', lineHeight: 1.85 }}>
            For fifty-eight years I believed STARLING was the anomaly. The one mistake. The one file I should have buried deeper.
          </p>
          <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', lineHeight: 1.85 }}>
            I was wrong.
          </p>
          <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', lineHeight: 1.85 }}>
            He wasn't the last. I have spent three weeks trying to find a way to say this safely and there isn't one, so I am simply going to write the name and hope this reaches someone before they reach
          </p>
          <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#7A1616', opacity: 0.5, letterSpacing: '0.05em' }}>
            [ TRANSMISSION INTERRUPTED — REMAINDER CORRUPTED ]
          </p>

          {revealStage >= 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              style={{ fontFamily: 'var(--font-hand)', fontSize: '0.78rem', color: '#8A8070', fontStyle: 'italic', marginTop: '8px' }}
            >
              This is the last transmission BlackVault received from this source.
            </motion.p>
          )}

          {revealStage >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="flex flex-col gap-3 border-t border-black/10 pt-4 mt-2"
            >
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#7A1616', lineHeight: 1.8 }}>
                Three minutes after this transmission was received, the Meridian Institute's public website changed its homepage. We do not know why. We are taking this archive offline as a precaution.
              </p>
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#7A1616', lineHeight: 1.8 }}>
                This may be the last time you see this page.
              </p>
              <button
                onClick={() => onUnlock('waitlist')}
                className="self-start text-[0.65rem] tracking-[0.4em] uppercase mt-2 hover:opacity-60 transition-opacity duration-200 cursor-pointer"
                style={{ color: '#7A1616', fontFamily: 'var(--font-body)' }}
              >
                Leave a way to reach you →
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
// --- FileViewer ---
function FileViewer({
  fileId,
  onClose,
  onUnlock,
  isUnlocked,
}: {
  fileId: string
  onClose: () => void
  onUnlock: (id: string) => void
  isUnlocked: (id: string) => boolean
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const documentRef = useRef<HTMLDivElement>(null)
  const stampRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    tl.fromTo(documentRef.current, { y: '100%' }, { y: 0, duration: 0.7, ease: 'power4.out' }, '-=0.1')
    tl.fromTo(stampRef.current,
      { rotation: -30, opacity: 0, scale: 1.4 },
      { rotation: -12, opacity: 0.6, scale: 1, duration: 0.5, ease: 'back.out(2)' },
      '-=0.2'
    )
  }, [fileId])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-bv-void/95 flex items-end justify-center z-50"
      style={{ opacity: 0 }}
    >
      <div
        ref={documentRef}
        className="w-full max-w-2xl relative overflow-y-auto"
        onClick={e => e.stopPropagation()}
        style={{ backgroundColor: '#D8CEB8', minHeight: '75vh', maxHeight: '92vh', transform: 'translateY(100%)' }}
      >
        <img
          ref={stampRef}
          src={bvStamp}
          alt="classified"
          className="absolute top-2 right-6 w-24 h-24 md:w-28 md:h-28"
          style={{ opacity: 0 }}
        />

        <div className="p-6 md:p-10 flex flex-col gap-5 md:gap-6">
          <div className="flex flex-col gap-1 pr-28">
            <p style={{ color: '#7A1616', fontSize: '0.65rem', letterSpacing: '0.4em', fontFamily: 'var(--font-body)' }}>
              Classified — Authorized Eyes Only
            </p>
            <h2 className="text-2xl tracking-widest" style={{ color: '#1A1714', fontFamily: 'var(--font-display)' }}>
              {fileId === '000' ? 'A Letter' : `File ${fileId}`}
            </h2>
          </div>

          <div className="h-px bg-black/10" />

          {/* FILE 000 — The Letter */}
          {fileId === '000' && (() => {
            const sentences = [
              { text: "I keep starting this and deleting it.", gap: false },
              { text: "I've been sitting with this intake form for four months now. I found it in a shoebox at the bottom of my grandfather's wardrobe, underneath his old Yugoslav passport and a photograph of a woman I've never seen before. Beneath all of it, a book. The spine was cracked like he'd read it a hundred times. Frankl. I didn't think anything of it then. There was no label on the shoebox. No explanation. Just the form, the passport, the woman, and the book.", gap: false },
              { text: "My grandfather died in February. He was 84. He taught political science for thirty years at a university I won't name here, and he was — by every account, including mine — a good man. Quiet. Certain about things in the way that only people who've thought very carefully about them can be. He had opinions about power that he'd held for decades without wavering. I used to think that was integrity.", gap: false },
              { text: "I don't know what I think now.", gap: false },
              { text: "The form is from something called the Heron Foundation. Kavala Station, 1963. His name is redacted but the handwriting in the margins — the way the 7 is crossed, the loop on the lowercase d — I've been looking at that handwriting my whole life. It's his. And in the top corner, stamped in red, a case number: KVL-007-1963-Ω.", gap: false },
              { text: "I don't know what the omega means. I've looked. I can't find it anywhere.", gap: false },
              { text: "I've been trying to decide if knowing changes anything. He's gone. Whatever they did to him, he lived a whole life on the other side of it. He loved my grandmother. He was patient with me when I was difficult. He made coffee every morning with too much sugar and complained about it every time, like the sugar was someone else's fault.", gap: false },
              { text: "Was any of that real? Or was real the wrong question?", gap: false },
              { text: "I've been carrying this alone because I don't know who to tell. I can't tell his children — my mother, my uncle — because I don't know what I'd even be telling them. I thought about burning it. I thought about that seriously, the way you think about something you actually might do.", gap: false },
              { text: "Instead I'm writing this to no one, at 2 in the morning, and I'm going to post what I found on a website where people try to solve things. Maybe that's absurd. Maybe someone will see something I can't.", gap: false },
              { text: "His codename was STARLING.", gap: false },
              { text: "I keep thinking about that. They gave him a bird. Something small. Something that travels without knowing why.", gap: false },
              { text: "— M", gap: true },
            ]
            return (
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: '1.05rem', lineHeight: '1.9', color: '#2A2520' }}>
                {sentences.map((s, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.4 }}
                    style={{
                      marginBottom: s.gap ? '2rem' : '1.2rem',
                      color: s.text.startsWith('—') ? '#7A1616' : '#2A2520',
                      letterSpacing: s.text.startsWith('—') ? '0.15em' : 'normal',
                      fontSize: s.text.startsWith('—') ? '0.85rem' : '1.05rem',
                    }}
                  >
                    {s.text}
                  </motion.p>
                ))}
              </div>
            )
          })()}

          {/* FILE 001 — Intake Form */}
          {fileId === '001' && (
            <div className="flex flex-col gap-5">
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.82rem', color: '#7A1616', fontStyle: 'italic', opacity: 0.75, marginBottom: '12px', transform: 'rotate(-0.5deg)' }}>
                this is what I found. — M
              </p>

              <div className="flex flex-col gap-2 border-b border-black/15 pb-4">
                <p style={{ color: '#7A1616', fontSize: '0.55rem', letterSpacing: '0.5em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                  The Heron Foundation — Humanitarian Resettlement Programme
                </p>
                <p style={{ color: '#2A2520', fontSize: '0.55rem', letterSpacing: '0.3em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                  Kavala Station · Northern Greece · Est. 1958
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 mb-2">
                <img
                  src={unknownWoman}
                  alt=""
                  className="w-48"
                  style={{ filter: 'grayscale(100%)', border: '1px solid rgba(0,0,0,0.2)', opacity: 0.9 }}
                />
                <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  Found in subject's personal belongings
                </p>
              </div>

              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex flex-col gap-1">
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#1A1714', letterSpacing: '0.08em' }}>
                    Subject Intake Assessment
                  </p>
                  <p style={{ fontSize: '0.6rem', color: '#8A8070', fontFamily: 'var(--font-body)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    Form HF-7 · Restricted
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p style={{ fontSize: '0.55rem', color: '#8A8070', fontFamily: 'var(--font-body)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Case No.</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: '#7A1616', letterSpacing: '0.1em' }}>
                    KVL-007-1963-Ω
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">

                {/* The dates that don't agree — no label, no explanation */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                      Arrival, Kavala Station
                    </p>
                    <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '2px' }}>
                      18 March 1963
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                      Initial Interview
                    </p>
                    <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '2px' }}>
                      16 March 1963
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                      Subject Name
                    </p>
                    <div style={{ height: '22px', background: '#2A2520', borderRadius: '1px', width: '100%' }} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                      Nationality
                    </p>
                    <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '2px' }}>
                      Yugoslav
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Age</p>
                    <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '2px' }}>31</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Languages</p>
                    <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '2px' }}>4</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Codename</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: '#7A1616', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '2px' }}>STARLING</p>
                  </div>
                </div>

                {/* Participation Status — this is where WILLING lives, as an official stamp */}
                <div className="flex flex-col gap-1 mt-2">
                  <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                    Participation Status
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    color: '#1A1714',
                    letterSpacing: '0.15em',
                    border: '1px solid rgba(0,0,0,0.2)',
                    padding: '6px 10px',
                    display: 'inline-block',
                    width: 'fit-content',
                  }}>
                    HF-7 / CLASS W
                  </p>
                </div>

                {/* Walsh's clinical notes */}
                <div className="flex flex-col gap-1 mt-1">
                  <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                    Dr. Walsh — Private Clinical Notes
                  </p>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#3A2E28', lineHeight: 1.8, fontStyle: 'italic' }}>
                    Subject 007 continues to exceed expectation. He speaks of his journey here often, of what it cost him to leave everyone he knew. There is, in him, a particular hunger for meaning that I believe makes him ideal. He has not asked once why we are doing this, only thanked us, repeatedly, for the chance to rebuild something better than what he lost. I confess I find this convenient. He believes this is something he is choosing.
                  </p>
                </div>

                {/* Redacted section + CORMORANT's angry annotation */}
                <div className="flex flex-col gap-1.5 mt-1 relative">
                  <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                    Programme Assignment
                  </p>
                  <div style={{ height: '14px', background: '#2A2520', borderRadius: '1px', width: '100%' }} />
                  <div style={{ height: '14px', background: '#2A2520', borderRadius: '1px', width: '75%' }} />
                  <div style={{ height: '14px', background: '#2A2520', borderRadius: '1px', width: '90%' }} />
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#7A1616', transform: 'rotate(-2deg)', marginTop: '6px', marginLeft: '4px', opacity: 0.85, lineHeight: 1.4 }}>
                    He didn't choose this. — C.
                  </p>
                </div>

                {/* Authorisation */}
                <div className="flex flex-col gap-3 mt-2 pt-3 border-t border-black/10">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Authorised by</p>
                      <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: '#2A2520' }}>Dr. A. Walsh</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Classification</p>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: '#7A1616', letterSpacing: '0.15em' }}>Eyes Only</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-black/10 pt-4 mt-2">
                <p style={{ color: '#7A1616', fontSize: '0.6rem', letterSpacing: '0.4em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                  Classified — Analyst Input
                </p>
                <p style={{ color: '#2A2520', fontSize: '0.75rem', lineHeight: '1.8', fontFamily: 'var(--font-body)' }}>
                  Classification code per Form HF-7. Key filed with the transit record.
                </p>
                <AnswerInput answer="WILLING" onUnlock={() => onUnlock('002')} />
              </div>
            </div>
          )}

          {/* FILE 002 — Transit Record */}
          {fileId === '002' && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1 border-b border-black/15 pb-4">
                <p style={{ color: '#7A1616', fontSize: '0.55rem', letterSpacing: '0.5em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                  The Heron Foundation — Transit Record
                </p>
                <p style={{ color: '#2A2520', fontSize: '0.55rem', letterSpacing: '0.3em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                  Kavala Station · Northern Greece · 1961—1966
                </p>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#1A1714', letterSpacing: '0.08em' }}>
                    Subject Transit Log — Restricted
                  </p>
                  <p style={{ fontSize: '0.6rem', color: '#8A8070', fontFamily: 'var(--font-body)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    Form HF-23 · Eyes Only
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p style={{ fontSize: '0.55rem', color: '#8A8070', fontFamily: 'var(--font-body)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    Total subjects
                  </p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: '#7A1616' }}>23</p>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.78rem', color: '#8A8070', fontStyle: 'italic', lineHeight: 1.6 }}>
                Document recovered in partial condition. Water damage sustained during 1971 transfer. Sections marked ██ are unrecoverable. Entries marked Ω require separate clearance. Cross-reference:{' '}
                {isUnlocked('004') ? (
                  <Link to="/meridian" target="_blank" style={{ color: '#7A1616', fontStyle: 'normal', borderBottom: '1px solid #7A1616', textDecoration: 'none' }}>
                    Meridian Institute
                  </Link>
                ) : (
                  <span style={{ color: '#7A1616', fontStyle: 'normal' }}>Meridian Institute</span>
                )}{' '}
                filing ref. MI-1978-KVL
              </p>

              <div className="flex flex-col gap-2 border-t border-black/10 pt-3">
                <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>
                  General Population — Subjects 001—016
                </p>
                {[
                  '001 — LAPWING — ██████ — released: ██████',
                  '002 — FINCH — Polish — released: ██████ — status: ██',
                  '003 — ██████ — Romanian — ██████',
                  '004 — REED — ██████ — released: Berlin, 196█',
                  '005 — ██████ — ██████ — status: lost',
                  '006 — SPARROW — Yugoslav — released: ██████ — status: ██████',
                  '007 — ██████ — Hungarian — ██████ — destination: ██████',
                  '008 — THORN — ██████ — released: ██████',
                  '009 — ██████ — Bulgarian — ██████ — status: reintegrated',
                  '010 — WREN — ██████ — released: Warsaw, 196█ — status: ██',
                  '011—016 — ██████████████████████████████████████',
                ].map((entry, i) => (
                  <p key={i} style={{ fontFamily: 'var(--font-hand)', fontSize: '0.82rem', color: '#2A2520', lineHeight: 1.6, opacity: i === 10 ? 0.4 : 0.75 }}>
                    {entry}
                  </p>
                ))}
              </div>

              <div className="flex flex-col gap-4 border-t border-black/10 pt-3">
                <p style={{ fontSize: '0.55rem', color: '#7A1616', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>
                  Ω — Restricted Entries
                </p>

                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#2A2520', lineHeight: 1.6 }}>
                  Ω — CRANE — Released: Prague, 1964 — status: reintegrated
                </p>
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#2A2520', lineHeight: 1.6 }}>
                  Ω — MARTIN — Arrived: autumn 1962 — nationality: ██████
                </p>
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#2A2520', lineHeight: 1.6 }}>
                  Ω — IBIS — destination: ██████ — last known: ████████
                </p>
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#2A2520', lineHeight: 1.6 }}>
                  Ω — EGRET — intake: ███ — field note: ████████████████
                </p>
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#2A2520', lineHeight: 1.6 }}>
                  Ω — SWIFT — released: Sofia, 1965 — track: lost
                </p>
                <div style={{ border: '1px dashed rgba(122,22,22,0.3)', padding: '8px', marginLeft: '-8px', marginRight: '-8px' }}>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#2A2520', lineHeight: 1.6 }}>
                    Ω — STARLING — KVL-007-1963-Ω — assessor: ████████
                  </p>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.72rem', color: '#7A1616', fontStyle: 'italic', opacity: 0.6, marginTop: '2px' }}>
                    — flagged for removal. See C.
                  </p>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.72rem', color: '#7A1616', fontStyle: 'italic', opacity: 0.6, marginTop: '4px' }}>
                    — same mark as the case number on his intake form. It doesn't explain itself here either.
                  </p>
                </div>
              </div>

              {/* The count problem + Parish's verification */}
              <div className="flex flex-col gap-3 border-t border-black/10 pt-4">
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.82rem', color: '#7A1616', fontStyle: 'italic', transform: 'rotate(-1deg)', opacity: 0.85 }}>
                  Count what's visible here. The header says 23.
                </p>

                <div style={{ border: '1px solid rgba(0,0,0,0.15)', padding: '12px', background: 'rgba(0,0,0,0.02)' }}>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.8rem', color: '#2A2520', lineHeight: 1.7, fontStyle: 'italic' }}>
                    Discrepancy noted and investigated. Recount confirms total of twenty-three. One entry was filed separately due to incomplete intake documentation. Cross-referenced against Vienna Station records.
                  </p>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.8rem', color: '#3A2E28', marginTop: '8px', textAlign: 'right' }}>
                    — verified, E. PAR___, Vienna Station, 1966
                  </p>
                </div>
              </div>
              {/* Form HF-7 classification key — printed footer, resolves Doc001's coded stamp */}
              <div style={{ border: '1px solid rgba(0,0,0,0.15)', padding: '10px', marginTop: '4px', background: 'rgba(0,0,0,0.02)' }}>
                <p style={{ textTransform: 'uppercase', fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', marginBottom: '4px', fontFamily: 'var(--font-body)' }}>
                  Form HF-7 — Classification Key
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#3A2E28', letterSpacing: '0.05em' }}>
                  W — Willing &nbsp;·&nbsp; C — Compelled &nbsp;·&nbsp; R — Reassigned &nbsp;·&nbsp; T — Terminated
                </p>
              </div>
              <div className="flex flex-col gap-3 border-t border-black/10 pt-4 mt-1">
                <p style={{ color: '#7A1616', fontSize: '0.6rem', letterSpacing: '0.4em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                  Analyst Input
                </p>
                <p style={{ color: '#2A2520', fontSize: '0.75rem', lineHeight: '1.8', fontFamily: 'var(--font-body)' }}>
                  Cross-reference against original station manifest recommended. Verification attached.
                </p>
                {isUnlocked('002') ? (
                  <AnswerInput answer="PARISH" onUnlock={() => onUnlock('003')} />
                ) : (
                  <p style={{ color: '#8A8070', fontSize: '0.65rem', letterSpacing: '0.1em', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
                    Submission locked. Document 001 must be resolved first.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* FILE 003 — The Parish Memo */}
          {fileId === '003' && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1 border-b border-black/15 pb-4">
                <p style={{ color: '#7A1616', fontSize: '0.55rem', letterSpacing: '0.5em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                  Central Intelligence Agency — Internal Memorandum
                </p>
                <p style={{ color: '#2A2520', fontSize: '0.55rem', letterSpacing: '0.3em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                  Classification: Eyes Only · Do Not Circulate
                </p>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#1A1714', letterSpacing: '0.08em' }}>
                    Formal Objection — Operation KAVAL
                  </p>
                  <p style={{ fontSize: '0.6rem', color: '#8A8070', fontFamily: 'var(--font-body)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    Authored: E. Parish · Vienna Station · November 1966
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p style={{ fontSize: '0.55rem', color: '#8A8070', fontFamily: 'var(--font-body)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Status</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: '#7A1616' }}>Page 2 Missing</p>
                </div>
              </div>

              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.78rem', color: '#8A8070', fontStyle: 'italic', lineHeight: 1.6 }}>
                Document recovered 1998 under misfiled reference. Page two not recovered.
              </p>

              {/* Three accounts of the same event */}
              <div className="flex flex-col gap-3 border-t border-black/10 pt-4">
                <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  Three accounts of the same intake — Subject 007
                </p>

                <div style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '12px' }}>
                  <p style={{ fontSize: '0.6rem', color: '#7A1616', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>
                    Walsh, Intake Form HF-7
                  </p>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#2A2520', lineHeight: 1.7 }}>
                    "Subject's participation is recorded as willing. He arrived at the station of his own accord and underwent intake without resistance."
                  </p>
                </div>

                <div style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '12px' }}>
                  <p style={{ fontSize: '0.6rem', color: '#7A1616', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>
                    Transit Record HF-23
                  </p>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#2A2520', lineHeight: 1.7 }}>
                    No statement on consent is recorded. Subject's interview date precedes his recorded arrival date by two days.
                  </p>
                </div>

                <div style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '12px', background: 'rgba(122,22,22,0.03)' }}>
                  <p style={{ fontSize: '0.6rem', color: '#7A1616', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>
                    Parish, this memo
                  </p>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#2A2520', lineHeight: 1.7 }}>
                    "A man cannot be interviewed before he arrives. Dr. Walsh's account of voluntary participation cannot be reconciled with the station's own paperwork. I do not believe Subject 007 was capable of meaningful consent at any point in this process."
                  </p>
                </div>
              </div>

              {/* The memo continues */}
              <div className="flex flex-col gap-4 border-t border-black/10 pt-4">
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', lineHeight: 1.85 }}>
                  To: Director of Plans, Clandestine Services<br />
                  From: E. Parish, Junior Analyst, Vienna Station<br />
                  Re: Operation KAVAL — Formal Objection<br />
                  Date: 14 November 1966
                </p>

                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', lineHeight: 1.85 }}>
                  I am formally requesting that continued operation of KAVAL be reviewed by an independent body. The ethical implications of current methodology cannot be assessed within the programme's own operational framework. We are not rehabilitating displaced persons. We are using their displacement as a vector. I will not dignify this with the language of national security.
                </p>

                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', lineHeight: 1.85 }}>
                  I raised this directly with the officer responsible for flagging Subject 007's file. He did not disagree with my reading of the paperwork. He asked me, in confidence, not to file this memo. I am filing it regardless. His initial appears on the file as C. His full designation, as far as I have been able to determine through internal correspondence, is CORMORANT.
                </p>

                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', lineHeight: 1.85 }}>
                  These are human beings. Not theories. Not assets. Not subjects. People.
                </p>

                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', lineHeight: 1.85 }}>
                  — E. Parish<br />
                  Vienna Station, November 1966
                </p>

                <div style={{ borderTop: '1px dashed rgba(42,37,32,0.2)', paddingTop: '12px', marginTop: '4px' }}>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.78rem', color: '#7A1616', fontStyle: 'italic', opacity: 0.7 }}>
                    [ Page 2 not recovered. ]
                  </p>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.78rem', color: '#7A1616', fontStyle: 'italic', opacity: 0.7, marginTop: '6px' }}>
                    [ Filing clerk's note, attached later: E. Parish was reassigned from Vienna Station three weeks after this memo was filed. She died in a road accident outside Vienna on 2 March 1969. She was 26. The case was not investigated further. ]
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-black/10 pt-4 mt-1">
                <p style={{ color: '#7A1616', fontSize: '0.6rem', letterSpacing: '0.4em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                  Analyst Input
                </p>
                <p style={{ color: '#2A2520', fontSize: '0.75rem', lineHeight: '1.8', fontFamily: 'var(--font-body)' }}>
                  Three accounts filed separately. Discrepancies noted but not reconciled at time of recovery. Bird names are reserved for protected sources — not subjects, not case numbers.
                </p>
                <AnswerInput answer="CORMORANT" onUnlock={() => onUnlock('004')} />
              </div>
            </div>
          )}

          {fileId === '004' && <Document004 onUnlock={onUnlock} />}

          <button
            onClick={() => {
              if (fileId === '000') onUnlock('001')
              onClose()
            }}
            className="self-start text-[0.65rem] tracking-[0.4em] uppercase mt-4 hover:opacity-60 transition-opacity duration-200 cursor-pointer"
            style={{ color: '#7A1616', fontFamily: 'var(--font-body)' }}
          >
            Close File
          </button>
        </div>
      </div>
    </div>
  )
}

// --- WallThreads ---
function WallThreads() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} xmlns="http://www.w3.org/2000/svg">
      <line x1="120" y1="80" x2="95" y2="195" stroke="#C0392B" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="160" y1="85" x2="320" y2="200" stroke="#C0392B" strokeWidth="0.8" strokeOpacity="0.3" />
      <line x1="180" y1="260" x2="290" y2="215" stroke="#D4A843" strokeWidth="0.8" strokeOpacity="0.35" />
      <line x1="90" y1="310" x2="110" y2="400" stroke="#C0392B" strokeWidth="0.8" strokeOpacity="0.25" />
      <line x1="340" y1="305" x2="330" y2="398" stroke="#D4A843" strokeWidth="0.7" strokeOpacity="0.2" />
      <line x1="75" y1="420" x2="360" y2="220" stroke="#8A8070" strokeWidth="0.6" strokeOpacity="0.2" />
      <line x1="195" y1="445" x2="275" y2="410" stroke="#C0392B" strokeWidth="0.7" strokeOpacity="0.2" />
      <line x1="50" y1="350" x2="220" y2="180" stroke="#D4A843" strokeWidth="0.6" strokeOpacity="0.15" />
    </svg>
  )
}

// --- DocumentCard ---
type DocStatus = 'available' | 'corrupted' | 'locked' | 'preview'

function DocumentCard({ docNumber, title, description, status, pinColor, onClick }: {
  id: string
  docNumber: string
  title: string
  description: string
  status: DocStatus
  pinColor: 'gold' | 'red' | 'grey'
  onClick?: () => void
}) {
  const pinColors = { gold: '#D4A843', red: '#C0392B', grey: '#3D3B2F' }
  const isClickable = status === 'available' || status === 'preview'

  return (
    <div className="relative pt-3" style={{ cursor: isClickable ? 'pointer' : 'default' }} onClick={isClickable ? onClick : undefined}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
        style={{ background: pinColors[pinColor], border: `2px solid ${pinColor === 'gold' ? '#8A6B1A' : pinColor === 'red' ? '#7A1616' : '#1A1714'}`, boxShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
      />
      <div
        className="p-4 transition-transform duration-150"
        style={{ backgroundColor: status === 'locked' ? '#1A1714' : status === 'preview' ? '#C4BBA2' : '#D8CEB8', border: status === 'locked' ? '1px solid #3D3B2F' : 'none' }}
        onMouseEnter={e => { if (isClickable) (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0px)' }}
      >
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: status === 'locked' ? '#3D3B2F' : '#8A8070', fontFamily: 'var(--font-body)', marginBottom: '4px', textTransform: 'uppercase' }}>
          {docNumber}
        </p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: status === 'locked' ? '#3D3B2F' : '#1A1714', marginBottom: '6px', lineHeight: 1.3 }}>
          {status === 'locked' ? 'Classification pending' : title}
        </p>
        <p style={{ fontSize: '0.7rem', color: status === 'locked' ? '#3D3B2F' : '#5A5040', lineHeight: 1.5, fontFamily: 'var(--font-body)', marginBottom: '8px' }}>
          {description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: status === 'available' ? '#556B57' : status === 'corrupted' ? '#D4A843' : status === 'preview' ? '#8A6B1A' : '#3D3B2F', flexShrink: 0 }} />
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 600, color: status === 'available' ? '#556B57' : status === 'corrupted' ? '#D4A843' : status === 'preview' ? '#8A6B1A' : '#3D3B2F' }}>
            {status === 'available' ? 'Available' : status === 'corrupted' ? 'Corrupted — restore to read' : status === 'preview' ? 'Readable — submission locked' : 'Locked'}
          </p>
        </div>
      </div>
    </div>
  )
}
// --- Archive ---
export default function Archive() {
  const navigate = useNavigate()
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [transmission, setTransmission] = useState(false)
  const [showTransmissions, setShowTransmissions] = useState(false)
  const [agentTransmissions, setAgentTransmissions] = useState<{ id: string; subject: string; body: string; created_at: string }[]>([])
  const [unlockedFiles, setUnlockedFiles] = useState<string[]>(['000'])
  const [letterRead, setLetterRead] = useState(false)
  const [agent, setAgent] = useState<{ codename: string; role: string; rank: string } | null>(null)
  const [loadingAgent, setLoadingAgent] = useState(true)

  useEffect(() => {
    let loaded = false

    async function loadAgentData(userId: string) {
      if (loaded) return
      loaded = true

      const { data: profile } = await supabase
        .from('profiles')
        .select('codename, role, rank')
        .eq('id', userId)
        .maybeSingle()

      if (!profile) { navigate('/signin'); return }

      setAgent(profile)

      const { data: transmissions } = await supabase
        .from('transmissions')
        .select('id, subject, body, created_at, recipient')
        .or(`recipient.eq.all,recipient.eq.${profile.role},recipient.eq.${profile.codename}`)
        .order('created_at', { ascending: false })

      if (transmissions && transmissions.length > 0) {
        setTransmission(true)
        setAgentTransmissions(transmissions)
      }

      const { data: progress } = await supabase
        .from('file_progress')
        .select('file_id')
        .eq('user_id', userId)

      if (progress && progress.length > 0) {
        const unlockedIds = progress.map(p => p.file_id)
        setUnlockedFiles(prev => [...new Set([...prev, ...unlockedIds])])
        if (unlockedIds.includes('001')) setLetterRead(true)
      }

      setLoadingAgent(false)
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') {
        if (session?.user) { loadAgentData(session.user.id) }
        else { navigate('/signin') }
      } else if (event === 'SIGNED_OUT') {
        navigate('/signin')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleUnlock = async (id: string) => {
    if (id === 'waitlist') { navigate('/waitlist-s2'); return }
    if (unlockedFiles.includes(id)) return
    setUnlockedFiles(prev => [...prev, id])
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    await supabase.from('file_progress').insert({ user_id: session.user.id, file_id: id })
  }

  const isUnlocked = (id: string) => unlockedFiles.includes(id)
  const docStatus = (id: string, corrupted = false): DocStatus => {
    if (!isUnlocked(id)) {
      if (id === '002') return 'preview'
      return 'locked'
    }
    if (corrupted) return 'corrupted'
    return 'available'
  }

  if (loadingAgent || !agent) {
    return (
      <div className="min-h-screen bg-bv-void flex items-center justify-center">
        <p className="text-bv-fog text-xs tracking-[0.4em] uppercase animate-pulse">Accessing clearance records...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bv-void text-bv-ash flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>

      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="scratch" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feComposite in="displaced" in2="SourceGraphic" operator="in" />
          </filter>
          <filter id="fade" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feComposite in="displaced" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-y-3 px-4 py-3 md:px-6 md:py-4 border-b border-bv-dust">
        <div className="flex items-center gap-2">
          <img src={bvLogo} alt="BlackVault" className="w-6 h-6 md:w-8 md:h-8 object-contain opacity-90" />
          <p className="text-bv-ash text-[0.6rem] md:text-xs tracking-[0.25em] md:tracking-[0.35em] uppercase" style={{ fontFamily: 'var(--font-display)' }}>
            BlackVault
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 md:gap-6">
          <div className="flex items-center gap-1.5">
            <p className="text-bv-fog text-[0.5rem] md:text-[0.6rem] tracking-[0.2em] uppercase">Codename</p>
            <p className="text-bv-gold text-[0.55rem] md:text-[0.65rem] tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>{agent.codename}</p>
          </div>
          <div className="hidden sm:block w-px h-4 bg-bv-dust" />
          <div className="flex items-center gap-1.5">
            <p className="text-bv-fog text-[0.5rem] md:text-[0.6rem] tracking-[0.2em] uppercase">Role</p>
            <p className="text-bv-ash text-[0.55rem] md:text-[0.65rem] tracking-wide">{agent.role}</p>
          </div>
          <div className="hidden sm:block w-px h-4 bg-bv-dust" />
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-bv-olive" />
            <p className="text-bv-olive text-[0.5rem] md:text-[0.6rem] tracking-[0.2em] uppercase">Active</p>
          </div>
          <div className="hidden sm:block w-px h-4 bg-bv-dust" />
          <button
            onClick={async () => { sessionStorage.removeItem('custodian_verified'); await signOut(); navigate('/signin') }}
            className="text-bv-fog text-[0.5rem] md:text-[0.6rem] tracking-[0.2em] uppercase hover:text-bv-blood transition-colors duration-200 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* File 000 — before letter is read */}
      <AnimatePresence>
        {!letterRead && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center px-6 py-16 gap-8"
          >
            <div className="flex flex-col items-center gap-2">
              <p className="text-bv-fog text-[0.6rem] tracking-[0.5em] uppercase">Newly Received</p>
              <div className="w-12 h-px bg-bv-dust" />
            </div>

            <div
              className="w-full max-w-sm border border-bv-dust bg-bv-vault p-6 flex flex-col gap-5 cursor-pointer hover:border-bv-fog transition-colors duration-300"
              onClick={() => setActiveFile('000')}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-bv-fog text-[0.55rem] tracking-[0.4em] uppercase">Unread</p>
                  <p className="text-bv-ash text-xl tracking-widest mt-1" style={{ fontFamily: 'var(--font-display)' }}>A Letter</p>
                </div>
                <div className="flex flex-col items-end gap-1 mt-1">
                  <p className="text-bv-fog text-[0.55rem] tracking-[0.3em] uppercase">Origin</p>
                  <p className="text-bv-blood text-[0.65rem] tracking-widest animate-pulse">Unknown</p>
                </div>
              </div>
              <div className="h-px bg-bv-dust" />
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-bv-fog text-[0.55rem] tracking-[0.3em] uppercase">Received</p>
                  <p className="text-bv-ash text-[0.65rem] tracking-widest">03:14 UTC</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-bv-fog text-[0.55rem] tracking-[0.3em] uppercase">Sender</p>
                  <p className="text-bv-ash text-[0.65rem] tracking-widest">MOTH_33</p>
                </div>
              </div>
              <p className="text-bv-fog text-[0.6rem] tracking-[0.4em] uppercase text-center pt-1 hover:text-bv-ash transition-colors duration-200">Open →</p>
            </div>

            <p className="text-bv-fog text-[0.55rem] tracking-[0.3em] uppercase opacity-50">Read the letter to access the archive</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wall */}
      <AnimatePresence>
        {letterRead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="flex-1 flex flex-col px-6 py-10 gap-10 relative"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between w-full gap-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h1 className="text-3xl tracking-widest text-bv-ash" style={{ fontFamily: 'var(--font-display)' }}>Operation Kaval</h1>
                <p className="text-bv-fog text-[0.6rem] tracking-[0.2em] uppercase">KVL-007-1963</p>
                <p className="text-bv-gold text-xl" style={{ fontFamily: 'serif', marginLeft: '4px' }}>Ω</p>
              </div>
              <button
                onClick={() => setActiveFile('000')}
                className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase hover:text-bv-ash transition-colors duration-200 cursor-pointer"
              >
                ← Reread the letter
              </button>
            </div>

            {/* MOTH_33 note */}
            <div className="relative">
              <div className="absolute -top-2 left-8 w-3 h-3 rounded-full z-10" style={{ background: '#C0392B', border: '2px solid #7A1616', boxShadow: '0 1px 3px rgba(0,0,0,0.5)' }} />
              <div className="p-4 md:p-5 flex flex-col sm:flex-row gap-4 items-start max-w-2xl" style={{ backgroundColor: '#D8CEB8', borderRadius: '1px' }}>
                <div className="shrink-0 flex flex-col items-center justify-center gap-1" style={{ width: '52px', height: '68px', backgroundColor: '#C8B89A', border: '1px solid rgba(0,0,0,0.15)' }}>
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                    <rect x="1" y="1" width="16" height="20" rx="1" stroke="#7A1616" strokeWidth="1" />
                    <line x1="4" y1="7" x2="14" y2="7" stroke="#7A1616" strokeWidth="0.8" />
                    <line x1="4" y1="10" x2="14" y2="10" stroke="#7A1616" strokeWidth="0.8" />
                    <line x1="4" y1="13" x2="10" y2="13" stroke="#7A1616" strokeWidth="0.8" />
                  </svg>
                  <p style={{ fontSize: '0.5rem', color: '#8A8070', letterSpacing: '0.1em', textTransform: 'uppercase' }}>1 file</p>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <p style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: '#7A1616', fontFamily: 'var(--font-body)', textTransform: 'uppercase', fontWeight: 600 }}>
                    MOTH_33 — Anonymous tip channel
                  </p>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: '#2A2520', lineHeight: 1.6 }}>
                    "KAVAL was real. Subject 7 was my grandfather. He never knew. I found the intake form after he died. The watermark is real. Do with this what you want. I can't hold it anymore."
                  </p>
                  <p style={{ fontSize: '0.6rem', color: '#8A8070', fontFamily: 'var(--font-body)', letterSpacing: '0.1em' }}>
                    Received Tuesday · 03:14
                  </p>
                </div>
              </div>
            </div>

            {/* Document wall */}
            <div className="flex flex-col gap-4 relative">
              <p className="text-bv-fog text-[0.6rem] tracking-[0.2em] uppercase">Case documents — KVL-007</p>
              <div className="relative">
                <WallThreads />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 relative z-10 max-w-2xl">
                  <DocumentCard
                    id="001"
                    docNumber="Document 001"
                    title="Subject Intake Form"
                    description="Heron Foundation, Kavala Station. March 1963. One field unredacted — a case number ending in Ω."
                    status={docStatus('001')}
                    pinColor="gold"
                    onClick={() => setActiveFile('001')}
                  />
                  <DocumentCard
                    id="002"
                    docNumber="Document 002"
                    title="Transit Record — 23 subjects"
                    description="Bird codenames. Nationalities. Release dates. Six carry the Ω marker. One entry has no name at all."
                    status={docStatus('002')}
                    pinColor="gold"
                    onClick={() => setActiveFile('002')}
                  />
                  <DocumentCard
                    id="003"
                    docNumber="Document 003"
                    title="The Parish Memo [1966]"
                    description="Internal dissent. Page two missing."
                    status={docStatus('003')}
                    pinColor="red"
                    onClick={() => isUnlocked('003') ? setActiveFile('003') : undefined}
                  />
                  <DocumentCard
                    id="004"
                    docNumber="Document 004"
                    title="Photograph — Brussels"
                    description="No sender. No note. Arrived forty minutes after MOTH_33."
                    status={docStatus('004')}
                    pinColor="gold"
                    onClick={() => isUnlocked('004') ? setActiveFile('004') : undefined}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transmission panel */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40">
        <button
          onClick={() => setShowTransmissions(true)}
          className="bg-bv-vault border border-bv-dust px-4 py-3 flex flex-col gap-1 cursor-pointer hover:border-bv-fog transition-colors duration-200 text-left"
          style={{ minWidth: '180px' }}
        >
          <p className="text-bv-fog text-[0.55rem] tracking-[0.4em] uppercase">Transmission Panel</p>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-1.5 h-1.5 rounded-full ${transmission ? 'bg-bv-blood animate-pulse' : 'bg-bv-dust'}`} />
            <p className={`text-[0.6rem] tracking-[0.3em] uppercase ${transmission ? 'text-bv-blood' : 'text-bv-fog'}`}>
              {transmission ? 'Signal Detected — Tap to view' : 'No Active Signal'}
            </p>
          </div>
        </button>
      </div>

      {/* Transmission viewer */}
      <AnimatePresence>
        {showTransmissions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bv-void/95 flex items-end md:items-center justify-center z-50 px-4"
            onClick={() => setShowTransmissions(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md bg-bv-vault border border-bv-dust max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-bv-dust">
                <p className="text-bv-ash text-xs tracking-[0.3em] uppercase">Transmissions</p>
                <button onClick={() => setShowTransmissions(false)} className="text-bv-fog hover:text-bv-ash text-xs cursor-pointer">Close</button>
              </div>
              <div className="flex flex-col gap-3 p-5">
                {agentTransmissions.length === 0 ? (
                  <p className="text-bv-fog text-xs tracking-wide">No transmissions received.</p>
                ) : (
                  agentTransmissions.map(t => (
                    <div key={t.id} className="border border-bv-dust bg-bv-void p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <p className="text-bv-gold text-[0.65rem] tracking-[0.2em] uppercase">{t.subject}</p>
                        <p className="text-bv-fog text-[0.55rem] tracking-widest">
                          {new Date(t.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                        </p>
                      </div>
                      <p className="text-bv-ash text-xs leading-relaxed">{t.body}</p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File viewer */}
      <AnimatePresence>
        {activeFile && (
          <FileViewer
            fileId={activeFile}
            onClose={() => setActiveFile(null)}
            isUnlocked={isUnlocked}
            onUnlock={(id) => {
              handleUnlock(id)
              if (activeFile === '000') setLetterRead(true)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}