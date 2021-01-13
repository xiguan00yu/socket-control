import { io } from 'socket.io-client';
import Config from "../config";
import Log from "../log";

const receive = io(Config.receive.uri)

const [bindKey] = process.argv.slice(2);

receive.on("connect", () => {
    Log('receive connect key', bindKey)
    receive.emit('bind', bindKey);
});

receive.on("data", (...args) => {
    Log('receive connect data', ...args)
});

receive.on("disconnect", () => {
    Log('receive disconnect')
});

// setTimeout(
//     () => receive.emit('data', [bindKey, { o: 'data' }]),
//     3000
// )

Log('receive init success')