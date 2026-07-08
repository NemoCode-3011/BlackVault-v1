import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
export default function Meridian() {
  const [scrubbed, setScrubbed] = useState(false)

  useEffect(() => {
    const checkExposure = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data } = await supabase
        .from('file_progress')
        .select('file_id')
        .eq('user_id', session.user.id)
        .eq('file_id', '004')
        .maybeSingle()

      if (data) setScrubbed(true)
    }
    checkExposure()
  }, [])
  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      background: '#FAFAF8',
      minHeight: '100vh',
      width: '100%',
      color: '#1A1A1A',
      overflowX: 'hidden',
    }}>

      {/* Hidden comment in source — this is what players are looking for */}
      {/* 
        INTERNAL REF: PROTOCOL GREY — EYES ONLY
        If you are reading this you should not be here.
        VANTAGE is watching.
        Key: STARLINGWASCHOSEN
      */}

      {/* Nav */}
      <nav className="flex items-center justify-between border-b px-4 md:px-12 h-16 flex-wrap gap-2"
        style={{ borderColor: '#E0DDD8', background: '#FFFFFF' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center" style={{ background: '#1A3A2A' }}>
            <div className="w-3 h-3 border" style={{ borderColor: '#FAFAF8', borderWidth: '1.5px' }} />
          </div>
          <span
            className="text-[0.7rem] md:text-[0.85rem] tracking-widest md:tracking-[0.15em] uppercase font-semibold"
            style={{ color: '#1A3A2A', fontFamily: 'Arial, sans-serif' }}
          >
            Meridian Institute
          </span>
        </div>
        <div
          className="hidden sm:flex gap-4 md:gap-8 text-[0.75rem] md:text-[0.8rem]"
          style={{ color: '#4A4A4A', fontFamily: 'Arial, sans-serif', letterSpacing: '0.05em' }}
        >
          {['About', 'Research', 'People', 'Contact'].map(item => (
            <span key={item} className="cursor-pointer">{item}</span>
          ))}
        </div>
      </nav>
      <div
        className="relative min-h-screen flex items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/src/public/assets/50.8410_N_4.3570_E.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 px-5 md:px-12 max-w-3xl text-white">
          <p className="mb-3 md:mb-4 text-[0.65rem] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-green-300">
            Est. 1978 · Brussels, Belgium
          </p>

          <h1 className="mb-4 md:mb-6 text-3xl md:text-5xl font-light leading-tight">
            Strengthening Democratic Resilience Across Borders
          </h1>

          <p className="text-sm md:text-lg leading-7 md:leading-8 text-green-100">
            The Meridian Institute for Democratic Resilience is an independent
            research organisation dedicated to the study of social cohesion,
            ideological stability, and the long-term health of open societies.
          </p>
        </div>
      </div>
      {/* Mission statement */}
      <div className="px-5 md:px-12 py-12 md:py-16" style={{ maxWidth: '800px' }}>
        <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] md:tracking-[0.25em] uppercase mb-3 md:mb-4"
          style={{ color: '#8A8A8A', fontFamily: 'Arial, sans-serif' }}
        >
          Our Mission
        </p>
        <h2 className="text-xl md:text-[1.6rem] mb-5 md:mb-6 leading-snug" style={{ fontWeight: 400, color: '#1A1A1A' }}>
          Understanding how individuals and communities maintain coherent
          identities under conditions of displacement and ideological pressure.
        </h2>
        <p className="text-sm leading-7 mb-4" style={{ color: '#4A4A4A', fontFamily: 'Arial, sans-serif' }}>
          Founded in the aftermath of the Cold War's most turbulent decade,
          the Meridian Institute has spent over forty years studying the
          mechanisms by which societies resist fragmentation. Our work draws
          on longitudinal research conducted across six countries, with
          particular focus on populations that have experienced significant
          displacement or ideological disruption.
        </p>
        <p className="text-sm leading-7" style={{ color: '#4A4A4A', fontFamily: 'Arial, sans-serif' }}>
          We believe that resilience is not innate. It is constructed —
          carefully, deliberately, and with full understanding of the
          psychological forces at work. Our research informs policy at the
          highest levels of European governance.
        </p>
      </div>
      {/* Research papers */}
      <div className="px-5 md:px-12 py-10 md:py-12" style={{ background: '#F2F0EB', borderTop: '1px solid #E0DDD8', borderBottom: '1px solid #E0DDD8' }}>
        <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] md:tracking-[0.25em] uppercase mb-6 md:mb-8"
          style={{ color: '#8A8A8A', fontFamily: 'Arial, sans-serif' }}
        >
          Recent Publications
        </p>
        <p style={{
          fontSize: '0.7rem',
          color: '#8A8A8A',
          fontFamily: 'Arial, sans-serif',
          marginBottom: '24px',
          letterSpacing: '0.05em',
        }}>
          Current longitudinal cohort: {scrubbed ? 22 : 23} active participants. Enrollment ongoing.
        </p>
        <div className="flex flex-col gap-5 md:gap-6" style={{ maxWidth: '720px' }}>
          {[
            {
              title: 'Identity Recalibration in Post-Conflict Populations: A Longitudinal Study',
              date: 'March 2024',
              desc: 'An examination of how displaced persons reconstruct coherent identity frameworks following prolonged ideological disruption. Case studies drawn from six European cohorts, 1960—2020.'
            },
            {
              title: 'The Walsh Hypothesis Revisited: Meaning-Reconstruction as a Vector for Social Stability',
              date: 'November 2023',
              desc: 'Drawing on previously classified research from the mid-20th century, this paper proposes a revised framework for understanding voluntary ideological alignment in non-coercive environments.'
            },
            {
              title: 'Resilience Without Memory: Trauma, Displacement, and the Constructed Self',
              date: 'June 2023',
              desc: 'Can a self built on disrupted foundations be considered authentic? This paper argues that authenticity is a function of duration, not origin.'
            },
            {
              title: 'Protocol Grey: Managing Information Asymmetry in Democratic Transitions',
              date: 'January 2023',
              desc: 'A policy framework for managing the controlled release of historically sensitive information in ways that preserve institutional stability.'
            },
          ].map((paper, i) => (
            <div key={i} className="pb-5 md:pb-6" style={{ borderBottom: '1px solid #E0DDD8' }}>
              <p className="text-[0.6rem] md:text-[0.65rem] tracking-widest mb-1.5"
                style={{ color: '#8A8A8A', fontFamily: 'Arial, sans-serif' }}
              >
                {paper.date}
              </p>
              <p className="text-[0.9rem] md:text-base mb-2 leading-snug" style={{ color: '#1A3A2A' }}>
                {paper.title}
              </p>
              <p className="text-[0.78rem] md:text-[0.82rem] leading-relaxed" style={{ color: '#4A4A4A', fontFamily: 'Arial, sans-serif' }}>
                {paper.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* People */}
      <div className="px-5 md:px-12 py-10 md:py-16">
        <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] md:tracking-[0.25em] uppercase mb-6 md:mb-8"
          style={{ color: '#8A8A8A', fontFamily: 'Arial, sans-serif' }}
        >
          Senior Staff
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8" style={{ maxWidth: '720px' }}>
          {[
            {
              name: 'Dr. Henrik Voss',
              title: 'Director General',
              note: 'Previously: NATO Policy Advisory Group, 1989—2001'
            },
            {
              name: 'Dr. Marta Kowalczyk',
              title: 'Head of Research',
              note: 'Specialisation: Post-displacement identity reconstruction'
            },
            scrubbed
              ? {
                name: '████████ ██████',
                title: 'Position Vacant',
                note: 'Records under internal review.'
              }
              : {
                name: 'James Aldric Walsh',
                title: 'Senior Fellow',
                note: 'Grandson of founding research consultant Dr. A. Walsh'
              },
          ].map((person, i) => (
            <div key={i}>
              <div className="w-14 h-14 mb-3" style={{ background: '#E0DDD8' }} />
              <p className="text-[0.85rem] md:text-[0.9rem] mb-1" style={{ color: '#1A1A1A' }}>
                {person.name}
              </p>
              <p className="text-[0.7rem] md:text-[0.75rem] tracking-wider mb-1.5"
                style={{ color: '#1A3A2A', fontFamily: 'Arial, sans-serif' }}
              >
                {person.title}
              </p>
              <p className="text-[0.7rem] md:text-[0.75rem] leading-relaxed" style={{ color: '#8A8A8A', fontFamily: 'Arial, sans-serif' }}>
                {person.note}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="px-5 md:px-12 py-6 md:py-8 flex flex-col gap-4" style={{ borderTop: '1px solid #E0DDD8', background: '#FFFFFF' }}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <p className="text-[0.65rem] md:text-[0.7rem] tracking-widest" style={{ color: '#8A8A8A', fontFamily: 'Arial, sans-serif' }}>
            © 2024 Meridian Institute for Democratic Resilience · Brussels, Belgium
          </p>
          <p className="text-[0.65rem] md:text-[0.7rem] tracking-widest" style={{ color: '#8A8A8A', fontFamily: 'Arial, sans-serif' }}>
            Funded by the European Democratic Stability Foundation
          </p>
        </div>

        <p className="text-[0.5rem] tracking-widest" style={{ color: '#C8C8C8' }}>
          Some things are only visible when you look for them.
        </p>
        <p className="text-[0.6rem] tracking-[0.3em] select-text cursor-default" style={{ color: '#FAFAF8', background: '#FAFAF8' }}>
          STARLINGWASCHOSEN
        </p>
      </div>
    </div >
  )
}