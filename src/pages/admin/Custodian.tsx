import { useState, useEffect } from 'react'
import { LayoutDashboard, FolderLock, Mail, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react';
import bvLogo from '../../assets/bv-logo.png'
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../../lib/auth'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview' },
  { icon: FolderLock, label: 'Files' },
  { icon: Mail, label: 'Inbox' },
  { icon: Users, label: 'Agents' },
  { icon: Settings, label: 'Settings' },
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


export default function Custodian() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState('Overview')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bv-void flex">
      {/* Sidebar */}
      <div className={`relative flex flex-col h-auto border-r border-bv-dust bg-bv-vault transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-6 border-b border-bv-dust relative">
          <img src={bvLogo} alt="" className="w-10 h-10 object-contain" />
          {!collapsed && (
            <p className="text-bv-ash text-xs tracking-[0.3em] uppercase whitespace-nowrap" style={{ fontFamily: 'var(--font-body)' }}>
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
          <div className="px-4 py-4 border-t border-bv-dust flex flex-col gap-3">
            <div>
              <p className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">Logged in as</p>
              <p className="text-bv-gold text-xs tracking-widest mt-1">The Custodian</p>
            </div>
            <button
              onClick={async () => {
                sessionStorage.removeItem('custodian_verified')
                await signOut()
                navigate('/custodian-login')
              }}
              className="text-bv-fog text-[0.6rem] tracking-[0.25em] uppercase hover:text-bv-blood transition-colors duration-200 cursor-pointer self-start"
            >
              Sign Out
            </button>
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
  const [stats, setStats] = useState({
    totalAgents: 0,
    soloAgents: 0,
    filesUnlocked: 0,
    messagesSent: 0,
  })
  const [signupData, setSignupData] = useState<{ day: string; agents: number }[]>([])
  const [fileData, setFileData] = useState<{ file: string; opens: number }[]>([])
  const [activity, setActivity] = useState<{ agent: string; action: string; time: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOverview() {
      const { count: totalAgents } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      const { count: soloAgents } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('solo', true)

      const { count: filesUnlocked } = await supabase
        .from('file_progress')
        .select('*', { count: 'exact', head: true })

      const { count: messagesSent } = await supabase
        .from('transmissions')
        .select('*', { count: 'exact', head: true })

      setStats({
        totalAgents: totalAgents ?? 0,
        soloAgents: soloAgents ?? 0,
        filesUnlocked: filesUnlocked ?? 0,
        messagesSent: messagesSent ?? 0,
      })

      const { data: profiles } = await supabase
        .from('profiles')
        .select('created_at')
        .order('created_at', { ascending: true })

      if (profiles) {
        const grouped: Record<string, number> = {}
        profiles.forEach(p => {
          const day = new Date(p.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
          grouped[day] = (grouped[day] || 0) + 1
        })
        setSignupData(Object.entries(grouped).map(([day, agents]) => ({ day, agents })))
      }

      const { data: progress } = await supabase
        .from('file_progress')
        .select('file_id')

      if (progress) {
        const grouped: Record<string, number> = {}
        progress.forEach(p => {
          grouped[p.file_id] = (grouped[p.file_id] || 0) + 1
        })
        setFileData(
          Object.entries(grouped)
            .map(([file, opens]) => ({ file: `File ${file}`, opens }))
            .sort((a, b) => a.file.localeCompare(b.file))
        )
      }

      const { data: recentProgress } = await supabase
        .from('file_progress')
        .select('file_id, unlocked_at, user_id')
        .order('unlocked_at', { ascending: false })
        .limit(5)

      if (recentProgress) {
        const userIds = recentProgress.map(r => r.user_id)
        const { data: profileNames } = await supabase
          .from('profiles')
          .select('id, codename')
          .in('id', userIds)

        const nameMap: Record<string, string> = {}
        profileNames?.forEach(p => { nameMap[p.id] = p.codename })

        setActivity(
          recentProgress.map(r => ({
            agent: nameMap[r.user_id] || 'Unknown',
            action: `Unlocked File ${r.file_id}`,
            time: new Date(r.unlocked_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
          }))
        )
      }

      setLoading(false)
    }

    fetchOverview()
  }, [])

  const statCards = [
    { label: 'Total Agents', value: stats.totalAgents },
    { label: 'Lone Wolves', value: stats.soloAgents },
    { label: 'Files Unlocked', value: stats.filesUnlocked },
    { label: 'Messages Sent', value: stats.messagesSent },
  ]

  if (loading) {
    return <p className="text-bv-fog text-xs tracking-[0.3em] uppercase">Loading overview...</p>
  }

  return (
    <div className="flex flex-col gap-6 overflow-y-auto">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {statCards.map(({ label, value }) => (
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
            {signupData.length === 0 ? (
              <p className="text-bv-fog text-xs tracking-wide py-8 text-center">No signups yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={signupData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3D3B2F" />
                  <XAxis dataKey="day" tick={{ fill: '#8A8070', fontSize: 10 }} axisLine={{ stroke: '#3D3B2F' }} tickLine={false} />
                  <YAxis tick={{ fill: '#8A8070', fontSize: 10 }} axisLine={{ stroke: '#3D3B2F' }} tickLine={false} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Line type="monotone" dataKey="agents" stroke="#D4A843" strokeWidth={1.5} dot={{ fill: '#D4A843', r: 3 }} activeDot={{ r: 5, fill: '#D4A843' }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* File activity bar chart */}
          <div className="bg-bv-vault border border-bv-dust p-5 flex flex-col gap-4">
            <p className="text-bv-fog text-[0.65rem] tracking-[0.3em] uppercase">
              File Activity
            </p>
            {fileData.length === 0 ? (
              <p className="text-bv-fog text-xs tracking-wide py-8 text-center">No file activity yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={fileData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3D3B2F" />
                  <XAxis dataKey="file" tick={{ fill: '#8A8070', fontSize: 10 }} axisLine={{ stroke: '#3D3B2F' }} tickLine={false} />
                  <YAxis tick={{ fill: '#8A8070', fontSize: 10 }} axisLine={{ stroke: '#3D3B2F' }} tickLine={false} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Bar dataKey="opens" fill="#AD0217" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </motion.div>

      {/* Live activity feed */}
      <div className="bg-bv-vault border border-bv-dust p-5 flex flex-col gap-4">
        <p className="text-bv-fog text-[0.65rem] tracking-[0.3em] uppercase">
          Recent Activity
        </p>
        <div className="flex flex-col gap-2">
          {activity.length === 0 ? (
            <p className="text-bv-fog text-xs tracking-wide">No activity yet.</p>
          ) : (
            activity.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2.5 border-b border-bv-dust last:border-0">
                <div className="flex items-center gap-4">
                  <p className="text-bv-gold text-xs tracking-wide">{item.agent}</p>
                  <p className="text-bv-fog text-xs tracking-wide">{item.action}</p>
                </div>
                <p className="text-bv-fog text-[0.6rem] tracking-widest">{item.time}</p>
              </div>
            ))
          )}
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
    recipient: string
    subject: string
    body: string
    created_at: string
  }[]>([])
  const [composing, setComposing] = useState(false)
  const [form, setForm] = useState({ recipient: 'all', subject: '', body: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('transmissions')
      .select('id, recipient, subject, body, created_at')
      .order('created_at', { ascending: false })

    if (!error && data) {

      setMessages(data)
    }
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSend = async () => {
    if (!form.subject || !form.body) return

    const { error } = await supabase
      .from('transmissions')
      .insert({
        recipient: form.recipient,
        subject: form.subject,
        body: form.body,
        sent_by: 'Custodian',
      })

    if (!error) {
      setForm({ recipient: 'all', subject: '', body: '' })
      setComposing(false)
      fetchMessages()
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('transmissions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete failed:', error)
      return
    }

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
                name="recipient"
                value={form.recipient}
                onChange={handleChange}
                className="bg-bv-void border border-bv-dust text-bv-ash text-sm px-3 py-2.5 outline-none focus:border-bv-gold transition-colors duration-200 cursor-pointer"
              >
                <option value="all">All Agents</option>
                <option value="Intelligence Officer">Intelligence Officers</option>
                <option value="Mole">Moles</option>
                <option value="Cryptanalyst">Cryptanalysts</option>
                <option value="Spotter">Spotters</option>
                <option value="Defector">Defectors</option>
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
      {loading ? (
        <p className="text-bv-fog text-xs tracking-[0.3em] uppercase">Loading transmissions...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {messages.length === 0 ? (
            <div className="bg-bv-vault border border-bv-dust p-8 flex items-center justify-center">
              <p className="text-bv-fog text-xs tracking-[0.4em] uppercase">No transmissions sent yet.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="bg-bv-vault border border-bv-dust px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <p className="text-bv-blood text-[0.65rem] tracking-[0.3em] uppercase">{msg.recipient}</p>
                  <p className="text-bv-ash text-sm tracking-wide">{msg.subject}</p>
                </div>
                <div className="flex gap-5">
                  <p className="text-bv-fog text-[0.6rem] tracking-widest">
                    {new Date(msg.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-bv-blood text-[0.6rem] tracking-widest cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

function AgentsPanel() {
  const [agents, setAgents] = useState<{
    codename: string
    role: string
    rank: string
    solo: boolean
    created_at: string
  }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAgents() {
      const { data, error } = await supabase
        .from('profiles')
        .select('codename, role, rank, solo, created_at')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setAgents(data)
      }
      setLoading(false)
    }

    fetchAgents()
  }, [])

  return (
    <div className="flex flex-col gap-6">

      <div>
        <p className="text-bv-blood text-[0.65rem] tracking-[0.4em] uppercase">Personnel</p>
        <h2 className="text-bv-ash text-xl tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
          Active Agents
        </h2>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-4 px-5 py-2 border-b border-bv-dust">
        {['Codename', 'Role', 'Rank', 'Joined'].map(h => (
          <p key={h} className="text-bv-fog text-[0.6rem] tracking-[0.3em] uppercase">{h}</p>
        ))}
      </div>

      {/* Agent rows */}
      {loading ? (
        <p className="text-bv-fog text-xs tracking-[0.3em] uppercase">Loading agents...</p>
      ) : agents.length === 0 ? (
        <div className="bg-bv-vault border border-bv-dust p-8 flex items-center justify-center">
          <p className="text-bv-fog text-xs tracking-[0.4em] uppercase">No agents have signed up yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {agents.map((agent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="grid grid-cols-4 px-5 py-3 bg-bv-vault border border-bv-dust hover:border-bv-fog transition-colors duration-200">
              <p className="text-bv-gold text-xs tracking-widest">{agent.codename}</p>
              <p className="text-bv-ash text-xs tracking-wide">{agent.role}</p>
              <p className="text-bv-fog text-xs tracking-wide">{agent.rank}</p>
              <p className="text-bv-fog text-xs tracking-widest">
                {new Date(agent.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
              </p>
            </motion.div>
          ))}
        </div>
      )}
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
