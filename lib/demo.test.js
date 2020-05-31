const colors = require('colors')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const sinon = require('sinon')

const demo = require('./demo')
const logger = require('../utils/util.logger')

const expect = chai.expect

chai.use(chaiAsPromised)
chai.use(sinonChai)

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
        it('should add with a promise cb', (done) => {
            demo.addPromise(1, 2)
                .then(result => {
                    expect(result).to.equal(3)
                    done()
                })
                .catch(e => {
                    logger.errorLogger(e)
                    done(e)
                })
        })
        it('should add with a promise return', () => {
            return demo.addPromise(1, 2)
                .then(result => {
                    expect(result).to.equal(3)
                })
        })
        it('should test add promise with async/await', async () => {
            const result = await demo.addPromise(1, 2)
            expect(result).to.equal(3)
        })
        it('should test add promise with chai as promised', async () => {
            await expect(demo.addPromise(1, 2)).to.eventually.equal(3)
        })
    })
    context('test doubles', () => {
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
        it('should spy on log', () => {
            const spy = sinon.spy(console, 'log')

            demo.foo()
            expect(spy.calledOnce).to.be.true
            expect(spy).to.have.been.calledOnce
            spy.restore()
        })
        it('should stub on warn', () => {
            const stub = sinon.stub(console, 'warn').callsFake(() => { console.log('Message from stub') })

            demo.foo()
            expect(stub).to.have.been.calledOnce
            expect(stub).to.have.been.calledWith('console.warn was called')
        });
    })
})