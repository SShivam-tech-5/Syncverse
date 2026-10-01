import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Badge, IconButton, TextField, Tooltip } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../styles/videoComponent.module.css';
import server from '../environment';

const server_url = server;

const darkTheme = createTheme({
    palette: { mode: 'dark', primary: { main: '#7C3AED' } },
    typography: { fontFamily: 'Inter, sans-serif' },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.06)',
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(124,58,237,0.5)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#7C3AED' },
                },
                notchedOutline: { borderColor: 'rgba(255,255,255,0.1)' },
            },
        },
        MuiInputLabel: {
            styleOverrides: { root: { color: '#8B8BA8', '&.Mui-focused': { color: '#9F67FF' } } },
        },
    },
});

var connections = {};

const peerConfigConnections = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export default function VideoMeetComponent() {
    const navigate = useNavigate();
    var socketRef = useRef();
    let socketIdRef = useRef();
    let localVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);
    let [video, setVideo] = useState([]);
    let [audio, setAudio] = useState();
    let [screen, setScreen] = useState();
    let [showModal, setModal] = useState(true);
    let [screenAvailable, setScreenAvailable] = useState();
    let [messages, setMessages] = useState([]);
    let [message, setMessage] = useState('');
    let [newMessages, setNewMessages] = useState(0);
    let [askForUsername, setAskForUsername] = useState(true);
    let [username, setUsername] = useState('');
    const videoRef = useRef([]);
    let [videos, setVideos] = useState([]);

    useEffect(() => {
        getPermissions();
    }, []);

    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .catch((e) => console.log(e));
            }
        }
    };

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            setVideoAvailable(!!videoPermission);
            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            setAudioAvailable(!!audioPermission);
            setScreenAvailable(!!navigator.mediaDevices.getDisplayMedia);

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({
                    video: videoAvailable,
                    audio: audioAvailable,
                });
                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
        }
    }, [video, audio]);

    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    };

    let getUserMediaSuccess = (stream) => {
        try { window.localStream.getTracks().forEach((track) => track.stop()); }
        catch (e) { console.log(e); }

        window.localStream = stream;
        localVideoref.current.srcObject = stream;

        for (let id in connections) {
            if (id === socketIdRef.current) continue;
            connections[id].addStream(window.localStream);
            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description).then(() => {
                    socketRef.current.emit('signal', id, JSON.stringify({ sdp: connections[id].localDescription }));
                }).catch((e) => console.log(e));
            });
        }

        stream.getTracks().forEach((track) => (track.onended = () => {
            setVideo(false);
            setAudio(false);
            try {
                let tracks = localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
            } catch (e) { console.log(e); }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            localVideoref.current.srcObject = window.localStream;

            for (let id in connections) {
                connections[id].addStream(window.localStream);
                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description).then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ sdp: connections[id].localDescription }));
                    }).catch((e) => console.log(e));
                });
            }
        }));
    };

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .catch((e) => console.log(e));
        } else {
            try {
                let tracks = localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
            } catch (e) {}
        }
    };

    let getDislayMediaSuccess = (stream) => {
        try { window.localStream.getTracks().forEach((track) => track.stop()); }
        catch (e) { console.log(e); }

        window.localStream = stream;
        localVideoref.current.srcObject = stream;

        for (let id in connections) {
            if (id === socketIdRef.current) continue;
            connections[id].addStream(window.localStream);
            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description).then(() => {
                    socketRef.current.emit('signal', id, JSON.stringify({ sdp: connections[id].localDescription }));
                }).catch((e) => console.log(e));
            });
        }

        stream.getTracks().forEach((track) => (track.onended = () => {
            setScreen(false);
            try {
                let tracks = localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
            } catch (e) { console.log(e); }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            localVideoref.current.srcObject = window.localStream;
            getUserMedia();
        }));
    };

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message);
        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ sdp: connections[fromId].localDescription }));
                            }).catch((e) => console.log(e));
                        }).catch((e) => console.log(e));
                    }
                }).catch((e) => console.log(e));
            }
            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch((e) => console.log(e));
            }
        }
    };

    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false });
        socketRef.current.on('signal', gotMessageFromServer);
        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', window.location.href);
            socketIdRef.current = socketRef.current.id;
            socketRef.current.on('chat-message', addMessage);
            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id));
            });
            socketRef.current.on('user-joined', (id, clients) => {
                clients.forEach((socketListId) => {
                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
                    connections[socketListId].onicecandidate = (event) => {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ ice: event.candidate }));
                        }
                    };
                    connections[socketListId].onaddstream = (event) => {
                        let videoExists = videoRef.current.find((v) => v.socketId === socketListId);
                        if (videoExists) {
                            setVideos((videos) => {
                                const updated = videos.map((v) =>
                                    v.socketId === socketListId ? { ...v, stream: event.stream } : v
                                );
                                videoRef.current = updated;
                                return updated;
                            });
                        } else {
                            let newVideo = { socketId: socketListId, stream: event.stream, autoplay: true, playsinline: true };
                            setVideos((videos) => {
                                const updated = [...videos, newVideo];
                                videoRef.current = updated;
                                return updated;
                            });
                        }
                    };
                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream);
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
                        window.localStream = blackSilence();
                        connections[socketListId].addStream(window.localStream);
                    }
                });
                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue;
                        try { connections[id2].addStream(window.localStream); } catch (e) {}
                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', id2, JSON.stringify({ sdp: connections[id2].localDescription }));
                            }).catch((e) => console.log(e));
                        });
                    }
                }
            });
        });
    };

    let silence = () => {
        let ctx = new AudioContext();
        let oscillator = ctx.createOscillator();
        let dst = oscillator.connect(ctx.createMediaStreamDestination());
        oscillator.start();
        ctx.resume();
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
    };

    let black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement('canvas'), { width, height });
        canvas.getContext('2d').fillRect(0, 0, width, height);
        let stream = canvas.captureStream();
        return Object.assign(stream.getVideoTracks()[0], { enabled: false });
    };

    let handleVideo = () => setVideo(!video);
    let handleAudio = () => setAudio(!audio);

    useEffect(() => {
        if (screen !== undefined) getDislayMedia();
    }, [screen]);

    let handleScreen = () => setScreen(!screen);

    let handleEndCall = () => {
        try {
            let tracks = localVideoref.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
        } catch (e) {}
        // Stop socket connection
        if (socketRef.current) socketRef.current.disconnect();
        // Go back to home — stays logged in
        navigate('/home');
    };

    let handleMessage = (e) => setMessage(e.target.value);

    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prev) => [...prev, { sender, data }]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prev) => prev + 1);
        }
    };

    let sendMessage = () => {
        if (!message.trim()) return;
        socketRef.current.emit('chat-message', message, username);
        setMessage('');
    };

    let connect = () => {
        setAskForUsername(false);
        getMedia();
    };

    const meetingCode = window.location.pathname.replace('/', '');

    return (
        <ThemeProvider theme={darkTheme}>
            {askForUsername ? (
                /* ── Lobby ── */
                <div className={styles.lobbyContainer}>
                    <div className={styles.lobbyCard}>
                        {/* Logo */}
                        <div className={styles.lobbyLogo}>
                            <div className={styles.lobbyLogoIcon}>
                                <VideoCallIcon style={{ color: 'white', fontSize: 24 }} />
                            </div>
                            <span className={styles.lobbyTitle}>SyncVerse</span>
                        </div>

                        <h2 className={styles.lobbyHeading}>Ready to join?</h2>
                        <p className={styles.lobbySubtext}>
                            Set your name and check your camera before entering.
                        </p>

                        {/* Camera preview */}
                        <div className={styles.lobbyPreview}>
                            <video ref={localVideoref} autoPlay muted />
                            {!videoAvailable && (
                                <div className={styles.lobbyPreviewPlaceholder}>
                                    <PersonIcon style={{ fontSize: 48, color: '#333355' }} />
                                    <span>Camera not available</span>
                                </div>
                            )}
                        </div>

                        {/* Name input */}
                        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                            <TextField
                                fullWidth
                                label="Your name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && username.trim() && connect()}
                                variant="outlined"
                                size="medium"
                            />
                        </div>

                        {/* Meeting badge */}
                        <div style={{
                            padding: '8px 12px', borderRadius: 10, marginBottom: '1.2rem',
                            background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
                            display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                            <span style={{ fontSize: '0.78rem', color: '#8B8BA8', fontFamily: 'Inter' }}>Meeting code:</span>
                            <span style={{ fontFamily: 'monospace', color: '#9F67FF', fontWeight: 700, fontSize: '0.88rem' }}>
                                {meetingCode}
                            </span>
                        </div>

                        {/* Join button */}
                        <button
                            disabled={!username.trim()}
                            onClick={connect}
                            style={{
                                width: '100%', padding: '0.9rem',
                                borderRadius: 12, border: 'none', cursor: 'pointer',
                                background: username.trim()
                                    ? 'linear-gradient(135deg, #7C3AED, #3B82F6)'
                                    : 'rgba(255,255,255,0.06)',
                                color: username.trim() ? 'white' : '#555570',
                                fontWeight: 800, fontSize: '1rem',
                                fontFamily: 'Inter, sans-serif',
                                transition: 'all 0.2s ease',
                                boxShadow: username.trim() ? '0 8px 30px rgba(124,58,237,0.4)' : 'none',
                            }}
                        >
                            Join Meeting →
                        </button>
                    </div>
                </div>
            ) : (
                /* ── Meeting Room ── */
                <div className={styles.meetVideoContainer}>
                    {/* Room info badge */}
                    <div className={styles.roomInfoBadge}>
                        <VideoCallIcon style={{ color: '#7C3AED', fontSize: 18 }} />
                        <span className={styles.logoText}>SyncVerse</span>
                        <span className={styles.roomCode}>{meetingCode}</span>
                    </div>

                    {/* Conference videos */}
                    <div className={styles.conferenceView}>
                        {videos.map((v) => (
                            <div key={v.socketId} style={{ position: 'relative' }}>
                                <video
                                    data-socket={v.socketId}
                                    ref={(ref) => { if (ref && v.stream) ref.srcObject = v.stream; }}
                                    autoPlay
                                />
                            </div>
                        ))}
                        {videos.length === 0 && (
                            <div style={{
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', gap: 12, color: '#333355',
                            }}>
                                <PersonIcon style={{ fontSize: 72, color: '#1A1A30' }} />
                                <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: '#444460' }}>
                                    Waiting for others to join...
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Local video PiP */}
                    <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted />

                    {/* Chat Panel */}
                    {showModal && (
                        <div className={styles.chatRoom}>
                            <div className={styles.chatHeader}>
                                <h3>💬 Chat</h3>
                                <Tooltip title="Close chat" arrow>
                                    <IconButton size="small" onClick={() => setModal(false)} style={{ color: '#8B8BA8' }}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className={styles.chatContainer}>
                                <div className={styles.chattingDisplay}>
                                    {messages.length !== 0 ? (
                                        messages.map((item, index) => (
                                            <div key={index} className={styles.chatMessage}>
                                                <p className={styles.sender}>{item.sender}</p>
                                                <p className={styles.msgText}>{item.data}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className={styles.chatEmpty}>
                                            <ChatIcon style={{ fontSize: 32, color: '#333355' }} />
                                            <span>No messages yet</span>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.chattingArea}>
                                    <TextField
                                        fullWidth size="small"
                                        value={message}
                                        onChange={handleMessage}
                                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                        placeholder="Type a message..."
                                        variant="outlined"
                                    />
                                    <Tooltip title="Send" arrow>
                                        <span>
                                            <IconButton
                                                onClick={sendMessage}
                                                disabled={!message.trim()}
                                                style={{
                                                    background: message.trim()
                                                        ? 'linear-gradient(135deg, #7C3AED, #3B82F6)'
                                                        : 'rgba(255,255,255,0.05)',
                                                    borderRadius: 10, padding: 10,
                                                    color: 'white',
                                                }}
                                            >
                                                <SendIcon fontSize="small" />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Control bar */}
                    <div className={styles.buttonContainers}>
                        <Tooltip title={video ? 'Turn off camera' : 'Turn on camera'} arrow>
                            <div
                                className={`${styles.controlBtn} ${video ? styles.active : ''}`}
                                onClick={handleVideo}
                            >
                                {video ? <VideocamIcon /> : <VideocamOffIcon />}
                            </div>
                        </Tooltip>

                        <Tooltip title={audio ? 'Mute mic' : 'Unmute mic'} arrow>
                            <div
                                className={`${styles.controlBtn} ${audio ? styles.active : ''}`}
                                onClick={handleAudio}
                            >
                                {audio ? <MicIcon /> : <MicOffIcon />}
                            </div>
                        </Tooltip>

                        {screenAvailable && (
                            <Tooltip title={screen ? 'Stop sharing' : 'Share screen'} arrow>
                                <div
                                    className={`${styles.controlBtn} ${screen ? styles.active : ''}`}
                                    onClick={handleScreen}
                                >
                                    {screen ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                                </div>
                            </Tooltip>
                        )}

                        <Tooltip title={showModal ? 'Close chat' : 'Open chat'} arrow>
                            <div>
                                <Badge badgeContent={newMessages} max={99} color="error">
                                    <div
                                        className={`${styles.controlBtn} ${showModal ? styles.active : ''}`}
                                        onClick={() => { setModal(!showModal); setNewMessages(0); }}
                                    >
                                        <ChatIcon />
                                    </div>
                                </Badge>
                            </div>
                        </Tooltip>

                        <Tooltip title="Leave meeting" arrow>
                            <div className={`${styles.controlBtn} ${styles.danger}`} onClick={handleEndCall}>
                                <CallEndIcon />
                            </div>
                        </Tooltip>
                    </div>
                </div>
            )}
        </ThemeProvider>
    );
}