import { createServer } from "http";
import { Server } from "socket.io";
import Config from "../config";
import Log from "../log";



const httpServer = createServer();
const io = new Server(httpServer, {/** ... */ });

const socketMap = {
    // [key]: [socket]
}

const getSocketsByKey = (key) => socketMap[key] || []

const setSocketsByKey = (key, socket) => (socketMap[key] = [socket, ...getSocketsByKey(key)])

const removeSocket = (target) => {
    for (const key in socketMap) {
        const keySockets = socketMap[key]
        if (!keySockets || !keySockets.length) continue;
        // find
        const index = keySockets.indexOf(target)
        if (index === -1) continue;
        // remove
        keySockets.splice(index, 1)
        socketMap[key] = keySockets
    }
}

io.on("connection", (socket) => {
    Log('connection socket', socket.id)
    // transfer data => key => sockets
    socket.on('data', ([key, data]) => {
        Log('received data key', key)
        getSocketsByKey(key).forEach(s => {
            s.emit('data', data)
        })
    })
    // bind cb socket
    socket.on('bind', (key) => {
        Log('bind key', key)
        setSocketsByKey(key, socket)
    })

    socket.on('disconnect', () => {
        Log('disconnect socket')
        removeSocket(socket)
    })
});

httpServer.listen(Config.core.port, () => {
    Log('listen success', Config.core.port)
});

