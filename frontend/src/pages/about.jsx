import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

/* ── tiny fade-in hook ── */
function useFadeIn(delay = 0) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
    }, []);
    return {
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: 'opacity 0.65s ease, transform 0.65s ease',
    };
}

const sections = [
    {
        icon: '💡',
        title: 'A Little About Me',
        body: `I'm someone who believes that the best way to learn is by building. My journey in technology is driven by curiosity, creativity, and the desire to make things that actually matter.

From solving coding problems to building web applications, I enjoy the process of taking an idea, figuring out how it works, and turning it into something real. I'm still learning, still experimenting, and constantly pushing myself to do better.`,
    },
    {
        icon: '🚀',
        title: 'Behind SyncVerse',
        body: `SyncVerse isn't just another website I've built. It's a part of my journey — an idea that I wanted to bring to life.

Every feature, every design decision, and every line of code represents something I've learned along the way. Building SyncVerse has challenged me to think differently, explore new possibilities, and grow beyond what I knew before.

And this is just the beginning.`,
    },
    {
        icon: '🌱',
        title: 'Beyond Coding',
        body: `When I'm not coding, I'm usually exploring new technologies, learning something interesting, solving problems, or thinking about ideas that I'd love to build someday.

I don't have everything figured out yet, but I'm enjoying the journey and making the most of every opportunity to grow.`,
    },
];

const tags = ['Developer', 'Learner', 'Builder', 'CS Student', 'Problem Solver', 'Creator'];

