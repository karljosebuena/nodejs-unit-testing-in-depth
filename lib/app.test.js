const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const rewire = require('rewire')
const request = require('supertest')

let app = rewire('./app')
const users = require('./users')
const auth = require('./auth')

const expect = chai.expect
const sandbox = sinon.createSandbox()

chai.use(chaiAsPromised)
chai.use(sinonChai)

describe('app', () => {
    afterEach(() => {
        app = rewire('./app')
        sandbox.restore()
    })

    context('get /', () => {
        it('should get /', (done) => {
            request(app).get('/')
                .expect(200)
                .end((err, response) => {
                    expect(response.body).to.have.property('name').to.equal('Foo Fooing Bar')
                    done(err)
                })
        })
    })

    context('post /user', () => {
        let createStub, errorStub

        it('should call users.create', (done) => {
            createStub = sandbox.stub(users, 'create').resolves({ name: 'karljose' })

            request(app).post('/user')
                .send({ name: 'fake' })
                .expect(200)
                .end((err, response) => {
                    expect(createStub).to.have.been.calledOnce
                    expect(response.body).to.have.property('name').to.equal('karljose')
                    done(err)
                })
        })
        it('should call handleError on error', (done) => {
            createStub = sandbox.stub(users, 'create').rejects(new Error('fake_error'))
            errorStub = sandbox.stub().callsFake((res, error) => {
                return res.status(400).json({ error: 'fake' })
            })

            app.__set__('handleError', errorStub)

            request(app).post('/user')
                .send({ name: 'fake' })
                .expect(400)
                .end((err, response) => {
                    expect(createStub).to.have.been.calledOnce
                    expect(errorStub).to.have.been.calledOnce
                    expect(response.body).to.have.property('error').to.equal('fake')
                    done(err)
                })
        });
    });

    context('delete /user/:id', () => {
        let fakeAuth, authStub, deleteStub

        beforeEach(() => {
            fakeAuth = (req, res, next) => {
                return next()
            }
            authStub = sandbox.stub(auth, 'isAuthorized').callsFake(fakeAuth)

            app = rewire('./app')
        })

        it('should call auth check function and users.delete on success', (done) => {
            deleteStub = sandbox.stub(users, 'delete').resolves('fake_delete')

            request(app).delete('/user/123')
                .expect(200)
                .end((err, response) => {
                    expect(authStub).to.have.been.calledOnce
                    expect(deleteStub).to.have.been.calledWithMatch({ id: '123' })
                    expect(response.body).to.equal('fake_delete')
                    done(err)
                })

        });
    });
})