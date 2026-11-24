import { Server } from "socket.io";

let connections = {};   // path → [socketId, ...]
let messages    = {};   // path → [{sender, data, socket-id-sender}, ...]
let timeOnline  = {};   // socketId → Date

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        /* ── JOIN ─────────────────────────────────────────────────────── */
        socket.on("join-call", (path) => {
            // Create room if it doesn't exist (fresh room every time it was empty)
            if (connections[path] === undefined) {
                connections[path] = [];
            }

            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();

            // Tell everyone in the room (including new joiner) who joined
            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]);
            }

            // Replay chat history only if room is NOT fresh (messages exist)
            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; a++) {
                    io.to(socket.id).emit(
                        "chat-message",
                        messages[path][a]["data"],
                        messages[path][a]["sender"],
                        messages[path][a]["socket-id-sender"]
                    );
                }
            }
        });

        /* ── SIGNAL (WebRTC) ──────────────────────────────────────────── */
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        /* ── CHAT MESSAGE ─────────────────────────────────────────────── */
        socket.on("chat-message", (data, sender) => {
            // Find which room this socket belongs to
            const [matchingRoom, found] = Object.entries(connections).reduce(
                ([room, isFound], [roomKey, roomValue]) => {
                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, isFound];
                },
                ["", false]
            );

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = [];
                }
                messages[matchingRoom].push({
                    sender: sender,
                    data: data,
                    "socket-id-sender": socket.id,
                });

                console.log("message", data, ":", sender);

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id);
                });
            }
        });

        /* ── DISCONNECT ───────────────────────────────────────────────── */
        socket.on("disconnect", () => {
            const diffTime = Math.abs(timeOnline[socket.id] - new Date());
            delete timeOnline[socket.id];

            let key;

            for (const [k, v] of Object.entries(connections)) {
                const idx = v.indexOf(socket.id);
                if (idx === -1) continue;

                key = k;

                // Notify everyone still in the room that this user left
                connections[key].forEach((id) => {
                    io.to(id).emit("user-left", socket.id);
                });

                // Remove this socket from the room
                connections[key].splice(idx, 1);

                // ── ROOM IS NOW EMPTY ─────────────────────────────────
                // Destroy both the connection list AND the message history.
                // Next person who joins this URL gets a completely fresh room.
                if (connections[key].length === 0) {
                    console.log(`Room "${key}" is empty — destroying room & clearing chat history.`);
                    delete connections[key];
                    delete messages[key];     // ← clears chat so rejoin is fresh
                }

                break; // a socket can only be in one room
            }
        });
    });

    return io;
};