export default function About() {
    const navigate = useNavigate();
    const hero   = useFadeIn(100);
    const cards  = useFadeIn(350);
    const footer = useFadeIn(600);

    return (
        <div style={{
            minHeight: '100vh',
            background: '#07070F',
            backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(124,58,237,0.22) 0%, transparent 65%)',
            fontFamily: 'Inter, sans-serif',
            color: '#F0F0FF',
        }}>
            <Navbar />

            {/* ══ HERO ══ */}
            <section style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '5rem 1.5rem 3rem',
                textAlign: 'center',
                ...hero,
            }}>
                {/* Profile photo */}
                <div style={{
                    position: 'relative',
                    marginBottom: '2rem',
                }}>
                    {/* Spinning gradient ring */}
                    <div style={{
                        position: 'absolute',
                        inset: -4,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #7C3AED, #3B82F6, #A78BFA, #60A5FA)',
                        animation: 'spinRing 4s linear infinite',
                        zIndex: 0,
                    }} />
                    {/* White gap ring */}
                    <div style={{
                        position: 'absolute',
                        inset: -2,
                        borderRadius: '50%',
                        background: '#07070F',
                        zIndex: 1,
                    }} />
                    {/* Photo */}
                    <img
                        src="/shivam.jpg"
                        alt="Shivam Verma"
                        style={{
                            width: 148,
                            height: 148,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            objectPosition: 'top',
                            position: 'relative',
                            zIndex: 2,
                            display: 'block',
                        }}
                    />
                    {/* Online dot */}
                    <span style={{
                        position: 'absolute',
                        bottom: 8, right: 8,
                        width: 18, height: 18,
                        borderRadius: '50%',
                        background: '#10B981',
                        border: '3px solid #07070F',
                        zIndex: 3,
                        boxShadow: '0 0 10px #10B981',
                    }} />
                </div>

                {/* Name */}
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: 900,
                    letterSpacing: '-1.5px',
                    margin: '0 0 0.5rem',
                    background: 'linear-gradient(135deg, #F0F0FF 30%, #A78BFA 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    Hey, I'm Shivam 👋
                </h1>

                {/* Sub-role badge */}
                <p style={{
                    fontSize: '1rem',
                    color: '#8B8BA8',
                    margin: '0 0 1.6rem',
                    fontWeight: 500,
                }}>
                    Developer&nbsp;&nbsp;·&nbsp;&nbsp;Learner&nbsp;&nbsp;·&nbsp;&nbsp;Builder
                </p>

                {/* Tags */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap',
                    gap: 8, justifyContent: 'center',
                    maxWidth: 480, margin: '0 auto 2rem',
                }}>
                    {tags.map(tag => (
                        <span key={tag} style={{
                            fontSize: '0.78rem', fontWeight: 700,
                            padding: '5px 14px', borderRadius: 100,
                            background: 'rgba(124,58,237,0.1)',
                            border: '1px solid rgba(124,58,237,0.28)',
                            color: '#A78BFA',
                            letterSpacing: '0.3px',
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Intro line */}
                <p style={{
                    maxWidth: 540,
                    fontSize: '1.05rem',
                    color: '#8B8BA8',
                    lineHeight: 1.78,
                    margin: 0,
                }}>
                    I'm a computer science student who loves turning ideas into real things through code.
                    I enjoy exploring technology, building digital experiences, solving problems,
                    and learning something new every day.
                </p>

                {/* Email — simple text line */}
                <p style={{ marginTop: '1.2rem', fontSize: '0.9rem', color: '#555570' }}>
                    📬 Reach me at{' '}
                    <a
                        href="mailto:veramshivam620@gmail.com"
                        style={{
                            color: '#A78BFA',
                            fontWeight: 600,
                            textDecoration: 'none',
                            fontFamily: 'Inter, sans-serif',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
                        onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}
                    >
                        veramshivam620@gmail.com
                    </a>
                </p>
            </section>

            {/* ══ SECTION CARDS ══ */}
            <section style={{
                maxWidth: 780,
                margin: '0 auto',
                padding: '0 1.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                ...cards,
            }}>
                {sections.map((s, i) => (
                    <SectionCard key={i} icon={s.icon} title={s.title} body={s.body} />
                ))}
            </section>

            {/* ══ FOOTER QUOTE ══ */}
            <section style={{
                textAlign: 'center',
                padding: '3rem 1.5rem 5rem',
                ...footer,
            }}>
                <div style={{
                    display: 'inline-block',
                    padding: '1.4rem 2.4rem',
                    borderRadius: 20,
                    background: 'rgba(124,58,237,0.07)',
                    border: '1px solid rgba(124,58,237,0.2)',
                    maxWidth: 480,
                }}>
                    <p style={{
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        margin: '0 0 6px',
                        background: 'linear-gradient(135deg, #A78BFA, #60A5FA)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1.5,
                    }}>
                        Still learning. Still building. Still dreaming. 🚀
                    </p>
                    <p style={{ color: '#444460', fontSize: '0.82rem', margin: 0, fontWeight: 600 }}>
                        — Shivam Verma
                    </p>
                </div>

                {/* ── CTA buttons ── */}
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            padding: '0.75rem 1.8rem',
                            borderRadius: 10,
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'transparent',
                            color: '#8B8BA8',
                            fontWeight: 600, fontSize: '0.9rem',
                            fontFamily: 'Inter, sans-serif',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#F0F0FF'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8B8BA8'; }}
                    >
                        ← Back to Home
                    </button>
                    <button
                        onClick={() => navigate('/auth')}
                        style={{
                            padding: '0.75rem 1.8rem',
                            borderRadius: 10,
                            border: 'none',
                            background: 'linear-gradient(135deg,#7C3AED,#3B82F6)',
                            color: 'white',
                            fontWeight: 700, fontSize: '0.9rem',
                            fontFamily: 'Inter, sans-serif',
                            cursor: 'pointer',
                            boxShadow: '0 6px 20px rgba(124,58,237,0.4)',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(124,58,237,0.55)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,0.4)'; }}
                    >
                        Try SyncVerse →
                    </button>
                </div>
            </section>

            <style>{`
                @keyframes spinRing {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @media (max-width: 600px) {
                    section { padding-left: 1rem !important; padding-right: 1rem !important; }
                }
            `}</style>
        </div>
    );
}

/* ── Section card component ── */
function SectionCard({ icon, title, body }) {
    const [hov, setHov] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: hov ? 'rgba(124,58,237,0.07)' : 'rgba(255,255,255,0.03)',
                border: hov ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: 18,
                padding: '1.8rem 2rem',
                transition: 'all 0.25s ease',
                transform: hov ? 'translateY(-3px)' : 'none',
                boxShadow: hov ? '0 16px 48px rgba(0,0,0,0.35)' : 'none',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* gradient bar on hover */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg,#7C3AED,#3B82F6)',
                opacity: hov ? 1 : 0,
                transition: 'opacity 0.25s',
            }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                {/* Icon box */}
                <div style={{
                    width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                    background: 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(59,130,246,0.1))',
                    border: '1px solid rgba(124,58,237,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.3rem',
                }}>
                    {icon}
                </div>
                <div style={{ flex: 1 }}>
                    <h2 style={{
                        fontSize: '1.05rem', fontWeight: 800,
                        margin: '0 0 0.75rem', color: '#F0F0FF',
                        letterSpacing: '-0.3px',
                    }}>
                        {title}
                    </h2>
                    {body.split('\n\n').map((para, i) => (
                        <p key={i} style={{
                            color: '#8B8BA8', fontSize: '0.92rem',
                            lineHeight: 1.78, margin: i === 0 ? 0 : '0.75rem 0 0',
                        }}>
                            {para}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
