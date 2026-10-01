import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VideocamIcon from '@mui/icons-material/Videocam';
import LockIcon from '@mui/icons-material/Lock';
import SpeedIcon from '@mui/icons-material/Speed';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import GroupsIcon from '@mui/icons-material/Groups';

const features = [
    { icon: <VideocamIcon />,    title: 'HD Video',      desc: 'Crystal-clear 1080p video with adaptive bitrate.' },
    { icon: <LockIcon />,        title: 'Encrypted',     desc: 'End-to-end encrypted. Your calls stay private.' },
    { icon: <SpeedIcon />,       title: '< 80ms',        desc: 'Ultra-low latency powered by WebRTC.' },
    { icon: <ScreenShareIcon />, title: 'Screen Share',  desc: 'Share your screen in one click, anytime.' },
    { icon: <ChatBubbleIcon />,  title: 'Live Chat',     desc: 'Real-time in-meeting chat for everyone.' },
    { icon: <GroupsIcon />,      title: 'Multi-user',    desc: 'Invite unlimited guests to any room.' },
];

function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState('');
    const [joining, setJoining] = useState(false);
    const { addToUserHistory } = useContext(AuthContext);

    const handleJoin = async () => {
        if (!meetingCode.trim() || joining) return;
        setJoining(true);
        try { await addToUserHistory(meetingCode.trim()); navigate(`/${meetingCode.trim()}`); }
        catch { setJoining(false); }
    };

    const handleNewMeeting = async () => {
        const code = Math.random().toString(36).substring(2, 10);
        try { await addToUserHistory(code); } catch {}
        navigate(`/${code}`);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#07070F', fontFamily: 'Inter, sans-serif', color: '#F0F0FF' }}>
            <Navbar showActions />

            {/* ══ HERO ══ */}
            <section className="homeHero" style={{
                display: 'flex', alignItems: 'center',
                minHeight: 'calc(100vh - 64px)',
                padding: '0 6vw', gap: '5vw',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* bg blobs */}
                <div style={{ position:'absolute', top:'-10%', left:'-5%', width:600, height:600,
                    borderRadius:'50%', background:'radial-gradient(circle,rgba(124,58,237,0.14) 0%,transparent 70%)',
                    pointerEvents:'none', filter:'blur(40px)' }} />
                <div style={{ position:'absolute', bottom:'-10%', right:'10%', width:500, height:500,
                    borderRadius:'50%', background:'radial-gradient(circle,rgba(59,130,246,0.10) 0%,transparent 70%)',
                    pointerEvents:'none', filter:'blur(40px)' }} />

                {/* ── Left ── */}
                <div className="homeLeft" style={{ flex:'0 0 auto', maxWidth:540, position:'relative', zIndex:1, width:'100%' }}>
                    {/* Badge */}
                    <div style={{
                        display:'inline-flex', alignItems:'center', gap:7,
                        background:'rgba(124,58,237,0.12)', border:'1px solid rgba(124,58,237,0.28)',
                        padding:'5px 14px', borderRadius:100,
                        fontSize:'0.76rem', fontWeight:700, color:'#A78BFA',
                        marginBottom:'1.6rem', letterSpacing:'0.6px', textTransform:'uppercase',
                    }}>
                        <span style={{
                            width:7, height:7, borderRadius:'50%', background:'#A78BFA',
                            boxShadow:'0 0 8px #A78BFA', animation:'livePulse 2s infinite',
                        }} />
                        Live & Ready
                    </div>

                    <h1 className="homeHeroH1" style={{
                        fontSize:'clamp(2.2rem,4vw,3.6rem)',
                        fontWeight:900, letterSpacing:'-2px', lineHeight:1.08,
                        margin:'0 0 1.2rem',
                    }}>
                        Your meeting,<br />
                        <span style={{
                            background:'linear-gradient(135deg,#A78BFA 20%,#60A5FA 100%)',
                            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                        }}>your rules.</span>
                    </h1>

                    <p style={{
                        fontSize:'1.05rem', color:'#8B8BA8', lineHeight:1.75,
                        margin:'0 0 2.4rem', maxWidth:420,
                    }}>
                        Start or join HD video calls in seconds. No downloads — just share a link and go.
                    </p>

                    {/* ── Action card ── */}
                    <div className="homeActionCard" style={{
                        background:'rgba(255,255,255,0.04)',
                        border:'1px solid rgba(255,255,255,0.09)',
                        borderRadius:18, padding:'1.6rem',
                        boxShadow:'0 20px 60px rgba(0,0,0,0.4)',
                        backdropFilter:'blur(12px)',
                    }}>
                        {/* New meeting */}
                        <button onClick={handleNewMeeting} style={{
                            width:'100%', display:'flex', alignItems:'center',
                            justifyContent:'center', gap:9,
                            padding:'0.85rem 1.4rem',
                            background:'linear-gradient(135deg,#7C3AED,#3B82F6)',
                            border:'none', borderRadius:12, cursor:'pointer',
                            color:'white', fontWeight:800, fontSize:'0.95rem',
                            fontFamily:'Inter,sans-serif',
                            boxShadow:'0 6px 24px rgba(124,58,237,0.45)',
                            transition:'all 0.2s ease', marginBottom:'1rem',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 10px 32px rgba(124,58,237,0.6)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 6px 24px rgba(124,58,237,0.45)'; }}
                        >
                            <AddIcon style={{ fontSize:19 }} />
                            New Instant Meeting
                        </button>

                        {/* Divider */}
                        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'1rem', color:'#3a3a50', fontSize:'0.8rem' }}>
                            <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.07)' }} />
                            or join with a code
                            <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.07)' }} />
                        </div>

                        {/* Join row */}
                        <div className="homeJoinRow" style={{ display:'flex', gap:8 }}>
                            <input
                                value={meetingCode}
                                onChange={e => setMeetingCode(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleJoin()}
                                placeholder="Enter meeting code…"
                                style={{
                                    flex:1, padding:'0.78rem 1rem',
                                    background:'rgba(255,255,255,0.05)',
                                    border:'1.5px solid rgba(255,255,255,0.1)',
                                    borderRadius:10, color:'#F0F0FF',
                                    fontSize:'0.9rem', fontFamily:'Inter,sans-serif',
                                    fontWeight:500, outline:'none',
                                    transition:'all 0.2s ease', minWidth:0,
                                }}
                                onFocus={e => {
                                    e.target.style.borderColor='#7C3AED';
                                    e.target.style.background='rgba(124,58,237,0.08)';
                                    e.target.style.boxShadow='0 0 0 3px rgba(124,58,237,0.18)';
                                }}
                                onBlur={e => {
                                    e.target.style.borderColor='rgba(255,255,255,0.1)';
                                    e.target.style.background='rgba(255,255,255,0.05)';
                                    e.target.style.boxShadow='none';
                                }}
                            />
                            <button onClick={handleJoin} disabled={!meetingCode.trim()||joining} style={{
                                padding:'0.78rem 1.3rem',
                                background:meetingCode.trim()?'rgba(124,58,237,0.85)':'rgba(255,255,255,0.06)',
                                border:meetingCode.trim()?'1px solid rgba(124,58,237,0.5)':'1px solid rgba(255,255,255,0.08)',
                                borderRadius:10, cursor:meetingCode.trim()?'pointer':'not-allowed',
                                color:meetingCode.trim()?'white':'#444460',
                                fontWeight:700, fontSize:'0.88rem', fontFamily:'Inter,sans-serif',
                                display:'flex', alignItems:'center', gap:5,
                                transition:'all 0.2s ease', whiteSpace:'nowrap', flexShrink:0,
                            }}>
                                Join <ArrowForwardIcon style={{ fontSize:16 }} />
                            </button>
                        </div>

                        {/* Trust chips */}
                        <div style={{ display:'flex', gap:8, marginTop:'1rem', flexWrap:'wrap' }}>
                            {['🔒 Encrypted','⚡ < 80ms','📱 Any device'].map(t => (
                                <span key={t} style={{
                                    fontSize:'0.72rem', color:'#555570', fontWeight:600,
                                    padding:'3px 10px', borderRadius:100,
                                    border:'1px solid rgba(255,255,255,0.06)',
                                }}>{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Right: decorative (hidden on mobile via CSS) ── */}
                <div className="homeRight" style={{
                    flex:1, display:'flex', alignItems:'center',
                    justifyContent:'center', position:'relative', zIndex:1, minHeight:480,
                }}>
                    <div style={{ position:'absolute', width:420, height:420, borderRadius:'50%',
                        border:'1px solid rgba(124,58,237,0.15)', animation:'spin 20s linear infinite' }} />
                    <div style={{ position:'absolute', width:300, height:300, borderRadius:'50%',
                        border:'1px dashed rgba(59,130,246,0.12)', animation:'spin 14s linear infinite reverse' }} />

                    <div style={{
                        width:240, height:240, borderRadius:28,
                        background:'linear-gradient(135deg,rgba(124,58,237,0.25),rgba(59,130,246,0.15))',
                        border:'1px solid rgba(124,58,237,0.3)',
                        display:'flex', flexDirection:'column',
                        alignItems:'center', justifyContent:'center', gap:12,
                        boxShadow:'0 0 80px rgba(124,58,237,0.25),inset 0 0 40px rgba(124,58,237,0.05)',
                        backdropFilter:'blur(20px)', position:'relative', zIndex:2,
                    }}>
                        <div style={{
                            width:70, height:70, borderRadius:20,
                            background:'linear-gradient(135deg,#7C3AED,#3B82F6)',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            boxShadow:'0 8px 30px rgba(124,58,237,0.6)',
                        }}>
                            <VideocamIcon style={{ color:'white', fontSize:36 }} />
                        </div>
                        <div style={{ textAlign:'center' }}>
                            <p style={{ fontWeight:800, fontSize:'1.1rem', margin:0 }}>SyncVerse</p>
                            <p style={{ color:'#8B8BA8', fontSize:'0.78rem', margin:'4px 0 0' }}>HD · Secure · Instant</p>
                        </div>
                        <div style={{
                            display:'flex', alignItems:'center', gap:6,
                            background:'rgba(16,185,129,0.15)', border:'1px solid rgba(16,185,129,0.3)',
                            borderRadius:100, padding:'4px 12px',
                            fontSize:'0.72rem', fontWeight:700, color:'#6EE7B7',
                        }}>
                            <span style={{ width:6, height:6, borderRadius:'50%', background:'#10B981', boxShadow:'0 0 6px #10B981' }} />
                            Server Online
                        </div>
                    </div>

                    <FloatBadge style={{ top:'12%', right:'5%' }}   icon="🎥" label="HD Video" />
                    <FloatBadge style={{ bottom:'18%', left:'2%' }} icon="💬" label="Live Chat" />
                    <FloatBadge style={{ top:'50%', right:'-2%' }} icon="🖥️" label="Screen Share" />
                </div>
            </section>

            {/* ══ FEATURES GRID ══ */}
            <section className="homeFeatureSection" style={{
                padding:'5rem 6vw',
                borderTop:'1px solid rgba(255,255,255,0.05)',
                background:'rgba(255,255,255,0.015)',
            }}>
                <div style={{ textAlign:'center', marginBottom:'3rem' }}>
                    <p style={{ color:'#A78BFA', fontWeight:700, fontSize:'0.8rem', letterSpacing:'2px', textTransform:'uppercase', marginBottom:10 }}>
                        Why SyncVerse
                    </p>
                    <h2 style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:900, letterSpacing:'-1px', margin:0 }}>
                        Everything you need.<br />
                        <span style={{ background:'linear-gradient(135deg,#A78BFA,#60A5FA)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                            Nothing you don't.
                        </span>
                    </h2>
                </div>

                <div className="homeFeatureGrid" style={{
                    display:'grid',
                    gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',
                    gap:'1.2rem',
                }}>
                    {features.map((f, i) => <FeatureCard key={i} {...f} />)}
                </div>
            </section>

            {/* ══ BOTTOM CTA ══ */}
            <section className="homeCTASection homeCTABanner" style={{
                padding:'4rem 6vw',
                display:'flex', alignItems:'center', justifyContent:'space-between',
                borderTop:'1px solid rgba(255,255,255,0.05)',
                gap:'2rem', flexWrap:'wrap',
            }}>
                <div>
                    <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,1.8rem)', fontWeight:900, letterSpacing:'-0.8px', margin:'0 0 8px' }}>
                        Ready to sync up?
                    </h2>
                    <p style={{ color:'#8B8BA8', margin:0, fontSize:'0.95rem' }}>
                        Start your first meeting in under 10 seconds.
                    </p>
                </div>
                <button onClick={handleNewMeeting} style={{
                    display:'flex', alignItems:'center', gap:8,
                    padding:'0.85rem 2rem',
                    background:'linear-gradient(135deg,#7C3AED,#3B82F6)',
                    border:'none', borderRadius:12, cursor:'pointer',
                    color:'white', fontWeight:800, fontSize:'0.95rem',
                    fontFamily:'Inter,sans-serif',
                    boxShadow:'0 6px 24px rgba(124,58,237,0.4)',
                    transition:'all 0.2s ease', whiteSpace:'nowrap',
                }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 10px 32px rgba(124,58,237,0.55)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 6px 24px rgba(124,58,237,0.4)'; }}
                >
                    Start a Meeting <ArrowForwardIcon style={{ fontSize:18 }} />
                </button>
            </section>

            <style>{`
                @keyframes livePulse {
                    0%,100% { opacity:1; box-shadow:0 0 8px #A78BFA; }
                    50% { opacity:0.4; box-shadow:0 0 3px #A78BFA; }
                }
                @keyframes spin {
                    from { transform:rotate(0deg); }
                    to   { transform:rotate(360deg); }
                }
                ::placeholder { color:#444460; }
            `}</style>
        </div>
    );
}

function FloatBadge({ icon, label, style }) {
    return (
        <div style={{
            position:'absolute',
            background:'rgba(12,12,25,0.88)',
            border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:12, padding:'8px 14px',
            display:'flex', alignItems:'center', gap:7,
            fontSize:'0.8rem', fontWeight:700, color:'#C0C0D8',
            backdropFilter:'blur(12px)',
            boxShadow:'0 8px 24px rgba(0,0,0,0.4)',
            zIndex:3, whiteSpace:'nowrap',
            ...style,
        }}>
            <span style={{ fontSize:'1rem' }}>{icon}</span> {label}
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    const [hov, setHov] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background:hov?'rgba(124,58,237,0.07)':'rgba(255,255,255,0.03)',
                border:hov?'1px solid rgba(124,58,237,0.28)':'1px solid rgba(255,255,255,0.07)',
                borderRadius:16, padding:'1.4rem',
                transition:'all 0.22s ease',
                transform:hov?'translateY(-3px)':'none',
                boxShadow:hov?'0 12px 40px rgba(0,0,0,0.35)':'none',
            }}
        >
            <div style={{
                width:42, height:42, borderRadius:12,
                background:'linear-gradient(135deg,rgba(124,58,237,0.25),rgba(59,130,246,0.15))',
                border:'1px solid rgba(124,58,237,0.25)',
                display:'flex', alignItems:'center', justifyContent:'center',
                marginBottom:'1rem', color:'#A78BFA',
            }}>
                {React.cloneElement(icon, { style:{ fontSize:20 } })}
            </div>
            <h3 style={{ fontWeight:800, fontSize:'1rem', margin:'0 0 6px', color:'#F0F0FF' }}>{title}</h3>
            <p style={{ color:'#8B8BA8', fontSize:'0.85rem', lineHeight:1.6, margin:0 }}>{desc}</p>
        </div>
    );
}

export default withAuth(HomeComponent);