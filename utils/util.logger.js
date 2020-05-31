
exports.beforeLogger = () => {
    console.log('------BEFORE BLOCK------'.yellow);
}

exports.afterLogger = () => {
    console.log('------AFTER BLOCK------'.yellow);
}

exports.beforeEachLogger = () => {
    console.log('***before each test block***'.blue)
}

exports.afterEachLogger = () => {
    console.log('***after each test block***'.blue)
}

exports.beforeAfter = (before, after, beforeEach, afterEach) => {
    before(() => {
        this.beforeLogger()
    })
    after(() => {
        this.afterLogger()
    })
    beforeEach(() => {
        this.beforeEachLogger()
    })
    afterEach(() => {
        this.afterEachLogger()
    })
}

exports.successLogger = () => {
    // TODO
}

exports.errorLogger = (error) => {
    console.log('Error: Check below error message'.bgRed);
    console.log(error)
}