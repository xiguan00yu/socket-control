
import { spawn } from 'child_process';
import { io } from 'socket.io-client';
import Config from "../config";
import Log from "../log";


if (process.argv.length < 4) {
    process.exit(-1)
}

const send = io(Config.receive.uri)

const [bindKey, jsFile] = process.argv.slice(2);

const sendData = (data) => {
    send.emit('data', [bindKey, data]);
}

send.on("connect", () => {
    Log('send connect success', bindKey)
});

send.on("disconnect", () => {
    Log('send disconnect')
});

const sendSpawn = spawn('node', [jsFile]);

sendSpawn.stdout.on('data', function (chunk) {
    const data = chunk.toString()
    Log('send -> node exec -> data', data)
    // send core data
    sendData(data)
});
sendSpawn.stderr.on('data', (data) => {
    Log('send -> node exec throw error', data.toString())
});
sendSpawn.on('exit', (code) => {
    Log('send -> node exec exit', code)
});

Log('send init success',)
Log('send init bindKey', bindKey)
Log('send init jsFile', jsFile)