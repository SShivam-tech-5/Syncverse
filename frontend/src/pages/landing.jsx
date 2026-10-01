import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Navbar from '../components/Navbar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VideocamIcon from '@mui/icons-material/Videocam';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className='landingPageContainer'>

            {/* ── Shared Navbar (no showActions = landing mode) ── */}
            <Navbar />

            {/* ── Hero ── */}
            <div className='landingMainContainer'>
                <div>
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

                <div>
                    <div className='heroImageWrapper'>
                        <img src='/mobile.png' alt='SyncVerse App' />
                    </div>
                </div>
            </div>
        </div>
    );
}
