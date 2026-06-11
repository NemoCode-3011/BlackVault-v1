import { useState } from 'react'
import { LayoutDashboard, FolderLock, Mail, Users, Settings, ChevronLeft, ChevronRight, Activity } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react';
const navItems = [
  { icon: LayoutDashboard, label: 'Overview' },
  { icon: FolderLock, label: 'Files' },
  { icon: Mail, label: 'Inbox' },
  { icon: Users, label: 'Agents' },
  { icon: Settings, label: 'Settings' },
]
const signupData = [
  { day: 'Day 1', agents: 2 },
  { day: 'Day 2', agents: 5 },
  { day: 'Day 3', agents: 3 },
  { day: 'Day 4', agents: 8 },
  { day: 'Day 5', agents: 12 },
  { day: 'Day 6', agents: 7 },
  { day: 'Day 7', agents: 15 },
]

const fileData = [
  { file: 'File 001', opens: 24 },
  { file: 'File 002', opens: 18 },
  { file: 'File 003', opens: 9 },
  { file: 'File 004', opens: 4 },
  { file: 'File 005', opens: 1 },
]

const customTooltipStyle = {
  backgroundColor: '#1A1714',
  border: '1px solid #3D3B2F',
  borderRadius: '0px',
  color: '#E8E0D0',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
}

const fileTypes = ['Evidence', 'Cipher', 'Character', 'Contradiction', 'Breach']
const clearanceLevels = ['Recruit', 'Operative', 'Field Agent', 'Handler', 'Ghost']

const emptyFile = {
  fileNumber: '',
  title: '',
  type: 'Evidence',
  content: '',
  status: 'locked',
  dropDate: '',
  solution: '',
  nextFile: '',
  clearanceLevel: 'Recruit',
  notes: '',
  dependencies: '',
}

const activity = [
  { agent: 'Pale Fox', action: 'Opened File 001', time: '2m ago' },
  { agent: 'Burnt Sage', action: 'Submitted solution for File 001', time: '5m ago' },
  { agent: 'Hollow Raven', action: 'Joined the archive', time: '12m ago' },
  { agent: 'Cold Wren', action: 'Opened File 002', time: '18m ago' },
  { agent: 'Stray Moth', action: 'Submitted incorrect solution', time: '24m ago' },
]

  

export default function Custodian() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState('Overview')



  return (
    <div className="min-h-screen bg-bv-void flex">
      {/* Sidebar */}
      <div className={`relative flex flex-col h-auto border-r border-bv-dust bg-bv-vault transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-6 border-b border-bv-dust">
          <Activity size={18} className="text-bv-blood shrink-0" />
          {!collapsed && (
            <p className="text-bv-ash text-xs tracking-[0.3em] uppercase whitespace-nowrap">
              BlackVault
            </p>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-1 p-2 space-y-2 flex-1">
          {navItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs tracking-[0.2em] uppercase transition-colors duration-200 cursor-pointer
                ${activeNav === label
                  ? 'bg-bv-void text-bv-ash border-l-2 border-bv-blood'
                  : 'text-bv-fog hover:text-bv-ash hover:bg-bv-void/50'
                }`}>
              <Icon size={15} className="shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </button>
          ))}
        </nav>

        {/* Custodian label */}
        {!collapsed && (
          <div className="px-4 py-4 border-t border-bv-dust">
            <p className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Logged in as</p>
            <p className="text-bv-gold text-xs tracking-widest mt-1">The Custodian</p>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-8 w-6 h-6 bg-bv-vault border border-bv-dust flex items-center justify-center cursor-pointer hover:border-bv-gold transition-colors duration-200"
        >
          {collapsed
            ? <ChevronRight size={12} className="text-bv-fog" />
            : <ChevronLeft size={12} className="text-bv-fog" />
          }
        </button>

      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">

        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-bv-dust">
          <div>
            <p className="text-bv-blood text-[0.65rem] tracking-[0.4em] uppercase">
              Operation Kaval
            </p>
            <h1 className="text-bv-ash tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
              {activeNav}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-bv-fog text-[0.65rem] tracking-[0.3em] uppercase">Live</p>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-8">
          {activeNav === 'Overview' && <OverviewPanel />}
          {activeNav === 'Files' && <FilesPanel />}
          {activeNav === 'Inbox' && <InboxPanel />}
          {activeNav === 'Agents' && <AgentsPanel />}
          {activeNav === 'Settings' && <SettingsPanel />}
        </div>

      </div>
    </div>
  )
}

