import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import HistoryIcon from '@mui/icons-material/History';
import Navbar from '../components/Navbar';
import '../App.css';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // silent fail
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0A0A14', fontFamily: 'Inter, sans-serif' }}>

            {/* ── Shared Navbar ── */}
            <Navbar showActions />

            {/* ── Page title bar ── */}
            <div style={{
                padding: '1.2rem 2.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', gap: 10,
            }}>
                <HistoryIcon style={{ color: '#A78BFA', fontSize: 20 }} />
                <h1 style={{
                    fontSize: '1.1rem', fontWeight: 800, margin: 0,
                    background: 'linear-gradient(135deg,#A78BFA,#60A5FA)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>Meeting History</h1>
            </div>

            {/* ── Content ── */}
            <div className="historyContent" style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{
                        fontSize: '1.6rem', fontWeight: 800, color: '#F0F0FF',
                        letterSpacing: '-0.5px', marginBottom: 6,
                    }}>
                        Past Meetings
                    </h2>
                    <p style={{ color: '#8B8BA8', fontSize: '0.9rem' }}>
                        {loading ? 'Loading...' : meetings.length > 0
                            ? `You have attended ${meetings.length} meeting${meetings.length > 1 ? 's' : ''}`
                            : 'No meetings yet — start one from the home page!'}
                    </p>
                </div>

                {/* Skeleton loading */}
                {loading && (
                    <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{
                                width: 280, height: 130, borderRadius: 14,
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                animation: 'pulse 1.5s infinite',
                            }} />
                        ))}
                    </div>
                )}

                {/* Meeting Cards */}
                {!loading && meetings.length > 0 && (
                    <div className="historyGrid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.2rem',
                    }}>
                        {meetings.map((e, i) => (
                            <div
                                key={i}
                                onClick={() => navigate(`/${e.meetingCode}`)}
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    borderRadius: 14, padding: '1.2rem 1.4rem',
                                    cursor: 'pointer', transition: 'all 0.2s ease',
                                    position: 'relative', overflow: 'hidden',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(124,58,237,0.08)';
                                    e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
                                }}
                                onMouseLeave={ev => {
                                    ev.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                    ev.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                                    ev.currentTarget.style.transform = 'none';
                                    ev.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {/* Top gradient bar */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                    background: 'linear-gradient(90deg, #7C3AED, #3B82F6)',
                                }} />

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                    <div style={{
                                        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                                        background: 'rgba(124,58,237,0.15)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <VideoCallIcon style={{ color: '#9F67FF', fontSize: 20 }} />
                                    </div>
                                    <div>
                                        <p style={{
                                            fontWeight: 700, color: '#F0F0FF',
                                            fontSize: '0.9rem', marginBottom: 4,
                                        }}>
                                            Meeting #{meetings.length - i}
                                        </p>
                                        <p style={{
                                            fontFamily: 'monospace', fontSize: '0.8rem',
                                            color: '#9F67FF', background: 'rgba(124,58,237,0.12)',
                                            padding: '2px 8px', borderRadius: 6,
                                            display: 'inline-block', marginBottom: 8,
                                        }}>
                                            {e.meetingCode}
                                        </p>
                                        <div style={{ display: 'flex', gap: 12 }}>
                                            <span style={{ color: '#8B8BA8', fontSize: '0.78rem' }}>📅 {formatDate(e.date)}</span>
                                            <span style={{ color: '#8B8BA8', fontSize: '0.78rem' }}>🕐 {formatTime(e.date)}</span>
                                        </div>
                                    </div>
                                </div>

                                <p style={{
                                    marginTop: '0.8rem', color: '#7C3AED',
                                    fontSize: '0.78rem', fontWeight: 600,
                                }}>
                                    Click to rejoin →
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && meetings.length === 0 && (
                    <div style={{
                        textAlign: 'center', padding: '5rem 2rem',
                        border: '1px dashed rgba(255,255,255,0.07)',
                        borderRadius: 20,
                    }}>
                        <HistoryIcon style={{ fontSize: '3.5rem', color: '#1A1A30', marginBottom: 12 }} />
                        <p style={{ color: '#555570', fontWeight: 600, fontSize: '1rem' }}>No meetings yet</p>
                        <p style={{ color: '#333350', fontSize: '0.85rem', marginTop: 6 }}>
                            Start your first meeting from the home page
                        </p>
                        <button onClick={() => navigate('/home')} style={{
                            marginTop: '1.5rem', padding: '0.7rem 1.8rem',
                            borderRadius: 10, border: 'none', cursor: 'pointer',
                            background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                            color: 'white', fontWeight: 700, fontSize: '0.9rem',
                            fontFamily: 'Inter, sans-serif',
                            boxShadow: '0 6px 20px rgba(124,58,237,0.35)',
                        }}>
                            Go to Home →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}