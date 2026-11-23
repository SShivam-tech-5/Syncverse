import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Navbar from '../components/Navbar';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className='landingPageContainer'>

            {/* ── Shared Navbar ── */}
            <Navbar />

            {/* ── Hero ── */}
            <div className='landingMainContainer' style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5rem 6vw',
                minHeight: 'calc(100vh - 64px)',
                position: 'relative',
                zIndex: 5,
                gap: '4rem',
            }}>
                {/* Left content */}
                <div style={{ flex: 1, maxWidth: 560 }}>
                    <div className='landingBadge'>
                        <span></span>
                        Now in Public Beta — Free Forever
                    </div>
                    <h1>
                        Video calls that <span className='highlight'>just work.</span>
                    </h1>
                    <p>
                        SyncVerse brings crystal-clear video, real-time chat, and instant
                        screen sharing — no downloads, no friction, just connect.
                    </p>
                    <div className='landingCTA'>
                        <div
                            role='button'
                            onClick={() => navigate('/auth')}
                            style={{ cursor: 'pointer' }}
                        >
                            Get Started Free →
                        </div>
                    </div>
                    <div className='landingStats'>
                        <div className='statItem'>
                            <strong>10K+</strong>
                            <span>Active Users</span>
                        </div>
                        <div className='statItem'>
                            <strong>99.9%</strong>
                            <span>Uptime</span>
                        </div>
                        <div className='statItem'>
                            <strong>&lt;80ms</strong>
                            <span>Avg Latency</span>
                        </div>
                    </div>
                </div>

                {/* Right: hero visual */}
                <div className='landingHeroRight' style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}>
                    {/* Glowing card */}
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: 420,
                        aspectRatio: '4/3',
                        borderRadius: 28,
                        background: 'linear-gradient(135deg,rgba(124,58,237,0.18),rgba(59,130,246,0.1))',
                        border: '1px solid rgba(124,58,237,0.25)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 16,
                        boxShadow: '0 0 100px rgba(124,58,237,0.2), inset 0 0 60px rgba(124,58,237,0.04)',
                        backdropFilter: 'blur(20px)',
                    }}>
                        {/* Spinning rings */}
                        <div style={{
                            position: 'absolute', width: '90%', height: '90%',
                            borderRadius: '50%',
                            border: '1px solid rgba(124,58,237,0.12)',
                            animation: 'heroSpin 20s linear infinite',
                        }} />
                        <div style={{
                            position: 'absolute', width: '65%', height: '65%',
                            borderRadius: '50%',
                            border: '1px dashed rgba(59,130,246,0.1)',
                            animation: 'heroSpin 14s linear infinite reverse',
                        }} />

                        {/* Logo */}
                        <img
                            src="/logo.png"
                            alt="SyncVerse"
                            style={{
                                width: 72, height: 72, borderRadius: 18,
                                objectFit: 'cover',
                                boxShadow: '0 8px 32px rgba(124,58,237,0.6)',
                                position: 'relative', zIndex: 2,
                            }}
                        />
                        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                            <p style={{ fontWeight: 800, fontSize: '1.15rem', margin: 0, color: '#F0F0FF' }}>SyncVerse</p>
                            <p style={{ color: '#8B8BA8', fontSize: '0.78rem', margin: '5px 0 0' }}>HD · Secure · Instant</p>
                        </div>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
                            borderRadius: 100, padding: '5px 14px',
                            fontSize: '0.72rem', fontWeight: 700, color: '#6EE7B7',
                            position: 'relative', zIndex: 2,
                        }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
                            Server Online
                        </div>

                        {/* Float badges */}
                        <div style={{
                            position: 'absolute', top: '8%', right: '-8%',
                            background: 'rgba(12,12,25,0.9)', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 10, padding: '7px 12px',
                            fontSize: '0.78rem', fontWeight: 700, color: '#C0C0D8',
                            backdropFilter: 'blur(12px)', zIndex: 3, whiteSpace: 'nowrap',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                        }}>🎥 HD Video</div>
                        <div style={{
                            position: 'absolute', bottom: '12%', left: '-8%',
                            background: 'rgba(12,12,25,0.9)', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 10, padding: '7px 12px',
                            fontSize: '0.78rem', fontWeight: 700, color: '#C0C0D8',
                            backdropFilter: 'blur(12px)', zIndex: 3, whiteSpace: 'nowrap',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                        }}>💬 Live Chat</div>
                        <div style={{
                            position: 'absolute', bottom: '40%', right: '-10%',
                            background: 'rgba(12,12,25,0.9)', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 10, padding: '7px 12px',
                            fontSize: '0.78rem', fontWeight: 700, color: '#C0C0D8',
                            backdropFilter: 'blur(12px)', zIndex: 3, whiteSpace: 'nowrap',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                        }}>🖥️ Screen Share</div>
                    </div>
                </div>
            </div>

            {/* Features section */}
            <section style={{
                padding: '5rem 6vw',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.01)',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <p style={{ color: '#A78BFA', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 10 }}>
                        Why SyncVerse
                    </p>
                    <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, letterSpacing: '-1px', color: '#F0F0FF' }}>
                        Everything built for real teams
                    </h2>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '1rem',
                }}>
                    {[
                        { icon: '🎥', title: 'HD Video', desc: 'Crystal-clear 1080p with adaptive bitrate streaming.' },
                        { icon: '🔒', title: 'Encrypted', desc: 'End-to-end encrypted. Your calls stay private.' },
                        { icon: '⚡', title: '< 80ms', desc: 'Ultra-low latency powered by WebRTC technology.' },
                        { icon: '🖥️', title: 'Screen Share', desc: 'Share your screen in one click, anytime.' },
                        { icon: '💬', title: 'Live Chat', desc: 'Real-time in-meeting chat for everyone.' },
                        { icon: '👥', title: 'Multi-user', desc: 'Invite unlimited guests to any meeting room.' },
                    ].map((f, i) => (
                        <div key={i} style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: 16, padding: '1.4rem',
                        }}>
                            <div style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>{f.icon}</div>
                            <h3 style={{ fontWeight: 800, fontSize: '1rem', margin: '0 0 6px', color: '#F0F0FF' }}>{f.title}</h3>
                            <p style={{ color: '#8B8BA8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA bottom */}
            <section style={{
                padding: '4rem 6vw',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center',
            }}>
                <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 900, color: '#F0F0FF', marginBottom: 12 }}>
                    Ready to sync up?
                </h2>
                <p style={{ color: '#8B8BA8', marginBottom: '2rem', fontSize: '1rem' }}>
                    Start your first meeting in under 10 seconds.
                </p>
                <button
                    onClick={() => navigate('/auth')}
                    style={{
                        padding: '0.9rem 2.4rem',
                        background: 'linear-gradient(135deg,#7C3AED,#3B82F6)',
                        border: 'none', borderRadius: 12, cursor: 'pointer',
                        color: 'white', fontWeight: 800, fontSize: '1rem',
                        fontFamily: 'Inter, sans-serif',
                        boxShadow: '0 6px 24px rgba(124,58,237,0.4)',
                    }}
                >
                    Get Started Free →
                </button>
            </section>

            <style>{`
                @keyframes heroSpin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }

                /* Hide hero right panel on mobile */
                @media (max-width: 768px) {
                    .landingHeroRight { display: none !important; }
                }
            `}</style>
        </div>
    );
}
