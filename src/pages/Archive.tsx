import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import bvStamp from '../assets/blackvault-stamp.png'
import bvLogo from '../assets/bv-logo.png'

const agent = {
  codename: 'Pale Fox',
  role: 'Spotter',
  rank: 'Recruit',
}

// --- Puzzle ---
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
// --- FileViewer ---
function FileViewer({
  fileId,
  onClose,
  onUnlock,
}: {
  fileId: string
  onClose: () => void
  onUnlock: (id: string) => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const documentRef = useRef<HTMLDivElement>(null)
  const stampRef = useRef<HTMLImageElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )
    tl.fromTo(documentRef.current,
      { y: '100%' },
      { y: 0, duration: 0.7, ease: 'power4.out' },
      '-=0.1'
    )

    tl.fromTo(stampRef.current,
      { rotation: -30, opacity: 0, scale: 1.4 },
      { rotation: -12, opacity: 0.6, scale: 1, duration: 0.5, ease: 'back.out(2)' },
      '-=0.2'
    )

    if (fileId === '001' && photoRef.current) {
      gsap.fromTo(photoRef.current,
        { filter: 'brightness(10) contrast(0) saturate(0)', opacity: 0.3 },
        { filter: 'brightness(1) contrast(1.1) saturate(0)', opacity: 1, duration: 3, ease: 'power1.inOut', delay: 1.2 }
      )
    }
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
        style={{
          backgroundColor: '#D8CEB8',
          minHeight: '75vh',
          maxHeight: '92vh',
          transform: 'translateY(100%)',
        }}
      >
        {/* Stamp */}
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
          {/* FILE 001 */}
          {fileId === '001' && (
            <div className="flex flex-col gap-5">
              {/* Letterhead */}
              <div className="flex flex-col gap-2 border-b border-black/15 pb-4">
                <p style={{ color: '#7A1616', fontSize: '0.55rem', letterSpacing: '0.5em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                  The Heron Foundation — Humanitarian Resettlement Programme
                </p>
                <p style={{ color: '#2A2520', fontSize: '0.55rem', letterSpacing: '0.3em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                  Kavala Station · Northern Greece · Est. 1958
                </p>

                {/* Frankl quote — motto of the Foundation. Seven letters marked. */}
                <p style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: '0.8rem',
                  color: '#5A5040',
                  lineHeight: 1.7,
                  marginTop: '6px',
                  fontStyle: 'italic',
                }}>
                  "For the meaning of life differs from man to man, from day to day, and from hour to hour.{' '}
                  <span style={{ color: '#7A1616', fontWeight: 600 }}>W</span>hat matters, therefore,{' '}
                  <span style={{ color: '#7A1616', fontWeight: 600 }}>i</span>s not the meaning of{' '}
                  <span style={{ color: '#7A1616', fontWeight: 600 }}>l</span>ife in genera<span style={{ color: '#7A1616', fontWeight: 600 }}>l</span>,{' '}
                  but rather the spec<span style={{ color: '#7A1616', fontWeight: 600 }}>i</span>fic mea<span style={{ color: '#7A1616', fontWeight: 600 }}>n</span>in<span style={{ color: '#7A1616', fontWeight: 600 }}>g</span>{' '}
                  of a person's life at a given moment."
                </p>
                <p style={{
                  fontSize: '0.5rem',
                  color: '#8A8070',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-body)',
                  textTransform: 'uppercase',
                }}>
                  — Viktor E. Frankl
                </p>
              </div>

              {/* Photograph */}
              <div className="flex flex-col items-center gap-2 mb-2">
                <img
                  src="/src/assets/unknown-woman.jpg"
                  alt=""
                  className="w-48"
                  style={{
                    filter: 'grayscale(100%)',
                    border: '1px solid rgba(0,0,0,0.2)',
                    opacity: 0.9,
                  }}
                />
                <p style={{
                  fontSize: '0.55rem',
                  color: '#8A8070',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                }}>
                  Found in subject's personal belongings
                </p>
            </div>

              {/* Form title + case number */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#1A1714', letterSpacing: '0.08em' }}>
                Subject Intake Assessment
              </p>
              <p style={{ fontSize: '0.6rem', color: '#8A8070', fontFamily: 'var(--font-body)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Form HF-7 · Restricted
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p style={{ fontSize: '0.55rem', color: '#8A8070', fontFamily: 'var(--font-body)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Case No.
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: '#7A1616', letterSpacing: '0.1em' }}>
                KVL-007-1963-Ω
              </p>
            </div>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-3">
            {/* Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  Date of Intake
                </p>
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '2px' }}>
                  3 March 1963
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  Station Officer
                </p>
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '2px' }}>
                  ████████
                </p>
              </div>
            </div>

            {/* Row */}
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

            {/* Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  Age
                </p>
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '2px' }}>
                  31
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  Languages
                </p>
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '2px' }}>
                  4
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  Codename
                </p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: '#7A1616', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '2px' }}>
                  STARLING
                </p>
              </div>
            </div>

            {/* Assessor notes */}
            <div className="flex flex-col gap-1 mt-1">
              <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                Assessor Notes
              </p>
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '0.95rem', color: '#2A2520', lineHeight: 1.7 }}>
                Subject presents as highly cooperative. Exceptional verbal intelligence.
                Demonstrates immediate identification with themes of meaning-reconstruction
                post-displacement. Issued standard Kavala reading material on arrival.
                Strong candidate for full Recalibration protocol.
              </p>
            </div>

            {/* Redacted section with angry annotation */}
            <div className="flex flex-col gap-1.5 mt-1 relative">
              <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                Programme Assignment
              </p>
              <div style={{ height: '14px', background: '#2A2520', borderRadius: '1px', width: '100%' }} />
              <div style={{ height: '14px', background: '#2A2520', borderRadius: '1px', width: '75%' }} />
              <div style={{ height: '14px', background: '#2A2520', borderRadius: '1px', width: '90%' }} />

              {/* Someone was here before */}
              <p style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '0.85rem',
                color: '#7A1616',
                transform: 'rotate(-2deg)',
                marginTop: '6px',
                marginLeft: '4px',
                opacity: 0.85,
                lineHeight: 1.4,
              }}>
                He didn't choose this!
              </p>
            </div>

            {/* Authorisation */}
            <div className="flex items-start justify-between mt-2 pt-3 border-t border-black/10 relative">
              <div className="flex flex-col gap-1">
                <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  Authorised by
                </p>
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: '#2A2520' }}>
                  Dr. A. Walsh
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p style={{ fontSize: '0.55rem', color: '#8A8070', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  Classification
                </p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: '#7A1616', letterSpacing: '0.15em' }}>
                  Eyes Only
                </p>
              </div>

              {/* The actual clue — tucked in the corner, small, easy to miss */}
              <p style={{
                position: 'absolute',
                bottom: '0px',
                left: '50%',
                transform: 'translateX(-50%) rotate(1deg)',
                fontFamily: 'var(--font-hand)',
                fontSize: '0.7rem',
                color: '#5A5040',
                opacity: 0.7,
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
              }}>
                Ref: Walsh Protocol p.47 — see subject reading material
              </p>
            </div>

          </div>
          {/* Answer input */}
          <div className="flex flex-col gap-3 border-t border-black/10 pt-4 mt-2">
            <p style={{ color: '#7A1616', fontSize: '0.6rem', letterSpacing: '0.4em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
              Classified — Analyst Input
            </p>
            <p style={{ color: '#2A2520', fontSize: '0.75rem', lineHeight: '1.8', fontFamily: 'var(--font-body)' }}>
              Something on this document is not what it appears. Look carefully at everything, the photograph, the text, the details others might look past.
            </p>
            <AnswerInput answer="WILLING" onUnlock={() => onUnlock('002')} />
          </div>
        </div>
          )}
        {/* FILE 002 placeholder */}
        {fileId === '002' && (
          <div style={{ color: '#2A2520', fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: '2' }}>
            <p style={{ color: '#7A1616', fontSize: '0.6rem', letterSpacing: '0.4em', marginBottom: '1.5rem' }}>
              OPERATION KAVAL — TRANSIT RECORD
            </p>
            <p>Twenty-three subjects. Six countries. One station.</p>
            <br />
            <p>All released. All unaware.</p>
            <br />
            <p>Seven carry the Ω marker. We don't know why yet.</p>
          </div>
        )}

        {/* FILE 003 placeholder */}
        {fileId === '003' && (
          <div style={{ color: '#2A2520', fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: '2' }}>
            <p style={{ color: '#7A1616', fontSize: '0.6rem', letterSpacing: '0.4em', marginBottom: '1.5rem' }}>
              OPERATION KAVAL — INTERNAL DISSENT
            </p>
            <p>She saw it clearly. That's why she had to go.</p>
            <br />
            <p style={{ fontStyle: 'italic' }}>— The Parish Memo, page two missing.</p>
          </div>
        )}
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
    </div >
  )
}

