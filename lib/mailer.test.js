const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const mongoose = require('mongoose')
const rewire = require('rewire')
let mailer = rewire('./mailer')

const sandbox = sinon.createSandbox()
const expect = chai.expect

chai.use(chaiAsPromised)
chai.use(sinonChai)

describe('mailer', () => {
    let emailStub

    beforeEach(() => {
        emailStub = sandbox.stub().resolves('done')

        mailer.__set__('sendEmail', emailStub)
    })
    afterEach(() => {
        sandbox.restore()
        mailer = rewire('./mailer')
    })

    context('sendPasswordResetEmail', () => {
        it('should check for email and name', async () => {
            await expect(mailer.sendWelcomeEmail()).to.eventually.be.rejectedWith('Invalid input')
            await expect(mailer.sendWelcomeEmail('karl@buena.com')).to.eventually.be.rejectedWith('Invalid input')
        })
        it('should sendEmail with email and body', async () => {
            await expect(mailer.sendWelcomeEmail('karl@buena.com', 'Dear Karl, welcome to our family!')).to.eventually.be.equal('done')
        })
    })

    context('sendWelcomeEmail', () => {
        it('should check for email and name', async () => {
            await expect(mailer.sendPasswordResetEmail()).to.eventually.be.rejectedWith('Invalid input')
        })
        it('should capture error', async () => {
            emailStub.rejects(new Error('fake'))
            await expect(mailer.sendPasswordResetEmail('karl@buena.com')).to.eventually.be.rejectedWith('fake')
        })
        it('should sendEmail with email and body', async () => {
            await mailer.sendPasswordResetEmail('karl@buena.com')
            expect(emailStub).to.have.been.calledWith('karl@buena.com', 'Please click http://some_link to reset your password.')
        })
    })

    context('sendEmail', () => {
        let sendMail

        beforeEach(() => {
            mailer = rewire('./mailer')
            sendMail = mailer.__get__('sendEmail')
        })

        it('should check for email and body', async () => {
            await expect(sendMail()).to.eventually.be.rejectedWith('Invalid input')
            await expect(sendMail('karl@buena,com')).to.eventually.be.rejectedWith('Invalid input')
        })
        it('should call sendMail with email and a message', async () => {
            let result = await(sendMail('karl@buena.com', 'welcome'))

            expect(result).to.equal('Email sent')
        });
    })
})