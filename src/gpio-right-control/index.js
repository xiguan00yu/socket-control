import I2C from 'i2c-bus';

const PCF8591_ADDR = 0x48
const PCF8591_RED_ADDR1 = Buffer.from([0x40])
const PCF8591_RED_ADDR2 = Buffer.from([0x41])
const PCF8591_RED_ADDR3 = Buffer.from([0x42])
const PCF8591_RED_ADDR4 = Buffer.from([0x43])

const raddrs = [PCF8591_RED_ADDR1, PCF8591_RED_ADDR2]
const rbufs = raddrs.map(_ => Buffer.alloc(1))

const read_debounce_timeout = 100
const repeat_log_count = 20

let oldValue = "-1,-1"
let oldReadTime = -1
let oldLogCount = 0


async function main() {
    const i2c = await I2C.openPromisified(1)
    const readBufs = []
    for (let i = 0; i < raddrs.length; i++) {
        const addr = raddrs[i];
        const rbuf = rbufs[i]
        await i2c.i2cWrite(PCF8591_ADDR, addr.length, addr)
        readBufs[i] = await i2c.i2cRead(PCF8591_ADDR, rbuf.length, rbuf)
    }
    // join string
    const newValue = readBufs.map(r => r.buffer.readInt8(0)).join(',')
    if (newValue !== oldValue ||
        (Date.now() - oldReadTime > read_debounce_timeout && oldLogCount <= repeat_log_count)
    ) {
        // out for send
        console.log(oldLogCount, newValue)
        // calc same value send count
        oldLogCount = newValue !== oldValue ? 0 : oldLogCount + 1
        // diff
        oldValue = newValue;
        oldReadTime = Date.now()
    }
}


async function init() {
    while (true) {
        await main()
    }
}

init()