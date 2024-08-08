const fs = require("fs")


function logReqRes(filename) {
    return (req, res, next) => {
        console.log("Hello from middlewer 1");
        fs.appendFile(
            filename,
            `${Date.now()} : ${req.method}: ${req.path}\n`,
            (err, date) => {
                next()
            }
        )
    }
}

module.exports = {
    logReqRes,
}