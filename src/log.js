export default (...args) => {
    const [key, ...data] = args || []
    console.log("================")
    console.log('time: ', (new Date()).toLocaleString())
    console.log('log-t: ', key)
    data.length > 0 && console.log('log-d: ', ...data)
    console.log("================")
}