// --- WallThreads ---
// Chaotic strings connecting documents — purely decorative SVG
function WallThreads() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* MOTH note down to Doc 001 */}
      <line x1="120" y1="80" x2="95" y2="195" stroke="#C0392B" strokeWidth="1" strokeOpacity="0.4" />
      {/* MOTH note down to Doc 002 */}
      <line x1="160" y1="85" x2="320" y2="200" stroke="#C0392B" strokeWidth="0.8" strokeOpacity="0.3" />
      {/* Doc 001 across to Doc 002 — crosses */}
      <line x1="180" y1="260" x2="290" y2="215" stroke="#D4A843" strokeWidth="0.8" strokeOpacity="0.35" />
      {/* Doc 001 down to Doc 003 */}
      <line x1="90" y1="310" x2="110" y2="400" stroke="#C0392B" strokeWidth="0.8" strokeOpacity="0.25" />
      {/* Doc 002 down to Doc 004 — near vertical */}
      <line x1="340" y1="305" x2="330" y2="398" stroke="#D4A843" strokeWidth="0.7" strokeOpacity="0.2" />
      {/* Long diagonal — Doc 003 to Doc 002, crosses everything */}
      <line x1="75" y1="420" x2="360" y2="220" stroke="#8A8070" strokeWidth="0.6" strokeOpacity="0.2" />
      {/* Doc 003 to Doc 004 — messy horizontal */}
      <line x1="195" y1="445" x2="275" y2="410" stroke="#C0392B" strokeWidth="0.7" strokeOpacity="0.2" />
      {/* Rogue thread — goes nowhere obvious */}
      <line x1="50" y1="350" x2="220" y2="180" stroke="#D4A843" strokeWidth="0.6" strokeOpacity="0.15" />
    </svg>
  )
}

