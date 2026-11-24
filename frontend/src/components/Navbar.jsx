import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RestoreIcon from '@mui/icons-material/Restore';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar({ showActions = false }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
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
                    onClick={() => { navigate(showActions ? '/home' : '/'); closeMenu(); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none', flexShrink: 0 }}
                >
                    <img
                        src="/logo.png"
                        alt="SyncVerse"
                        style={{
                            width: 36, height: 36,
                            borderRadius: 9,
                            objectFit: 'cover',
                            boxShadow: '0 4px 16px rgba(124,58,237,0.45)',
                            flexShrink: 0,
                        }}
                    />
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
                        {[
                            { label: 'Features',  path: null },
                            { label: 'About',     path: '/about' },
                        ].map(({ label, path }) => (
                            <button key={label} onClick={() => path && navigate(path)} style={{
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

                {/* ── Right: desktop actions + hamburger ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* Desktop right actions */}
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

                    {/* Hamburger — shown on mobile only */}
                    <button
                        className="navHamburger"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                        style={{
                            display: 'none',
                            flexDirection: 'column',
                            gap: 5,
                            background: menuOpen ? 'rgba(255,255,255,0.07)' : 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '6px 7px',
                            borderRadius: 8,
                            transition: 'background 0.2s',
                        }}
                    >
                        <span style={{
                            display: 'block', width: 22, height: 2,
                            background: '#8B8BA8', borderRadius: 2,
                            transition: 'all 0.25s',
                            transform: menuOpen ? 'rotate(45deg) translate(4px, 7px)' : 'none',
                        }} />
                        <span style={{
                            display: 'block', width: 22, height: 2,
                            background: '#8B8BA8', borderRadius: 2,
                            transition: 'all 0.25s',
                            opacity: menuOpen ? 0 : 1,
                        }} />
                        <span style={{
                            display: 'block', width: 22, height: 2,
                            background: '#8B8BA8', borderRadius: 2,
                            transition: 'all 0.25s',
                            transform: menuOpen ? 'rotate(-45deg) translate(4px, -7px)' : 'none',
                        }} />
                    </button>
                </div>
            </header>

            {/* ── Mobile dropdown menu ── */}
            {menuOpen && (
                <div className="navMobileMenu open" style={{
                    position: 'fixed',
                    top: 56,
                    left: 0,
                    right: 0,
                    background: 'rgba(8,8,18,0.98)',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    zIndex: 199,
                    padding: '0.8rem 1.2rem 1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    animation: 'slideDown 0.2s ease',
                }}>
                    {showActions ? (
                        <>
                            <MobileMenuBtn
                                icon="🕐"
                                label="Meeting History"
                                onClick={() => { navigate('/history'); closeMenu(); }}
                                active={location.pathname === '/history'}
                            />
                            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
                            <MobileMenuBtn
                                icon="🚪"
                                label="Logout"
                                onClick={() => { handleLogout(); closeMenu(); }}
                                danger
                            />
                        </>
                    ) : (
                        <>
                            {[
                                { label: 'Features', path: null },
                                { label: 'About',    path: '/about' },
                            ].map(({ label, path }) => (
                                <MobileMenuBtn key={label} label={label} onClick={() => { if (path) navigate(path); closeMenu(); }} />
                            ))}
                            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
                            <button
                                onClick={() => { navigate('/auth'); closeMenu(); }}
                                style={{
                                    padding: '0.75rem 1rem',
                                    background: 'linear-gradient(135deg,#7C3AED,#3B82F6)',
                                    border: 'none', borderRadius: 10, cursor: 'pointer',
                                    color: 'white', fontWeight: 700, fontSize: '0.9rem',
                                    fontFamily: 'Inter, sans-serif',
                                    boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
                                    marginTop: 4,
                                }}
                            >
                                Get Started Free →
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Overlay to close menu */}
            {menuOpen && (
                <div
                    onClick={closeMenu}
                    style={{
                        position: 'fixed', inset: 0,
                        zIndex: 198,
                        background: 'transparent',
                    }}
                />
            )}

            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @media (max-width: 768px) {
                    .navbarRight { display: none !important; }
                    .navHamburger { display: flex !important; }
                }
            `}</style>
        </>
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
            <span className="navBtnLabel">{label}</span>
        </button>
    );
}

/* ── Mobile menu item ── */
function MobileMenuBtn({ label, icon, onClick, active, danger }) {
    return (
        <button
            onClick={onClick}
            style={{
                width: '100%', textAlign: 'left',
                padding: '0.72rem 1rem',
                background: active ? 'rgba(124,58,237,0.1)' : 'none',
                border: active ? '1px solid rgba(124,58,237,0.25)' : '1px solid transparent',
                borderRadius: 10,
                color: danger ? '#F87171' : active ? '#A78BFA' : '#C0C0D8',
                fontSize: '0.9rem', fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
                transition: 'all 0.18s',
            }}
        >
            {icon && <span style={{ fontSize: '1rem' }}>{icon}</span>}
            {label}
        </button>
    );
}
