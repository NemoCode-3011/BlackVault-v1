export default function Meridian() {
  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      background: '#FAFAF8',
      minHeight: '100vh',
      color: '#1A1A1A',
    }}>

      {/* Hidden comment in source — this is what players are looking for */}
      {/* 
        INTERNAL REF: PROTOCOL GREY — EYES ONLY
        If you are reading this you should not be here.
        VANTAGE is watching.
        Key: STARLINGWASCHOSEN
      */}

      {/* Nav */}
      <nav style={{
        borderBottom: '1px solid #E0DDD8',
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        background: '#FFFFFF',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            background: '#1A3A2A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ width: '12px', height: '12px', border: '1.5px solid #FAFAF8' }} />
          </div>
          <span style={{
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#1A3A2A',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 600,
          }}>
            Meridian Institute
          </span>
        </div>
        <div style={{
          display: 'flex',
          gap: '32px',
          fontSize: '0.8rem',
          color: '#4A4A4A',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.05em',
        }}>
          {['About', 'Research', 'People', 'Contact'].map(item => (
            <span key={item} style={{ cursor: 'pointer' }}>{item}</span>
          ))}
        </div>
      </nav>

      <div
        className="relative min-h-screen flex items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/src/public/assets/50.8410_N_4.3570_E.jpg')"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="relative z-10 px-12 max-w-3xl text-white">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-green-300">
            Est. 1978 · Brussels, Belgium
          </p>

          <h1 className="mb-6 text-5xl font-light leading-tight">
            Strengthening Democratic Resilience Across Borders
          </h1>

          <p className="text-lg leading-8 text-green-100">
            The Meridian Institute for Democratic Resilience is an independent
            research organisation dedicated to the study of social cohesion,
            ideological stability, and the long-term health of open societies.
          </p>
        </div>
      </div>

      {/* Mission statement */}
      <div style={{ padding: '64px 48px', maxWidth: '800px' }}>
        <p style={{
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#8A8A8A',
          fontFamily: 'Arial, sans-serif',
          marginBottom: '16px',
        }}>
          Our Mission
        </p>
        <h2 style={{
          fontSize: '1.6rem',
          fontWeight: 400,
          lineHeight: 1.4,
          marginBottom: '24px',
          color: '#1A1A1A',
        }}>
          Understanding how individuals and communities maintain coherent
          identities under conditions of displacement and ideological pressure.
        </h2>
        <p style={{
          fontSize: '0.9rem',
          lineHeight: 1.9,
          color: '#4A4A4A',
          fontFamily: 'Arial, sans-serif',
          marginBottom: '16px',
        }}>
          Founded in the aftermath of the Cold War's most turbulent decade,
          the Meridian Institute has spent over forty years studying the
          mechanisms by which societies resist fragmentation. Our work draws
          on longitudinal research conducted across six countries, with
          particular focus on populations that have experienced significant
          displacement or ideological disruption.
        </p>
        <p style={{
          fontSize: '0.9rem',
          lineHeight: 1.9,
          color: '#4A4A4A',
          fontFamily: 'Arial, sans-serif',
        }}>
          We believe that resilience is not innate. It is constructed —
          carefully, deliberately, and with full understanding of the
          psychological forces at work. Our research informs policy at the
          highest levels of European governance.
        </p>
      </div>

      {/* Research papers */}
      <div style={{
        padding: '48px',
        background: '#F2F0EB',
        borderTop: '1px solid #E0DDD8',
        borderBottom: '1px solid #E0DDD8',
      }}>
        <p style={{
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#8A8A8A',
          fontFamily: 'Arial, sans-serif',
          marginBottom: '32px',
        }}>
          Recent Publications
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px' }}>
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
            <div key={i} style={{
              borderBottom: '1px solid #E0DDD8',
              paddingBottom: '24px',
            }}>
              <p style={{
                fontSize: '0.65rem',
                color: '#8A8A8A',
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '0.1em',
                marginBottom: '6px',
              }}>
                {paper.date}
              </p>
              <p style={{
                fontSize: '1rem',
                color: '#1A3A2A',
                marginBottom: '8px',
                lineHeight: 1.4,
              }}>
                {paper.title}
              </p>
              <p style={{
                fontSize: '0.82rem',
                color: '#4A4A4A',
                fontFamily: 'Arial, sans-serif',
                lineHeight: 1.7,
              }}>
                {paper.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* People */}
      <div style={{ padding: '64px 48px' }}>
        <p style={{
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#8A8A8A',
          fontFamily: 'Arial, sans-serif',
          marginBottom: '32px',
        }}>
          Senior Staff
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px', maxWidth: '720px' }}>
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
            {
              name: 'James Aldric Walsh',
              title: 'Senior Fellow',
              note: 'Grandson of founding research consultant Dr. A. Walsh'
            },
          ].map((person, i) => (
            <div key={i}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#E0DDD8',
                marginBottom: '12px',
              }} />
              <p style={{
                fontSize: '0.9rem',
                color: '#1A1A1A',
                marginBottom: '4px',
              }}>
                {person.name}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: '#1A3A2A',
                fontFamily: 'Arial, sans-serif',
                marginBottom: '6px',
                letterSpacing: '0.05em',
              }}>
                {person.title}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: '#8A8A8A',
                fontFamily: 'Arial, sans-serif',
                lineHeight: 1.6,
              }}>
                {person.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #E0DDD8',
        padding: '32px 48px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        background: '#FFFFFF',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <p style={{
            fontSize: '0.7rem',
            color: '#8A8A8A',
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '0.1em',
          }}>
            © 2024 Meridian Institute for Democratic Resilience · Brussels, Belgium
          </p>
          <p style={{
            fontSize: '0.7rem',
            color: '#8A8A8A',
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '0.1em',
          }}>
            Funded by the European Democratic Stability Foundation
          </p>
        </div>

        {/* Hidden key — same color as background, only visible on highlight */}
        <p className="text-[0.5rem] tracking-widest mb-1" style={{ color: '#C8C8C8' }}>
          Some things are only visible when you look for them.
        </p>
        <p className="text-[0.6rem] tracking-[0.3em] select-text cursor-default" style={{ color: '#FAFAF8', background: '#FAFAF8' }}>
          STARLINGWASCHOSEN
        </p>
      </div>
    </div>
  )
}