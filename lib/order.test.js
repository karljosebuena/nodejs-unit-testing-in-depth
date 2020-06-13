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

    context('constructor', () => {
        it('should create an instance of Order and calculate total (sub-total + shipping)', () => {
            expect(o).to.be.instanceOf(Order)
            expect(o).to.have.property('ref').to.equal(123)
            expect(o).to.have.property('user').to.deep.equal(user)
            expect(o).to.have.property('items').to.deep.equal(items)
            expect(o).to.have.property('status').to.deep.equal('Pending')
            expect(o).to.have.property('createdAt').to.be.a('Number')
            expect(o).to.have.property('updatedAt').to.be.a('Number')
            expect(dateSpy).to.have.been.calledTwice
            expect(o).to.have.property('subtotal').to.deep.equal(15)
            expect(o).to.have.property('shipping').to.deep.equal(5)
            expect(o).to.have.property('total').to.deep.equal(20)

            expect(o.save).to.be.a('function')
            expect(o.cancel).to.be.a('function')
            expect(o.ship).to.be.a('function')
        })
    })

    context('save', () => {
        it('should update status and return order details', () => {
            const result = o.save()

            expect(o.status).to.be.equal('Active')
            expect(o.updatedAt).to.be.a('Number')
            expect(dateSpy).to.have.been.calledThrice
            expect(result).to.be.an('Object')
            expect(result).to.have.property('user').to.equal('karljose')
            expect(result).to.have.property('updatedAt').to.be.a('Number')
        })
    })

    context('cancel', () => {
        it('should cancel an order, update status and set shipping and total to zero', () => {
            const result = o.cancel()

            expect(o.status).to.be.equal('Cancelled')
            expect(o.updatedAt).to.be.a('Number')
            expect(dateSpy).to.have.been.calledThrice
            expect(o.shipping).to.equal(0)
            expect(o.total).to.equal(0)
            expect(warnStub).to.have.been.calledOnce
            expect(warnStub).to.have.been.calledWith('Order cancelled')

            expect(result).to.be.a('Boolean')
            expect(result).to.equal(true)
        })
    })

    context('ship', () => {
        it('should update status to shipped', () => {
            o.ship()

            expect(o.status).to.be.equal('Shipped')
            expect(dateSpy).to.have.been.calledThrice
        });
    });
})
