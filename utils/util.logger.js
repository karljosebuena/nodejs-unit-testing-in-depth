
exports.beforeLogger = () => {
    console.log('=====BEFORE BLOCK====='.yellow);
}

exports.afterLogger = () => {
    console.log('=====AFTER BLOCK====='.yellow);
}

exports.beforeEachLogger = () => {
    console.log('=====before each test block====='.blue)
}

exports.afterEachLogger = () => {
    console.log('=====after each test block====='.blue)
}