// --- DocumentCard ---
type DocStatus = 'available' | 'corrupted' | 'locked'

function DocumentCard({
  id,
  docNumber,
  title,
  description,
  status,
  pinColor,
  onClick,
}: {
  id: string
  docNumber: string
  title: string
  description: string
  status: DocStatus
  pinColor: 'gold' | 'red' | 'grey'
  onClick?: () => void
}) {
  const pinColors = {
    gold: '#D4A843',
    red: '#C0392B',
    grey: '#3D3B2F',
  }

  const isClickable = status === 'available'

  return (
    <div
      className="relative pt-3"
      style={{ cursor: isClickable ? 'pointer' : 'default' }}
      onClick={isClickable ? onClick : undefined}
    >
      {/* Pin */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
        style={{
          background: pinColors[pinColor],
          border: `2px solid ${pinColor === 'gold' ? '#8A6B1A' : pinColor === 'red' ? '#7A1616' : '#1A1714'}`,
          boxShadow: `0 1px 3px rgba(0,0,0,0.4)`,
        }}
      />

      {/* Card */}
      <div
        className="p-4 transition-transform duration-150"
        style={{
          backgroundColor: status === 'locked' ? '#1A1714' : '#D8CEB8',
          border: status === 'locked' ? '1px solid #3D3B2F' : 'none',
          transform: 'rotate(0deg)',
        }}
        onMouseEnter={e => { if (isClickable) (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0px)' }}
      >
        <p style={{
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: status === 'locked' ? '#3D3B2F' : '#8A8070',
          fontFamily: 'var(--font-body)',
          marginBottom: '4px',
          textTransform: 'uppercase',
        }}>
          {docNumber}
        </p>

        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          color: status === 'locked' ? '#3D3B2F' : '#1A1714',
          marginBottom: '6px',
          lineHeight: 1.3,
        }}>
          {title}
        </p>

        {status === 'corrupted' && (
          <>
            <p style={{
              fontSize: '0.7rem',
              color: '#5A5040',
              lineHeight: 1.5,
              fontFamily: 'var(--font-body)',
              marginBottom: '8px',
            }}>
              {description}
            </p>
            {/* Redacted lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '8px' }}>
              <div style={{ height: '8px', background: '#2A2520', borderRadius: '1px', width: '85%' }} />
              <div style={{ height: '8px', background: '#2A2520', borderRadius: '1px', width: '60%' }} />
            </div>
          </>
        )}

        {status === 'available' && (
          <p style={{
            fontSize: '0.7rem',
            color: '#5A5040',
            lineHeight: 1.5,
            fontFamily: 'var(--font-body)',
            marginBottom: '8px',
          }}>
            {description}
          </p>
        )}

        {status === 'locked' && (
          <p style={{
            fontSize: '0.7rem',
            color: '#3D3B2F',
            lineHeight: 1.5,
            fontFamily: 'var(--font-body)',
            marginBottom: '8px',
          }}>
            {description}
          </p>
        )}

        {/* Status badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: status === 'available' ? '#556B57' : status === 'corrupted' ? '#D4A843' : '#3D3B2F',
            flexShrink: 0,
          }} />
          <p style={{
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            color: status === 'available' ? '#556B57' : status === 'corrupted' ? '#D4A843' : '#3D3B2F',
          }}>
            {status === 'available' ? 'Available' : status === 'corrupted' ? 'Corrupted — restore to read' : 'Locked'}
          </p>
        </div>
      </div>
    </div>
  )
}

// --- Archive ---
export default function Archive() {
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [transmission] = useState(false)
  const [unlockedFiles, setUnlockedFiles] = useState<string[]>(['000'])
  const [letterRead, setLetterRead] = useState(false)

  const handleUnlock = (id: string) => {
    setUnlockedFiles(prev => prev.includes(id) ? prev : [...prev, id])
  }

  const isUnlocked = (id: string) => unlockedFiles.includes(id)

  const docStatus = (id: string, corrupted = false): DocStatus => {
    if (!isUnlocked(id)) return 'locked'
    if (corrupted) return 'corrupted'
    return 'available'
  }

  return (
    <div
      className="min-h-screen bg-bv-void text-bv-ash flex flex-col"
      style={{ fontFamily: 'var(--font-body)' }}
    >

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-bv-dust">
        <div className="flex items-center gap-3">
          <img src={bvLogo} alt="BlackVault" className="w-8 h-8 object-contain opacity-90" />
          <p className="text-bv-ash text-xs tracking-[0.35em] uppercase" style={{ fontFamily: 'var(--font-display)' }}>
            BlackVault
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <p className="text-bv-fog text-[0.6rem] tracking-[0.25em] uppercase">
              Codename
            </p>
            <p className="text-bv-gold text-[0.65rem] tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
              {agent.codename}
            </p>
          </div>
          <div className="w-px h-4 bg-bv-dust" />
          <div className="flex items-center gap-2">
            <p className="text-bv-fog text-[0.6rem] tracking-[0.25em] uppercase">Role</p>
            <p className="text-bv-ash text-[0.65rem] tracking-widest">{agent.role}</p>
          </div>
          <div className="w-px h-4 bg-bv-dust" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-bv-olive" />
            <p className="text-bv-olive text-[0.6rem] tracking-[0.25em] uppercase">Clearance Active</p>
          </div>
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

            {/* Letter card */}
            <div
              className="w-full max-w-sm border border-bv-dust bg-bv-vault p-6 flex flex-col gap-5 cursor-pointer hover:border-bv-fog transition-colors duration-300"
              onClick={() => setActiveFile('000')}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-bv-fog text-[0.55rem] tracking-[0.4em] uppercase">Unread</p>
                  <p
                    className="text-bv-ash text-xl tracking-widest mt-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    A Letter
                  </p>
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

              <p className="text-bv-fog text-[0.6rem] tracking-[0.4em] uppercase text-center pt-1 hover:text-bv-ash transition-colors duration-200">
                Open →
              </p>
            </div>

            <p className="text-bv-fog text-[0.55rem] tracking-[0.3em] uppercase opacity-50">
              Read the letter to access the archive
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wall — shown after letter is read */}
      <AnimatePresence>
        {letterRead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="flex-1 flex flex-col px-6 py-10 gap-10 relative"
          >

            {/* Wall header */}
            <div className="flex items-baseline justify-between w-full">
              <div className="flex items-baseline gap-4">
                <h1
                  className="text-3xl tracking-widest text-bv-ash"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Operation Kaval
                </h1>
                <p className="text-bv-fog text-[0.6rem] tracking-[0.2em] uppercase">
                  KVL-007-1963
                </p>
                <p
                  className="text-bv-gold text-xl"
                  style={{ fontFamily: 'serif', marginLeft: '4px' }}
                >
                  Ω
                </p>
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
              {/* Red pin */}
              <div
                className="absolute -top-2 left-8 w-3 h-3 rounded-full z-10"
                style={{ background: '#C0392B', border: '2px solid #7A1616', boxShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
              />
              <div
                className="p-4 md:p-5 flex gap-4 items-start max-w-2xl"
                style={{ backgroundColor: '#D8CEB8', borderRadius: '1px' }}
              >
                {/* Attachment thumbnail */}
                <div
                  className="shrink-0 flex flex-col items-center justify-center gap-1"
                  style={{
                    width: '52px',
                    height: '68px',
                    backgroundColor: '#C8B89A',
                    border: '1px solid rgba(0,0,0,0.15)',
                  }}
                >
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                    <rect x="1" y="1" width="16" height="20" rx="1" stroke="#7A1616" strokeWidth="1" />
                    <line x1="4" y1="7" x2="14" y2="7" stroke="#7A1616" strokeWidth="0.8" />
                    <line x1="4" y1="10" x2="14" y2="10" stroke="#7A1616" strokeWidth="0.8" />
                    <line x1="4" y1="13" x2="10" y2="13" stroke="#7A1616" strokeWidth="0.8" />
                  </svg>
                  <p style={{ fontSize: '0.5rem', color: '#8A8070', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    1 file
                  </p>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <p style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.18em',
                    color: '#7A1616',
                    fontFamily: 'var(--font-body)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}>
                    MOTH_33 — Anonymous tip channel
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-hand)',
                    fontSize: '1rem',
                    color: '#2A2520',
                    lineHeight: 1.6,
                  }}>
                    "KAVAL was real. Subject 7 was my grandfather. He never knew. I found the intake form after he died. The watermark is real. Do with this what you want. I can't hold it anymore."
                  </p>
                  <p style={{ fontSize: '0.6rem', color: '#8A8070', fontFamily: 'var(--font-body)', letterSpacing: '0.1em' }}>
                    Received Tuesday · 03:14
                  </p>
                </div>
              </div>
            </div>

            {/* Document wall — relative container for threads */}
            <div className="flex flex-col gap-4 relative">
              <p className="text-bv-fog text-[0.6rem] tracking-[0.2em] uppercase">
                Case documents — KVL-007
              </p>

              <div className="relative">
                {/* Chaotic threads behind cards */}
                <WallThreads />

                {/* Document grid */}
                <div
                  className="grid grid-cols-2 gap-x-6 gap-y-8 relative z-10 max-w-2xl"
                >
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
                    status={docStatus('003', true)}
                    pinColor="red"
                    onClick={() => isUnlocked('003') ? setActiveFile('003') : undefined}
                  />
                  <DocumentCard
                    id="004"
                    docNumber="Document 004"
                    title="— — — — — —"
                    description="Access requires completing prior files."
                    status={docStatus('004')}
                    pinColor="grey"
                  />
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Transmission panel */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40">
        <div className="bg-bv-vault border border-bv-dust px-4 py-3 flex flex-col gap-1" style={{ minWidth: '180px' }}>
          <p className="text-bv-fog text-[0.55rem] tracking-[0.4em] uppercase">Transmission Panel</p>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-1.5 h-1.5 rounded-full ${transmission ? 'bg-bv-blood animate-pulse' : 'bg-bv-dust'}`} />
            <p className={`text-[0.6rem] tracking-[0.3em] uppercase ${transmission ? 'text-bv-blood' : 'text-bv-fog'}`}>
              {transmission ? 'Signal Detected' : 'No Active Signal'}
            </p>
          </div>
          <p className="text-bv-dust text-[0.5rem] tracking-widest mt-0.5 animate-pulse">
            monitoring_
          </p>
        </div>
      </div>

      {/* File viewer */}
      <AnimatePresence>
        {activeFile && (
          <FileViewer
            fileId={activeFile}
            onClose={() => setActiveFile(null)}
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