function OverviewPanel() {
  const stats = [
    { label: 'Total Agents', value: '47' },
    { label: 'Active Now', value: '12' },
    { label: 'Files Unlocked', value: '3' },
    { label: 'Messages Sent', value: '8' },
  ]

  return (
    <div className="flex flex-col gap-6 overflow-y-auto">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-bv-vault border rounded-md shadow-xs shadow-bv-fog border-bv-dust p-5 flex flex-col gap-2">
            <p className="text-bv-fog text-[0.65rem] tracking-[0.3em] uppercase">{label}</p>
            <p className="text-bv-ash text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
              {value}
            </p>
          </div>
        ))}
      </div>
      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <div className="grid grid-cols-2 gap-4">
          {/* Agent signups line chart */}
          <div className="bg-bv-vault border border-bv-dust p-5 flex flex-col gap-4">
            <p className="text-bv-fog text-[0.65rem] tracking-[0.3em] uppercase">
              Agent Signups
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={signupData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3D3B2F" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#8A8070', fontSize: 10 }}
                  axisLine={{ stroke: '#3D3B2F' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#8A8070', fontSize: 10 }}
                  axisLine={{ stroke: '#3D3B2F' }}
                  tickLine={false}
                />
                <Tooltip contentStyle={customTooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="agents"
                  stroke="#D4A843"
                  strokeWidth={1.5}
                  dot={{ fill: '#D4A843', r: 3 }}
                  activeDot={{ r: 5, fill: '#D4A843' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* File activity bar chart */}
          <div className="bg-bv-vault border border-bv-dust p-5 flex flex-col gap-4">
            <p className="text-bv-fog text-[0.65rem] tracking-[0.3em] uppercase">
              File Activity
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={fileData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3D3B2F" />
                <XAxis
                  dataKey="file"
                  tick={{ fill: '#8A8070', fontSize: 10 }}
                  axisLine={{ stroke: '#3D3B2F' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#8A8070', fontSize: 10 }}
                  axisLine={{ stroke: '#3D3B2F' }}
                  tickLine={false}
                />
                <Tooltip contentStyle={customTooltipStyle} />
                <Bar dataKey="opens" fill="#AD0217" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </motion.div>
      {/* Live activity feed */}
      <div className="bg-bv-vault border border-bv-dust p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-bv-fog text-[0.65rem] tracking-[0.3em] uppercase">
            Live Activity
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-bv-fog text-[0.6rem] tracking-[0.2em] uppercase">Live</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {activity.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2.5 border-b border-bv-dust last:border-0">
              <div className="flex items-center gap-4">
                <p className="text-bv-gold text-xs tracking-wide">{item.agent}</p>
                <p className="text-bv-fog text-xs tracking-wide">{item.action}</p>
              </div>
              <p className="text-bv-fog text-[0.6rem] tracking-widest">{item.time}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

function FilesPanel() {
  const [files, setFiles] = useState<typeof emptyFile[]>([])
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState(emptyFile)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.fileNumber || !form.title) return
    setFiles([...files, form])
    setForm(emptyFile)
    setCreating(false)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-bv-blood text-[0.65rem] tracking-[0.4em] uppercase">Archive Control</p>
          <h2 className="text-bv-ash text-xl tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
            Operation Kaval Files
          </h2>
        </div>
        <button
          onClick={() => setCreating(!creating)}
          className="border border-bv-blood text-bv-ash text-[0.7rem] tracking-[0.3em] uppercase px-5 py-2.5 hover:bg-bv-blood/10 transition-colors duration-200 cursor-pointer" style={{ fontFamily: 'var(--font-display)' }}>
          {creating ? 'Cancel' : '+ Initiate File'}
        </button>
      </div>

      {/* Create form */}
      {creating && (
        <div className="bg-bv-vault border border-bv-dust p-6 flex flex-col gap-5">
          <p className="text-bv-fog text-[0.65rem] tracking-[0.4em] uppercase border-b border-bv-dust pb-3 ">
            New File Record
          </p>

          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">File Number</label>
              <input
                name="fileNumber"
                placeholder="001"
                value={form.fileNumber}
                onChange={handleChange}
                className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 placeholder:text-bv-fog"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Title</label>
              <input
                name="title"
                placeholder="Subject 006 Reintegration Report"
                value={form.title}
                onChange={handleChange}
                className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 placeholder:text-bv-fog"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 cursor-pointer"
              >
                {fileTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 cursor-pointer"
              >
                <option value="locked">Locked</option>
                <option value="unlocked">Unlocked</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Drop Date</label>
              <input
                type="date"
                name="dropDate"
                value={form.dropDate}
                onChange={handleChange}
                className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Solution</label>
              <input
                name="solution"
                placeholder="OWN"
                value={form.solution}
                onChange={handleChange}
                className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 placeholder:text-bv-fog"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Next File</label>
              <input
                name="nextFile"
                placeholder="002"
                value={form.nextFile}
                onChange={handleChange}
                className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 placeholder:text-bv-fog"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Clearance Level</label>
              <select
                name="clearanceLevel"
                value={form.clearanceLevel}
                onChange={handleChange}
                className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 cursor-pointer"
              >
                {clearanceLevels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Dependencies</label>
              <input
                name="dependencies"
                placeholder="001, 002"
                value={form.dependencies}
                onChange={handleChange}
                className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 placeholder:text-bv-fog"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2">
            <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Content</label>
            <textarea
              name="content"
              placeholder="File content visible to agents..."
              value={form.content}
              onChange={handleChange}
              rows={4}
              className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 placeholder:text-bv-fog resize-none"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Custodian Notes</label>
            <textarea
              name="notes"
              placeholder="Private notes. Agents cannot see this."
              value={form.notes}
              onChange={handleChange}
              rows={2}
              className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 placeholder:text-bv-fog resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full border border-bv-gold text-bv-gold text-[0.7rem] tracking-[0.4em] uppercase py-3 hover:bg-bv-gold/10 transition-colors duration-200 cursor-pointer" style={{ fontFamily: 'var(--font-display)' }}>
            Release to Archive
          </button>
        </div>
      )}

      {/* Files list */}
      <div className="flex flex-col gap-2">
        {files.length === 0 ? (
          <div className="bg-bv-vault border border-bv-dust p-8 flex items-center justify-center">
            <p className="text-bv-fog text-xs tracking-[0.4em] uppercase">No files in the archive yet.</p>
          </div>
        ) : (
          files.map((file, index) => (
            <div key={index} className="bg-bv-vault border border-bv-dust px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <p className="text-bv-gold text-xs tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
                  FILE {file.fileNumber}
                </p>
                <p className="text-bv-ash text-sm tracking-wide">{file.title}</p>
                <p className="text-bv-fog text-[0.65rem] tracking-widest uppercase">{file.type}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className={`text-[0.65rem] tracking-[0.3em] uppercase ${file.status === 'locked' ? 'text-bv-blood' : 'text-bv-gold'}`}>
                  {file.status}
                </p>
                <p className="text-bv-fog text-[0.6rem] tracking-widest">{file.dropDate || '—'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function InboxPanel() {
  const [messages, setMessages] = useState<{
    id: string
    to: string
    subject: string
    body: string
    sentAt: string
  }[]>([])
  const [composing, setComposing] = useState(false)
  const [form, setForm] = useState({ to: 'all', subject: '', body: '' })
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSend = () => {
    if (!form.subject || !form.body) return
    setMessages([...messages, {
      id: crypto.randomUUID(),
      ...form,
      sentAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
      })
    }])
    setForm({ to: 'all', subject: '', body: '' })
    setComposing(false)
  }

  const handleDelete = (id: string) => {
  setMessages(messages.filter(msg => msg.id !== id))
}

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-bv-blood text-[0.65rem] tracking-[0.4em] uppercase">Classified Communications</p>
          <h2 className="text-bv-ash text-xl tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
            Agent Inbox
          </h2>
        </div>
        <button
          onClick={() => setComposing(!composing)}
          className="border border-bv-blood text-bv-ash text-[0.7rem] tracking-[0.3em] uppercase px-5 py-2.5 hover:bg-bv-blood/10 transition-colors duration-200 cursor-pointer"
        >
          {composing ? 'Cancel' : '+ Compose Message'}
        </button>
      </div>

      {/* Compose form */}
      {composing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-bv-vault border border-bv-dust p-6 flex flex-col gap-5"
        >
          <p className="text-bv-fog text-[0.65rem] tracking-[0.4em] uppercase border-b border-bv-dust pb-3">
            New Transmission
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Recipient</label>
              <select
                name="to"
                value={form.to}
                onChange={handleChange}
                className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 cursor-pointer"
              >
                <option value="all">All Agents</option>
                <option value="Intelligence Officer">Intelligence Officers</option>
                <option value="Mole">Moles</option>
                <option value="Cryptanalyst">Cryptanalysts</option>
                <option value="Spotter">Spotters</option>
                <option value="Defector">Defectors</option>
                <option value="lone-wolf">Lone Wolves</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Subject</label>
              <input
                name="subject"
                placeholder="Transmission subject..."
                value={form.subject}
                onChange={handleChange}
                className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 placeholder:text-bv-fog"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Message</label>
            <textarea
              name="body"
              placeholder="Your transmission to the agents..."
              value={form.body}
              onChange={handleChange}
              rows={5}
              className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 placeholder:text-bv-fog resize-none"
            />
          </div>

          <button
            onClick={handleSend}
            className="w-full border border-bv-gold text-bv-gold text-[0.7rem] tracking-[0.4em] uppercase py-3 hover:bg-bv-gold/10 transition-colors duration-200 cursor-pointer"
          >
            Transmit
          </button>
        </motion.div>
      )}

      {/* Sent messages */}
      <div className="flex flex-col gap-2">
        {messages.length === 0 ? (
          <div className="bg-bv-vault border border-bv-dust p-8 flex items-center justify-center">
            <p className="text-bv-fog text-xs tracking-[0.4em] uppercase">No transmissions sent yet.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="bg-bv-vault border border-bv-dust px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <p className="text-bv-blood text-[0.65rem] tracking-[0.3em] uppercase">{msg.to}</p>
                <p className="text-bv-ash text-sm tracking-wide">{msg.subject}</p>
              </div>
              <div className='flex gap-5'>
                <p className="text-bv-fog text-[0.6rem] tracking-widest">{msg.sentAt}</p>
               <button 
               onClick={()=> handleDelete(msg.id)}
               className='text-bv-blood text-[0.6rem] tracking-widest'><Trash2 size={15}/></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function AgentsPanel() {
  const dummyAgents = [
    { codename: 'Pale Fox', role: 'Cryptanalyst', clearance: 'Operative', lastActive: '2m ago', solo: false },
    { codename: 'Burnt Sage', role: 'Spotter', clearance: 'Recruit', lastActive: '5m ago', solo: false },
    { codename: 'Cold Wren', role: 'Mole', clearance: 'Recruit', lastActive: '11m ago', solo: true },
    { codename: 'Dim Raven', role: 'Defector', clearance: 'Field Agent', lastActive: '18m ago', solo: false },
    { codename: 'Stray Moth', role: 'Intelligence Officer', clearance: 'Recruit', lastActive: '24m ago', solo: true },
  ]

  return (
    <div className="flex flex-col gap-6">

      <div>
        <p className="text-bv-blood text-[0.65rem] tracking-[0.4em] uppercase">Personnel</p>
        <h2 className="text-bv-ash text-xl tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
          Active Agents
        </h2>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-5 px-5 py-2 border-b border-bv-dust">
        {['Codename', 'Role', 'Clearance', 'Track', 'Last Active'].map(h => (
          <p key={h} className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">{h}</p>
        ))}
      </div>

      {/* Agent rows */}
      <div className="flex flex-col gap-1">
        {dummyAgents.map((agent, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="grid grid-cols-5 px-5 py-3 bg-bv-vault border border-bv-dust hover:border-bv-fog transition-colors duration-200"
          >
            <p className="text-bv-gold text-xs tracking-widest">{agent.codename}</p>
            <p className="text-bv-ash text-xs tracking-wide">{agent.role}</p>
            <p className="text-bv-fog text-xs tracking-wide">{agent.clearance}</p>
            <p className={`text-xs tracking-wide ${agent.solo ? 'text-bv-blood' : 'text-bv-fog'}`}>
              {agent.solo ? 'Lone Wolf' : 'Team'}
            </p>
            <p className="text-bv-fog text-xs tracking-widest">{agent.lastActive}</p>
          </motion.div>
        ))}
      </div>

    </div>
  )
}

function SettingsPanel() {
  const [settings, setSettings] = useState({
    vaultName: 'BlackVault',
    operationName: 'Operation Kaval',
    maintenanceMode: false,
    newSignups: true,
    weeklyDrops: true,
  })

  const toggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  return (
    <div className="flex flex-col gap-6">

      <div>
        <p className="text-bv-blood text-[0.65rem] tracking-[0.4em] uppercase">System</p>
        <h2 className="text-bv-ash text-xl tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
          Settings
        </h2>
      </div>

      {/* General */}
      <div className="bg-bv-vault border border-bv-dust p-6 flex flex-col gap-5">
        <p className="text-bv-fog text-[0.65rem] tracking-[0.4em] uppercase border-b border-bv-dust pb-3">
          General
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Vault Name</label>
            <input
              value={settings.vaultName}
              onChange={e => setSettings({ ...settings, vaultName: e.target.value })}
              className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Operation Name</label>
            <input
              value={settings.operationName}
              onChange={e => setSettings({ ...settings, operationName: e.target.value })}
              className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="bg-bv-vault border border-bv-dust p-6 flex flex-col gap-5">
        <p className="text-bv-fog text-[0.65rem] tracking-[0.4em] uppercase border-b border-bv-dust pb-3">
          Controls
        </p>
        {[
          { key: 'maintenanceMode', label: 'Maintenance Mode', description: 'Lock all agents out of the vault' },
          { key: 'newSignups', label: 'New Signups', description: 'Allow new agents to request clearance' },
          { key: 'weeklyDrops', label: 'Weekly File Drops', description: 'Automatically release scheduled files' },
        ].map(({ key, label, description }) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <p className="text-bv-ash text-xs tracking-wide">{label}</p>
              <p className="text-bv-fog text-[0.65rem] tracking-wide mt-0.5">{description}</p>
            </div>
            <div
              onClick={() => toggle(key as keyof typeof settings)}
              className={`w-10 h-5 border relative cursor-pointer transition-colors duration-200 ${settings[key as keyof typeof settings] ? 'border-bv-gold bg-bv-gold/20' : 'border-bv-dust'}`}
            >
              <div className={`absolute top-0.5 w-3.5 h-3.5 transition-all duration-200 ${settings[key as keyof typeof settings] ? 'left-5 bg-bv-gold' : 'left-0.5 bg-bv-fog'}`} />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
