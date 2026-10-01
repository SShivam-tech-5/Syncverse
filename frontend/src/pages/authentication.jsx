import * as React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

/* ─── Reusable input ──────────────────────────────────────────── */
function FormInput({ label, type = 'text', value, onChange, onKeyDown, icon, rightEl }) {
    const [focused, setFocused] = React.useState(false);

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <label style={{
                display: 'block',
                marginBottom: 6,
                fontSize: '0.82rem',
                fontWeight: 600,
                color: focused ? '#9F67FF' : '#8B8BA8',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.3px',
                transition: 'color 0.2s',
            }}>
                {label}
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {icon && (
                    <span style={{
                        position: 'absolute', left: 14,
                        color: focused ? '#9F67FF' : '#555570',
                        display: 'flex', alignItems: 'center',
                        transition: 'color 0.2s', pointerEvents: 'none',
                        fontSize: 18,
                    }}>
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={{
                        width: '100%',
                        padding: icon ? '0.75rem 3rem 0.75rem 2.8rem' : '0.75rem 3rem 0.75rem 1rem',
                        borderRadius: 10,
                        border: `1.5px solid ${focused ? '#7C3AED' : 'rgba(255,255,255,0.1)'}`,
                        background: focused ? 'rgba(124,58,237,0.07)' : 'rgba(255,255,255,0.04)',
                        color: '#F0F0FF',
                        fontSize: '0.95rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        boxShadow: focused ? '0 0 0 3px rgba(124,58,237,0.15)' : 'none',
                    }}
                    placeholder={label}
                    autoComplete="off"
                />
                {rightEl && (
                    <span style={{ position: 'absolute', right: 12, display: 'flex', alignItems: 'center' }}>
                        {rightEl}
                    </span>
                )}
            </div>
        </div>
    );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0); // 0 = Login, 1 = Register
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showPass, setShowPass] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        if (!username.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                if (!name.trim()) { setError('Please enter your full name.'); setLoading(false); return; }
                const result = await handleRegister(name, username, password);
                setMessage(result || 'Account created!');
                setOpen(true);
                setUsername(''); setPassword(''); setName('');
                setFormState(0);
            }
        } catch (err) {
            const msg = err?.response?.data?.message || 'Something went wrong. Try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => { if (e.key === 'Enter') handleAuth(); };

    const switchTab = (idx) => { setFormState(idx); setError(''); setUsername(''); setPassword(''); setName(''); };

    const features = ['🎥  HD Video Calls', '💬  Real-time Chat', '🖥️  Screen Sharing', '🔒  End-to-end Secure'];

    return (
        <div className="authContainer" style={{
            minHeight: '100vh', display: 'flex',
            background: '#0A0A14',
            backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.28) 0%, transparent 70%)',
            fontFamily: 'Inter, sans-serif',
        }}>
            {/* ── Left Branding Panel ── */}
            <div className="authLeftPanel" style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                padding: '4rem 3rem',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(0,0,0,0.25)',
            }}>
                <div style={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '3rem' }}>
                        <div style={{
                            width: 52, height: 52, borderRadius: 14,
                            background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 8px 30px rgba(124,58,237,0.45)',
                        }}>
                            <VideoCallIcon style={{ color: 'white', fontSize: 30 }} />
                        </div>
                        <span style={{
                            fontSize: '2rem', fontWeight: 900,
                            background: 'linear-gradient(135deg, #9F67FF, #60A5FA)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            letterSpacing: '-1px',
                        }}>
                            SyncVerse
                        </span>
                    </div>

                    <h2 style={{
                        fontSize: '2.2rem', fontWeight: 900, color: '#F0F0FF',
                        letterSpacing: '-1.2px', lineHeight: 1.15, marginBottom: '0.8rem',
                    }}>
                        Connect without limits
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: '#8B8BA8', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                        Crystal-clear video calls, real-time messaging, and screen sharing — all in your browser.
                    </p>

                    {/* Feature chips */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {features.map((f) => (
                            <div key={f} style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '0.8rem 1.2rem',
                                background: 'rgba(255,255,255,0.04)',
                                borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)',
                                color: '#C0C0D8', fontSize: '0.9rem', fontWeight: 500,
                                textAlign: 'left',
                            }}>
                                {f}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Right Form Panel ── */}
            <div className="authRightPanel" style={{
                flex: 1, display: 'flex', alignItems: 'center',
                justifyContent: 'center', padding: '4rem 3rem',
            }}>
                <div className="authFormInner" style={{ maxWidth: 420, width: '100%' }}>

                    {/* Header icon + title */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{
                            width: 46, height: 46, borderRadius: 13,
                            background: 'rgba(124,58,237,0.15)',
                            border: '1px solid rgba(124,58,237,0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '1.2rem',
                        }}>
                            {formState === 0
                                ? <LockOutlinedIcon style={{ color: '#9F67FF', fontSize: 22 }} />
                                : <PersonAddAltIcon style={{ color: '#9F67FF', fontSize: 22 }} />
                            }
                        </div>
                        <h2 style={{
                            fontSize: '1.9rem', fontWeight: 900, color: '#F0F0FF',
                            letterSpacing: '-0.8px', marginBottom: 6,
                        }}>
                            {formState === 0 ? 'Welcome back' : 'Create account'}
                        </h2>
                        <p style={{ color: '#8B8BA8', fontSize: '0.9rem' }}>
                            {formState === 0
                                ? 'Sign in to continue to SyncVerse'
                                : 'Join thousands of users on SyncVerse'}
                        </p>
                    </div>

                    {/* Tab Toggle */}
                    <div style={{
                        display: 'flex', background: 'rgba(255,255,255,0.04)',
                        borderRadius: 12, padding: 4, marginBottom: '1.8rem',
                        border: '1px solid rgba(255,255,255,0.07)',
                    }}>
                        {['Sign In', 'Sign Up'].map((label, idx) => (
                            <button key={label} onClick={() => switchTab(idx)}
                                style={{
                                    flex: 1, padding: '0.62rem', borderRadius: 9,
                                    border: 'none', cursor: 'pointer',
                                    fontWeight: 700, fontSize: '0.9rem',
                                    fontFamily: 'Inter, sans-serif',
                                    transition: 'all 0.2s ease',
                                    background: formState === idx
                                        ? 'linear-gradient(135deg, #7C3AED, #3B82F6)'
                                        : 'transparent',
                                    color: formState === idx ? 'white' : '#8B8BA8',
                                    boxShadow: formState === idx ? '0 4px 14px rgba(124,58,237,0.4)' : 'none',
                                }}>
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Fields */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                        {formState === 1 && (
                            <FormInput
                                label="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={handleKeyDown}
                                icon={<PersonAddAltIcon style={{ fontSize: 18 }} />}
                            />
                        )}
                        <FormInput
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                            icon={
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                </svg>
                            }
                        />
                        <FormInput
                            label="Password"
                            type={showPass ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            icon={
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            }
                            rightEl={
                                <button onClick={() => setShowPass(!showPass)} style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: '#555570', display: 'flex', alignItems: 'center',
                                    padding: 2,
                                }}>
                                    {showPass
                                        ? <VisibilityOffIcon style={{ fontSize: 18 }} />
                                        : <VisibilityIcon style={{ fontSize: 18 }} />
                                    }
                                </button>
                            }
                        />
                    </div>

                    {/* Error box */}
                    {error && (
                        <div style={{
                            marginTop: '1rem', padding: '0.75rem 1rem',
                            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                            borderRadius: 10, color: '#FCA5A5', fontSize: '0.875rem',
                        }}>
                            ⚠️ &nbsp;{error}
                        </div>
                    )}

                    {/* Success toast */}
                    {open && (
                        <div style={{
                            marginTop: '1rem', padding: '0.75rem 1rem',
                            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                            borderRadius: 10, color: '#6EE7B7', fontSize: '0.875rem',
                        }}>
                            ✅ &nbsp;{message} — You can now sign in!
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        onClick={handleAuth}
                        disabled={loading}
                        style={{
                            width: '100%', marginTop: '1.5rem',
                            padding: '0.9rem 1rem',
                            borderRadius: 12, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                            background: loading
                                ? 'rgba(255,255,255,0.08)'
                                : 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                            color: loading ? '#555570' : 'white',
                            fontWeight: 800, fontSize: '1rem',
                            fontFamily: 'Inter, sans-serif',
                            letterSpacing: '0.2px',
                            transition: 'all 0.2s ease',
                            boxShadow: loading ? 'none' : '0 8px 30px rgba(124,58,237,0.4)',
                        }}
                        onMouseEnter={(e) => { if (!loading) e.target.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={(e) => { e.target.style.transform = 'none'; }}
                    >
                        {loading
                            ? '⏳  Please wait...'
                            : formState === 0 ? 'Sign In →' : 'Create Account →'}
                    </button>

                    <p style={{
                        textAlign: 'center', marginTop: '1.5rem',
                        color: '#444460', fontSize: '0.8rem',
                    }}>
                        By continuing, you agree to our{' '}
                        <span style={{ color: '#7C3AED', cursor: 'pointer' }}>Terms</span>
                        {' & '}
                        <span style={{ color: '#7C3AED', cursor: 'pointer' }}>Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}