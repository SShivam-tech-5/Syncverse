import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import RestoreIcon from '@mui/icons-material/Restore';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar({ showActions = false }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    return (
        <header className="navbarHeader" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 2.5rem', height: 64,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(8,8,18,0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            position: 'sticky', top: 0, zIndex: 200,
            fontFamily: 'Inter, sans-serif',
        }}>
            {/* ── Logo ── */}
            <div
                onClick={() => navigate(showActions ? '/home' : '/')}
                style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none', flexShrink: 0 }}
            >
                <div style={{
                    width: 34, height: 34, borderRadius: 9,
                    background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(124,58,237,0.45)',
                    flexShrink: 0,
                }}>
                    <VideoCallIcon style={{ color: 'white', fontSize: 19 }} />
                </div>
                <span style={{
                    fontSize: '1.25rem', fontWeight: 800,
                    background: 'linear-gradient(135deg, #A78BFA, #60A5FA)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.4px',
                }}>
                    SyncVerse
                </span>
            </div>

            {/* ── Center links (landing only, hidden on mobile via CSS) ── */}
            {!showActions && (
                <nav className="navCenterLinks" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {['Features', 'Pricing', 'About'].map((label) => (
                        <button key={label} style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: '#8B8BA8', fontSize: '0.875rem', fontWeight: 500,
                            fontFamily: 'Inter, sans-serif', padding: '0.45rem 1rem',
                            borderRadius: 8, transition: 'all 0.18s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#F0F0FF'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = '#8B8BA8'; e.currentTarget.style.background = 'none'; }}
                        >
                            {label}
                        </button>
                    ))}
                </nav>
            )}

            {/* ── Right actions ── */}
            <div className="navbarRight" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {showActions ? (
                    <>
                        <NavBtn
                            icon={<RestoreIcon style={{ fontSize: 17 }} />}
                            label="History"
                            onClick={() => navigate('/history')}
                            active={location.pathname === '/history'}
                        />
                        <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.08)', margin: '0 2px', flexShrink: 0 }} />
                        <NavBtn
                            icon={<LogoutIcon style={{ fontSize: 17 }} />}
                            label="Logout"
                            onClick={handleLogout}
                            danger
                        />
                    </>
                ) : (
                    <>
                        <NavBtn label="Sign In" onClick={() => navigate('/auth')} ghost />
                        <NavBtn label="Get Started" onClick={() => navigate('/auth')} primary />
                    </>
                )}
            </div>
        </header>
    );
}

/* ── Reusable nav button ── */
function NavBtn({ label, icon, onClick, active, danger, ghost, primary }) {
    const [hov, setHov] = React.useState(false);

    let bg = 'transparent';
    let color = '#8B8BA8';
    let border = '1px solid transparent';
    let shadow = 'none';

    if (primary) {
        bg = hov ? '#6D28D9' : 'linear-gradient(135deg,#7C3AED,#3B82F6)';
        color = 'white';
        border = 'none';
        shadow = '0 4px 14px rgba(124,58,237,0.35)';
    } else if (ghost) {
        bg = hov ? 'rgba(255,255,255,0.06)' : 'transparent';
        color = hov ? '#F0F0FF' : '#8B8BA8';
        border = '1px solid rgba(255,255,255,0.1)';
    } else if (danger) {
        bg = hov ? 'rgba(239,68,68,0.12)' : 'transparent';
        color = '#F87171';
        border = hov ? '1px solid rgba(239,68,68,0.35)' : '1px solid rgba(239,68,68,0.18)';
    } else {
        bg = active ? 'rgba(124,58,237,0.12)' : hov ? 'rgba(255,255,255,0.06)' : 'transparent';
        color = active ? '#A78BFA' : hov ? '#F0F0FF' : '#8B8BA8';
        border = active ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.08)';
    }

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            title={label}
            style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: bg, border, color,
                borderRadius: 9, padding: icon ? '0.45rem 0.9rem' : '0.45rem 1.1rem',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                fontSize: '0.855rem', fontWeight: 600,
                transition: 'all 0.18s ease', whiteSpace: 'nowrap',
                boxShadow: shadow,
                flexShrink: 0,
            }}
        >
            {icon}
            {/* Label hidden on mobile via .navBtnLabel CSS class */}
            <span className="navBtnLabel">{label}</span>
        </button>
    );
}
