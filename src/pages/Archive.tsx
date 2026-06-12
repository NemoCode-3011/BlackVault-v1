import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import bvStamp from '../assets/blackvault-stamp.png'

// Dummy data, willreplace with Supabase later
const agent = {
  codename: 'Pale Fox',
  role: 'Spotter',
  rank: 'Recruit',
}

const files = [
  { id: '000', title: 'Origin Unknown', status: 'available', date: '03:17 UTC' },
  { id: '001', title: 'Subject 006', status: 'locked', date: null },
  { id: '002', title: 'Site Echo', status: 'locked', date: null },
  { id: '003', title: 'Contradiction', status: 'locked', date: null },
]

export default function Archive() {
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [transmission] = useState(false)

  return (
    <div className="min-h-screen bg-bv-void text-bv-ash flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Top bar */}
      <div className="flex items-start justify-between px-6 py-5 border-b border-bv-dust">
        {/* Left — BLACKVAULT */}
        <div className="flex items-center gap-3">
          <img src={bvStamp} alt="BlackVault" className="w-8 h-8 opacity-70" />
          <p className="text-bv-ash text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-body)' }}>BlackVault</p>
        </div>

        {/* Right — Agent info */}
        <div className="flex flex-col items-end gap-1">
          <p className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">
            Rank: <span className="text-bv-olive">{agent.rank}</span>
          </p>
          <p className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">
            Codename: <span className="text-bv-ash">{agent.codename}</span>
          </p>
          <p className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">
            Role: <span className="text-bv-ash">{agent.role}</span>
          </p>
        </div>

      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-12">

        {/* Newly received material */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-8 w-full max-w-md"
        >
          <div className="flex flex-col items-center gap-1">
            <p className="text-bv-blood text-[0.65rem] tracking-[0.5em] uppercase" style={{ fontFamily: 'var(--font-body)'}}>
              Newly Received Material
            </p>
            <div className="w-16 h-px bg-bv-dust mt-1" />
          </div>
          {/* File 000 card */}
          <div className="w-full bg-bv-vault border border-bv-dust p-6 flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-bv-fog text-[0.6rem] tracking-[0.4em] uppercase">File</p>
                <p className="text-bv-ash text-2xl tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
                  000
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Origin</p>
                <p className="text-bv-ash text-xs tracking-wide">Unknown</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 border-t border-bv-dust pt-4">
              <div className="flex items-center justify-between">
                <p className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Date Received</p>
                <p className="text-bv-ash text-xs tracking-widest">03:17 UTC</p>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Status</p>
                <p className="text-bv-blood text-[0.65rem] tracking-[0.3em] uppercase animate-pulse">
                  Unread
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveFile('000')}
              className="w-full border border-bv-ash text-bv-ash text-[0.7rem] tracking-[0.5em] uppercase py-3 hover:bg-bv-ash/5 transition-colors duration-300 cursor-pointer mt-2">
              Open File
            </button>
          </div>
        </motion.div>
        {/* Archive section — appears after file 000 is read */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-md flex flex-col gap-4">
          <div className="flex flex-col items-center gap-1">
            <p className="text-bv-fog text-[0.6rem] tracking-[0.5em] uppercase">Archive</p>
            <div className="w-16 h-px bg-bv-dust mt-1" />
          </div>
          <div className="flex flex-col gap-2">
            {files.slice(1).map((file) => (
              <div
                key={file.id}
                className={`w-full border px-5 py-4 flex items-center justify-between
                  ${file.status === 'available'
                    ? 'border-bv-dust bg-bv-vault cursor-pointer hover:border-bv-ash transition-colors duration-200'
                    : 'border-bv-dust/30 bg-bv-vault/30 cursor-not-allowed opacity-40'
                  }`}
                onClick={() => file.status === 'available' && setActiveFile(file.id)}
              >
                <div className="flex items-center gap-4">
                  <p className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">
                    File {file.id}
                  </p>
                  <p className="text-bv-ash text-xs tracking-wide">{file.title}</p>
                </div>
                <p className={`text-[0.6rem] tracking-[0.3em] uppercase ${file.status === 'locked' ? 'text-bv-blood' : 'text-bv-olive'}`}>
                  {file.status}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Bottom right — Transmission panel */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
        <div className="bg-bv-vault border border-bv-dust px-4 py-3 flex flex-col gap-1 min-w-48">
          <p className="text-bv-fog text-[0.55rem] tracking-[0.4em] uppercase">
            Incoming Transmission
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-1.5 h-1.5 rounded-full ${transmission ? 'bg-bv-blood animate-pulse' : 'bg-bv-dust'}`} />
            <p className={`text-[0.6rem] tracking-[0.3em] uppercase ${transmission ? 'text-bv-blood' : 'text-bv-fog'}`}>
              {transmission ? 'Signal Detected' : 'No Active Signal'}
            </p>
          </div>
        </div>
      </div>
      {/* File viewer modal */}
      <AnimatePresence>
        {activeFile && (
          <FileViewer
            fileId={activeFile}
            onClose={() => setActiveFile(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
function FileViewer({ fileId, onClose }: { fileId: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 bg-bv-void/95 flex items-end justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="w-full max-w-2xl bg-bv-paper mb-0 relative overflow-y-auto"
        onClick={e => e.stopPropagation()}
        style={{ backgroundColor: '#D8CEB8', minHeight: '70vh', maxHeight: '90vh'  }}>
        {/* Stamp */}
        <div className="absolute top-6 right-6 opacity-50 rotate-[-12deg]">
          <img src={bvStamp} alt="classified" className="w-24 h-24" />
        </div>

        {/* Document content */}
        <div className="p-10 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-bv-stamp text-[0.65rem] tracking-[0.4em] uppercase"
              style={{ color: '#7A1616', fontFamily: 'var(--font-body)' }}>
              Classified Eyes Only
            </p>
            <h2 className="text-2xl tracking-widest"
              style={{ color: '#1A1714', fontFamily: 'var(--font-display)' }}>
              File {fileId}
            </h2>
          </div>
          <div className="h-px bg-black/10" />
          <p style={{ color: '#2A2520', fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: '1.8' }}>
            {fileId === '000' && (
              <>
                You were not supposed to find this archive.<br /><br />
                These files were sealed in 1971.<br /><br />
                Someone uploaded them.<br /><br />
                We do not know who.<br />
                We do not know why.<br /><br />
                You now have access to the records that survived.<br /><br />
                The files have been arranged in the order they were recovered.<br /><br />
                Not every document is complete.<br />
                Not every witness is reliable.<br />
                Not every record agrees with the next.<br /><br />
                Start with File 001.<br /><br />
                If there are answers here, that's where they begin.<br /><br />
                <span style={{ color: '#7A1616', letterSpacing: '0.2em', fontSize: '0.75rem' }}>
                  — ORIGIN UNKNOWN
                </span>
              </>
            )}
          </p>
          <button
            onClick={onClose}
            className="self-start text-[0.65rem] tracking-[0.4em] uppercase mt-4 hover:opacity-60 transition-opacity duration-200 cursor-pointer"
            style={{ color: '#7A1616' }}
          >
            Close File
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}