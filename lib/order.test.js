const chai = require('chai')
const sinon = require('sinon')
const sinonCha = require('sinon-chai')

const { expect } = chai
const sandbox = sinon.createSandbox()

const Order = require('./order')

chai.use(sinonCha)

describe('order', () => {
    let warnStub, dateSpy, user, items, o

    beforeEach(() => {
        warnStub = sandbox.stub(console, 'warn')
        dateSpy = sandbox.spy(Date, 'now')

        user = { id: 1, name: 'karljose' }
        items = [
            { name: 'Book', price: 10 },
            { name: 'Dice set', price: 5 }
        ]

        o = new Order(123, user, items)
    })
    afterEach(() => {
        sandbox.restore()
    })

    it('should create an instance of Order and calculate total (sub-total + shipping)', () => {
        expect(o).to.be.instanceOf(Order)
        expect(o).to.have.property('ref').to.equal(123)
        expect(o).to.have.property('user').to.deep.equal(user)
        expect(o).to.have.property('items').to.deep.equal(items)
        expect(o).to.have.property('status').to.deep.equal('Pending')
        expect(o).to.have.property('createdAt').to.be.a('Number')
        expect(o).to.have.property('updatedAt').to.be.a('Number')
        expect(o).to.have.property('subtotal').to.deep.equal(15)
        expect(o).to.have.property('shipping').to.deep.equal(5)
        expect(o).to.have.property('total').to.deep.equal(20)

        expect(o.save).to.be.a('function')
        expect(o.cancel).to.be.a('function')
        expect(o.ship).to.be.a('function')
    })
    it('should have called Date now twice', () => {
        expect(dateSpy).to.have.been.calledTwice
    })
})
