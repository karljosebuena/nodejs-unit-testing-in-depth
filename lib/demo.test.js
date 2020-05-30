const colors = require('colors')
const chai = require('chai')
const expect = chai.expect

const demo = require('./demo')
const logger = require('../utils/util.logger')

describe('demo', () => {
    context('add', () => {
        before(() => {
            logger.beforeLogger()
        })
        after(() => {
            logger.afterLogger()
        })
        beforeEach(() => {
            logger.beforeEachLogger()
        })
        afterEach(() => {
            logger.afterEachLogger()
        })
        it('should add 2 numbers', () => {
            expect(demo.add(1, 2)).to.equal(3)
        })
    })

    context('addCallback', () => {
        before(() => {
            logger.beforeLogger()
        })
        after(() => {
            logger.afterLogger()
        })
        beforeEach(() => {
            logger.beforeEachLogger()
        })
        afterEach(() => {
            logger.afterEachLogger()
        })
        it('should test the callback add', (done) => {
            demo.addCallback(1, 2, (err, result) => {
                expect(err).to.not.exist
                expect(result).to.equal(3)
                done()
            })
        })
    })

    context('addPromise', () => {
        before(() => {
            logger.beforeLogger()
        })
        after(() => {
            logger.afterLogger()
        })
        beforeEach(() => {
            logger.beforeEachLogger()
        })
        afterEach(() => {
            logger.afterEachLogger()
        })
        it('it should add with a promise cb', (done) => {
            demo.addPromise(1, 2)
                .then(result => {
                    expect(result).to.equal(3)
                    done()
                })
                .catch(e => {
                    logger.errorLogger(e)
                    done(e)
                })
        });
        it('it should add with a promise return', () => {
            return demo.addPromise(1, 2)
                .then(result => {
                    expect(result).to.equal(3)
                })
        });
    });
})